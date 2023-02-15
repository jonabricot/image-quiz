<script setup lang="ts">
import Button from '@/components/Button.vue'
import Container from '@/components/layout/Container.vue'
import AnimatedSection from '@/components/Layout/AnimatedSection.vue'
import {useRoute, useRouter} from "vue-router";
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const route = useRoute()
const store = useQuizStore()

function nextQuestion() {
  if (store.state === 'result') {
    router.push({name: 'home'})
  } else if (store.hasNextIndex) {
    store.index++
  } else {
    store.state = "result"
  }
}
</script>

<template>
  <div class="bg-gray-800 bg-opacity-50 p-4 grid gap-4">
    <div class="grid items-center" style="grid-template-columns: 1fr auto">
      <div v-if="store.state ==='quiz'" class="relative h-full">
        <AnimatedSection
          v-for="(question, index) in store.questions" 
          :key="`question-description-${index}`"
          :show="store.index === index && store.state === 'quiz'"
          class="flex items-center"
        >
          {{ question.description }}
        </AnimatedSection>
      </div>
      <div class="justify-self-center">
        <Button 
          @click="nextQuestion" 
          class="transition-all" 
          :class="{'opacity-50 pointer-events-none': store.state ==='quiz' && !store.hasRespondedCurrentQuestion}"
        >
          <template v-if="store.state === 'quiz'">Suivant</template>
          <template v-if="store.state === 'result'">Page d'accueil</template>
        </Button>
      </div>
    </div>
  </div>
</template>