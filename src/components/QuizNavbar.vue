<script setup lang="ts">
import Button from '@/components/Button.vue'
import Container from '@/components/layout/Container.vue'
import AnimatedSection from '@/components/layout/AnimatedSection.vue'
import {useRoute, useRouter} from "vue-router";
import { useQuizStore } from '@/stores/quiz'
import { computed } from 'vue';

const router = useRouter()
const route = useRoute()
const store = useQuizStore()

function next() {
  if (store.state === 'result') {
    router.push({name: 'home'})
  } else if (!store.hasRespondedCurrentQuestion) {
    store.saveAnswer(store.selectedIndex)
  } else if (store.hasNextIndex) {
    store.index++
    store.selectedIndex = -1
  } else {
    store.state = "result"
  }
}

const canNext = computed(() => {
  console.log(store.state, store.selectedIndex)
  if (store.state === 'quiz' && store.selectedIndex === -1) return false
  else return true
})
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
          @click="next"
          class="transition-all" 
          :class="{'opacity-50 pointer-events-none': !canNext}"
        >
          <template v-if="store.state === 'quiz'">Suivant</template>
          <template v-if="store.state === 'result'">Page d'accueil</template>
        </Button>
      </div>
    </div>
  </div>
</template>