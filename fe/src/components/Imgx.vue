<template>
  <div>
    <img draggable="false" :data-src="src" :style="mediaStyle" ref="image" @click="emit('click')"/>
<!--    <pulse-block v-if="imgState === 'loading'" :style="mediaStyle"/>-->
    <div v-if="imgState === 'error'" :style="mediaStyle"></div>
  </div>
</template>
<script setup>
import lazy from '@/components/System/lazy.js';
const props = defineProps({src: String, style: [String, Object]});
const emit = defineEmits(['click']);

const image = ref();
const imgState = ref();
const mediaStyle = computed(() => {
  return {
    height: `100%`,
    maxWidth: `100%`,
    objectFit: 'cover',
    ...props.style
  }
})
onMounted(() => {
  image.value.onload = () => imgState.value = 'loaded';
  image.value.onerror = () => imgState.value = 'error';
  imgState.value = 'loading';
  lazy.observe(image.value);
})
</script>
