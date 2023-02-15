<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  after?: boolean;
  before?: boolean;
}>()
</script>

<template>
  <div class="absolute inset-0 transition-all" :class="{
    'opacity-0 pointer-events-none': !props.show,
    'translate-x-2': !props.show && props.after,
    '-translate-x-2': !props.show && props.before,
  }">
    <slot />
  </div>
</template>