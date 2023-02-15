<script setup lang="ts">
import { computed } from 'vue';
import { useQuizStore } from '@/stores/quiz'
const store = useQuizStore()

const messages = [
  "Rien à dire. Lolo te dois une raclette*",
  "Bravo, lolo doit te payer une bière*",
  "Hmm, c'est moyen... Une bière à celui qui gagne au shifoumi*",
  "Peut mieux faire ! Tu dois une bière à lolo*",
  "L'important, c'est de participer... Tu dois une raclette à lolo*",
]

const maxScore = computed(() => store.questions.length)

const scores = computed(() => {
  const middleIndex = Math.round((messages.length-1)/2)
  const scorePart = maxScore.value/messages.length 
  return messages.map((message, index) => {
    const baseValue = index * scorePart
    let minValue = (index + 1) * scorePart - 1
    let maxValue = baseValue

    if (index === middleIndex) {
      minValue = (index + 1) * scorePart
    }

    if (index > middleIndex) {
      minValue++
      maxValue++
    }

    return {
      min: maxScore.value - Math.round(minValue),
      max: maxScore.value - Math.round(maxValue),
      message
    }
  })
})

function isCurrentScore({min, max}) {
  return store.score >= min && store.score <= max
}

function getScoreClasses(score) {
  return {
    'opacity-50 text-xs': !isCurrentScore(score),
    'py-4 text-xl': isCurrentScore(score)
  }
}
</script>

<template>
<div class="grid gap-12">
  <div class="text-center">
    <h2 class="font-bold text-6xl">
      {{ store.score }}/{{ maxScore }}
    </h2>
  </div>
  <div class="grid gap-x-2 gap-y-1 text-xs" :style="{'grid-template-columns': 'auto 1fr'}">
    <template v-for="(score, index) in scores" :key="`score-${index}`">
      <div class="font-bold" :class="getScoreClasses(score)">{{ score.min }}-{{ score.max }}:</div> 
      <div :class="getScoreClasses(score)">{{ score.message }}</div>
    </template>
  </div>
</div>
</template>
