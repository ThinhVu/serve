<template>
  <div class="fr ai-c jc-c w-100 h-100 bc-gray-6-5 clickable" @click="$emit('close')">
    <imgx v-if="isImg" class="mx-a" :src="fullSrc" @click.stop/>
    <video v-else-if="isVideo" :src="fullSrc" @click.stop controls autoplay/>
    <div v-else>Not supported type</div>
  </div>
</template>
<script setup>
import Imgx from '@/components/Imgx.vue';
import {feAPI} from '@/api/index.js';
const props = defineProps({name: String, path: String, size: Number, isFolder: Boolean, mime: [String, Boolean]})
const isImg = computed(() => props.mime.toString().startsWith('image/'))
const isVideo = computed(() => props.mime.toString().startsWith('video/'))
const fullSrc = computed(() => feAPI.folder.resolve(props.path))
</script>
