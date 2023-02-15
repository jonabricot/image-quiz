<script setup lang="ts">
import Center from '@/components/layout/Center.vue';
import Container from '@/components/layout/Container.vue';
import AnimatedSection from '@/components/layout/AnimatedSection.vue';
import QuizResult from '@/components/QuizResult.vue';
import Quiz from '@/components/Quiz.vue';
import QuizLayout from '@/components/layout/QuizLayout.vue';
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()
</script>

<template>
  <QuizLayout>
    <div class="h-full w-full relative overflow-hidden">
      <template v-for="(question, index) in store.questions" :key="`question-${index}`">
        <AnimatedSection
          :show="index === store.index && store.state === 'quiz'"
          :before="index < store.index"
          :after="index > store.index"
        >
          <Center>
            <Quiz
              v-bind="question"
              @save="store.saveAnswer($event)"
            />
          </Center>
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
