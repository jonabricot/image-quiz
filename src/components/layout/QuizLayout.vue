<script setup lang="ts">
import QuizNavbar from '@/components/QuizNavbar.vue'
import QuizProgressBar from '@/components/QuizProgressBar.vue'
import {useQuizStore} from '@/stores/quiz'
const store = useQuizStore()
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
    <div class="relative">
      <div class="absolute grid gap-4 bottom-full w-full mb-4">
        <div v-if="store.state === 'result'" class="text-xs opacity-10 text-center px-4">*: Lolo n'a pas été consultée pendant la mise en place de ces gages. Arrangez-vous avec elle haha</div>
        <QuizProgressBar />
      </div>
      <QuizNavbar />
    </div>
  </div>
</template>