/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ScriptLoader } from './ScriptLoader';
import { getTinymce } from './TinyMCE';
import { isTextarea, mergePlugins, uuid, isNullOrUndefined, initEditor } from './Utils';
import { editorProps, IPropTypes } from './EditorPropTypes';
import { h, defineComponent, onMounted, ref, Ref, toRefs, nextTick, watch, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
import { Editor as TinyMCEEditor, EditorEvent, TinyMCE } from 'tinymce';
import {baseURL} from '@/config'
import store from '@/store'
import { uploadImgFile} from "@/js/file.js"

type EditorOptions = Parameters<TinyMCE['init']>[0];

const renderInline = (ce: any, id: string, elementRef: Ref<Element | null>, tagName?: string) =>
  ce(tagName ? tagName : 'div', {
    id,
    ref: elementRef
  });

const renderIframe = (ce: any, id: string, elementRef: Ref<Element | null>) =>
  ce('textarea', {
    id,
    visibility: 'hidden',
    ref: elementRef
  });

const imageUploadHandler = (blobInfo, success, failure, progress) => {
  const formData = new FormData()
  formData.append('file', blobInfo.blob())
  uploadImgFile(formData).then((resp:any) => {
      if(resp.code == "0"){
        success(resp.data)
      }else{
        failure(resp.msg)
      }
  })
  .catch((e) => {
    failure(e)
  });
};

// {
//   success("https://persional-images.oss-cn-hangzhou.aliyuncs.com/myblog/2023-03-10/2f85dfe362c44b749a028ab3687530d3.png");
// }
const defaultInitValues = { 
  selector: undefined, 
  target: undefined ,
  plugins: 'hr preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample code table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
  editimage_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar: "blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight formatpainter outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | anchor codesample blockquote",
  //blockquote subscript superscript rem
  min_height: 800,
  width:'100%',
  // images_upload_url: baseURL+'/api/file/uploadFile',
  images_upload_handler: imageUploadHandler,
  toolbar_sticky: true,
  autosave_ask_before_unload: false,
  content_style: "img {max-width:100%;}"
};

export const Editor = defineComponent({
  props: editorProps,
  setup: (props: IPropTypes, ctx) => {
    let conf = props.init ? { ...props.init, ...defaultInitValues } : { ...defaultInitValues };
    const { disabled, modelValue, tagName } = toRefs(props);
    const element: Ref<Element | null> = ref(null);
    let vueEditor: any = null;
    const elementId: string = props.id || uuid('tiny-vue');
    const inlineEditor: boolean = (props.init && props.init.inline) || props.inline;
    const modelBind = !!ctx.attrs['onUpdate:modelValue'];
    let mounting = true;
    const initialValue: string = props.initialValue ? props.initialValue : '';
    let cache = '';

    const getContent = (isMounting: boolean): () => string => modelBind ?
      () => (modelValue?.value ? modelValue.value : '') :
      () => isMounting ? initialValue : cache;

    const initWrapper = (): void => {
      const content = getContent(mounting);
      const finalInit = {
        ...conf,
        readonly: props.disabled,
        target: element.value,
        plugins: mergePlugins(conf.plugins, props.plugins),
        toolbar: props.toolbar || (conf.toolbar),
        inline: inlineEditor,
        setup: (editor: TinyMCEEditor) => {
          vueEditor = editor;
          editor.on('init', (e: EditorEvent<any>) => initEditor(e, props, ctx, editor, modelValue, content));
          if (typeof conf.setup === 'function') {
            conf.setup(editor);
          }
        }
      };
      if (isTextarea(element.value)) {
        element.value.style.visibility = '';
      }
      getTinymce().init(finalInit);
      mounting = false;
    };
    watch(disabled, (disable) => {
      if (vueEditor !== null) {
        if (typeof vueEditor.mode?.set === 'function') {
          vueEditor.mode.set(disable ? 'readonly' : 'design');
        } else {
          vueEditor.setMode(disable ? 'readonly' : 'design');
        }
      }
    });
    watch(tagName, (_) => {
      if (!modelBind) {
        cache = vueEditor.getContent();
      }
      getTinymce()?.remove(vueEditor);
      nextTick(() => initWrapper());
    });
    onMounted(() => {
      if (getTinymce() !== null) {
        initWrapper();
      } else if (element.value && element.value.ownerDocument) {
        const channel = props.cloudChannel ? props.cloudChannel : '6';
        const apiKey = "79k7ux5bv4e7da4y0dlgawnx544ndvdopy5ehxsug9m5699o";
        // const scriptSrc: string = isNullOrUndefined(props.tinymceScriptSrc) ?
        //   `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js` :
        //   props.tinymceScriptSrc;
        // const scriptSrc = "src/components/tinyMCE/js/tinymce.min.js";
        const scriptSrc = "/tinymce/tinymce.min.js";
        ScriptLoader.load(
          element.value.ownerDocument,
          scriptSrc,
          initWrapper
        );
      }
    });
    onBeforeUnmount(() => {
      if (getTinymce() !== null) {
        getTinymce().remove(vueEditor);
      }
    });
    if (!inlineEditor) {
      onActivated(() => {
        if (!mounting) {
          initWrapper();
        }
      });
      onDeactivated(() => {
        if (!modelBind) {
          cache = vueEditor.getContent();
        }
        getTinymce()?.remove(vueEditor);
      });
    }
    const rerender = (init: EditorOptions) => {
      cache = vueEditor.getContent();
      getTinymce()?.remove(vueEditor);
      conf = { ...conf, ...init, ...defaultInitValues };
      nextTick(() => initWrapper());
    };
    ctx.expose({
      rerender,
      getEditor: () => vueEditor,
      getContentHtml:() => {
        return vueEditor.getContent()
      },
      setContentHtml:(content) => {
        return vueEditor.setContent(content)
      }
    });
    return () => inlineEditor ?
      renderInline(h, elementId, element, props.tagName) :
      renderIframe(h, elementId, element);
  }
});
