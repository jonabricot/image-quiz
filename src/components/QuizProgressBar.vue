<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()
</script>


<template>
  <div class="h-1 grid grid-flow-col gap-2 justify-center box-border">
    <div
      v-for="(question, index) in store.questions"
      :key="`question-progress-${index}`"
      class="w-4 transition-all rounded"
      :class="{
        'bg-white': !store.hasResponded(index),
        'bg-green-500': store.hasResponded(index) && store.hasGoodResponse(index),
        'bg-red-500': store.hasResponded(index) && store.hasBadResponse(index),
        'bg-opacity-30': store.index !== index || store.state !== 'quiz',
      }"
    />
  </div>
</template>