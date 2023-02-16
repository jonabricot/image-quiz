<script setup lang="ts">
import { computed } from "vue";
const availableOutlines = {
  none: '',
  default: 'outline-indigo-500',
  success: 'outline-green-500',
  error: 'outline-red-500',
}

const props = withDefaults(defineProps<{
  src: string;
  transform: string;
  scale: number;
  translate: number[];
  outline: keyof typeof availableOutlines;
  muted: boolean;
  display: string;
}>(), {
  transform: '',
  scale: 1,
  translate: () => [0, 0],
});

const computedTranslate = computed(() =>
  props.translate?.map((value) => `${value}%`)
);

const outlineBasis = 'outline outline-2 outline-offset-4 outline-solid'


const computedOutline = computed(() => {
  if (availableOutlines.hasOwnProperty(props.outline) && availableOutlines[props.outline]) {
    return `${outlineBasis} ${availableOutlines[props.outline]}`
  }

  return ''
})

const computedStyle = computed(() => {
  let ratio = "33%"
  if (props.display === 'result') {
    ratio = "80%"
  } 
  return {
    "padding-bottom": ratio,
  }
});
</script>

<template>
  <div
    class="grid overflow-hidden rounded transition-all relative w-full bg-slate-600 drop-shadow"
    :class="{
      [computedOutline]: true,
      'opacity-50': muted,
      'duration-1000': display === 'result'
    }"
    :style="computedStyle"
  >
    <div class="absolute w-full h-full flex items-center content-center">
      <img
        :src="src"
        class="object-cover object-center pointer-events-none transition-all duration-1000 min-w-full min-h-full"
        :style="display === 'result' ? {} : {transform: props.transform}"
      />
    </div>
    <slot />
  </div>
</template>
