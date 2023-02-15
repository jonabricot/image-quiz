import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

type Answer = {
  src: string;
  scale: number;
  translate: [number, number];
}

type Questions = {
  answers: Answer[];
  response: number;
  description: string;
}

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref<Questions[]>([
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/2/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/2/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/1/first.jpg',
          scale: 5,
          translate: [-3, 20],
        },
        {
          src: '/assets/questions/1/second.jpg',
          scale: 5,
          translate: [0, 15],
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
  ])
  const answers = useStorage<number[]>('quiz-lolo', [])
  const index = ref<number>(answers.value.length)
  const state = ref(index.value === questions.value.length ? 'result' : 'quiz')
  
  function saveAnswer(response: number) {
    if (index.value !== null) {
      answers.value[index.value] = response
    }
  }

  const score = computed(() => {
    return answers.value.map((value, index) => value === questions.value[index].response ? 1 : 0).reduce((a, b) => a + b, 0)
  })

  const nextIndex = computed(() => index.value > -1 ? index.value + 1 : 0)
  const hasNextIndex = computed(() => nextIndex.value < questions.value.length ? true : false)
  const currentQuestion = computed(() => questions.value[index.value])
  const hasRespondedCurrentQuestion = computed(() => hasResponded(index.value))

  function hasResponded(index: number) {
    return answers.value[index] !== undefined
  }

  function hasGoodResponse(index: number) {
    return hasResponded(index) && answers.value[index] === questions.value[index].response
  }

  function hasBadResponse(index: number) {
    return hasResponded(index) && answers.value[index] !== questions.value[index].response
  }

  return {
    state,
    questions, 
    answers, 
    score, 
    index, 
    saveAnswer, 
    nextIndex, 
    hasNextIndex, 
    currentQuestion, 
    hasRespondedCurrentQuestion,
    hasResponded, 
    hasGoodResponse, 
    hasBadResponse 
  }
})
