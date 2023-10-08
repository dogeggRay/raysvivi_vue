<template>
  <div>
    <h2>IFrame Editor</h2>
    <editor :initialValue="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@/components/tinyMCE/index";
const content = `
<h2 style="text-align: left;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: left;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`;
export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    return {
      content,
    };
  },
});
</script>