<template>
  <div class="fc fg-1 px-1 py-1 clickable c:#fff" @click="$emit('trigger')">
    <imgx v-if="isImg" :src="fullSrc" :style="{width: '300px', height: '300px'}"/>
    <div v-if="isVideo"  class="fr ai-c jc-c bc:#fff2" style="border: 1px solid #ddd" :style="{width: '300px', height: '300px'}">
      <img :src="IcoPlay" style="width: 80px; height: 80px"/>
    </div>
    <span class="ta-c" style="line-break: anywhere">{{shortenName}}</span>
  </div>
</template>
<script setup>
import IcoPlay from '@/assets/images/play.png';
import {feAPI} from '@/api/index.js';
import Imgx from '@/components/Imgx.vue';
const props = defineProps({name: String, path: String, size: Number, isFolder: Boolean, mime: [String, Boolean]})
const isImg = computed(() => props.mime.toString().startsWith('image/'))
const isVideo = computed(() => props.mime.toString().startsWith('video/'))
const fullSrc = computed(() => feAPI.folder.resolve(props.path))
const shortenName = computed(() => {
  if (props.name.length > 20) {
    return props.name.substring(0, 8) + '...' + props.name.substring(props.name.length - 8)
  }
  return props.name
})
</script>
