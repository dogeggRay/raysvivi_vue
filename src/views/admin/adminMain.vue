<template>
  <div class="common-layout full_height fine-font" >
    <el-container>
        <el-header style="background-color:rgb(44,62,80);color:white;    line-height: 4rem;">管理员界面</el-header>
        <el-container>
            <!-- 菜单 -->
            <el-aside width="200px" style="background-color:#3B606E">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    :collapse="false"
                    class="el-menu-vertical-demo"
                    default-active="adminBlog"
                    :unique-opened="true"
                    text-color="#fff"
                    router
                >
                    <el-menu-item index="adminBlog">
                        <template #title>
                            <el-icon><Document /></el-icon>
                            <span>博客</span>
                        </template>
                    </el-menu-item>
                    
                    <el-menu-item index="adminStructure">
                        <template #title>
                            <el-icon><LocationInformation /></el-icon>
                            <span>大纲</span>
                        </template>
                    </el-menu-item>


                    <el-menu-item index="2">
                        <template #title>
                            <el-icon><Menu /></el-icon>
                            <span>模块</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2">
                        <template #title>
                            <el-icon><PriceTag /></el-icon>
                            <span>标签</span>
                        </template>
                    </el-menu-item>

                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon><MoonNight /></el-icon>
                            <span>测试</span>
                        </template>
                            <el-menu-item index="4-1">- Write</el-menu-item>
                            <el-menu-item index="4-2">- Update</el-menu-item>
                            <el-menu-item index="4-3">- Delete</el-menu-item>
                            <el-sub-menu index="1-4">
                                <template #title>- Test</template>
                                <el-menu-item index="1-4-1">Test Sub</el-menu-item>
                            </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component ref="order_view" :is="Component" />
                    </keep-alive>
                    
                </router-view>
            </el-main>
        </el-container>
        </el-container>
  </div>

    
</template>

<script lang="ts" setup>
import { ref ,onMounted,onBeforeUnmount } from 'vue'
</script>


<style lang="less" >

</style>