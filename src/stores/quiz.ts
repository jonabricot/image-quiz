import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

type Answer = {
  src: string;
  transform: string;
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
          src: '/assets/questions/11.jpg',
          transform: 'scale(5) translate(-16%, -6%) rotate(-16deg)'
        },
        {
          src: '/assets/questions/12.jpg',
          transform: 'scale(5) translate(-4%, 20%)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/21.jpg',
          transform: 'scale(4) translate(24%, 6%) rotate(6deg)'
        },
        {
          src: '/assets/questions/22.jpg',
          transform: 'scale(4) translate(-10%, 7%) rotate(6deg)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/31.jpg',
          transform: 'scale(2) translate(17%, -26%)'
        },
        {
          src: '/assets/questions/32.jpg',
          transform: 'scale(4) translate(13%, -14%)'
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/41.jpg',
          transform: 'scale(2) translate(-31%, -22%) rotate(80deg)'
        },
        {
          src: '/assets/questions/42.jpg',
          transform: 'scale(4) translate(-6%, 13%) rotate(90deg)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
     {
      answers: [
        {
          src: '/assets/questions/51.jpg',
          transform: 'scale(4) translate(-1%, -30%)'
        },
        {
          src: '/assets/questions/52.jpg',
          transform: 'scale(5) translate(21%, 33%) rotate(-37deg)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    
    {
      answers: [
        {
          src: '/assets/questions/61.jpg',
          transform: 'scale(5) translate(5%, -24%)'
        },
        {
          src: '/assets/questions/62.jpg',
          transform: 'scale(8) translate(11%, 5%)'
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/71.jpg',
          transform: 'scale(3) translate(25%, -24%) rotate(-55deg)'
        },
        {
          src: '/assets/questions/72.jpg',
          transform: 'scale(5) translate(-26%, 2%) rotate(90deg)'
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/81.jpg',
          transform: 'scale(3) translate(18%, 2%)'
        },
        {
          src: '/assets/questions/82.jpg',
          transform: 'scale(3) translate(10%, -41%)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/91.jpg',
          transform: 'scale(2) translate(23%, 40%)'
        },
        {
          src: '/assets/questions/92.jpeg',
          transform: 'scale(3) translate(-1%, -28%)'
        },
      ],
      response: 0,
      description: 'Trouver Lolo'
    },
    {
      answers: [
        {
          src: '/assets/questions/101.jpg',
          transform: 'scale(2) translate(41%, -11%) rotate(90deg)'
        },
        {
          src: '/assets/questions/102.jpg',
          transform: 'scale(3) translate(35%, 18%) rotate(90deg)'
        },
      ],
      response: 1,
      description: 'Trouver Lolo'
    },
    
  ])
  const answers = useStorage<number[]>('quiz-lolo', [])
  const index = ref<number>(answers.value.length)
  const state = ref(index.value === questions.value.length ? 'result' : 'quiz')
  const selectedIndex = ref(-1)
  
  function saveAnswer(response: number) {
    if (index.value !== null) {
      answers.value[index.value] = response
    }
  }

  const score = computed(() => {
    return answers.value
      .map((value, index) => value === questions.value[index].response ? 1 : 0)
      .reduce((a: number, b: number) => a + b, 0)
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
    selectedIndex,
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
