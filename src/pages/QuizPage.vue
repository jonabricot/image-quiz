<script setup lang="ts">
import Center from '@/components/layout/Center.vue';
import Container from '@/components/layout/Container.vue';
import AnimatedSection from '@/components/layout/AnimatedSection.vue';
import QuizResult from '@/components/QuizResult.vue';
import Quiz from '@/components/Quiz.vue';
import QuizLayout from '@/components/layout/QuizLayout.vue';
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()

function getQuizState(index: number) {
  if (store.answers[index] !== undefined) {
    return 'result'
  }
  else if (store.selectedIndex !== -1) {
    return 'selected'
  } 

  return 'idle' 
}
</script>

<template>
  <QuizLayout>
    <div class="h-full w-full relative overflow-hidden">
      <template v-for="(question, index) in store.questions" :key="`question-${index}`">
        <AnimatedSection
          :show="index === store.index && store.state === 'quiz'"
          :before="index < store.index"
          :after="index > store.index"
          class="flex overflow-auto justify-center"
        >
          <Quiz
            class="self-center"
            v-bind="question"
            :state="getQuizState(index)"
            @select="store.selectedIndex = $event"
          />
        </AnimatedSection>
      </template>

      <AnimatedSection
        :show="store.state === 'result'"
        :after="store.state !== 'result'"
      >
        <Center class="p-4">
          <QuizResult/>
        </Center>
      </AnimatedSection>
    </div>
  </QuizLayout>
</template>
