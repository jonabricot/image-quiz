<script setup lang="ts">
import QuizOption from '@/components/QuizOption.vue'
import Button from '@/components/Button.vue'
import QuizContainer from '@/components/layout/QuizContainer.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  orientation: string,
  answers: {src: string, scale: number, translate: number[]}[],
  response: number,
}>()
const emit = defineEmits(['save'])

const selected = ref(null)
const state = ref('idle')

function select(index) {
  if (state.value === 'result') return

  if (index === null) {
    state.value = 'idle'
    selected.value = null
    return
  }

  if (selected.value === index) {
    state.value = 'result'
    emit('save', index)
  } else {
    state.value = 'selected'
  }

  selected.value = index
}

const computedClass = computed(() => ({
  'grid-flow-col': props.orientation === 'vertical'
}))

function computedOutline(index) {
  if (selected.value !== index) {
    return 'none'
  }

  if (state.value === 'selected') {
    return 'default'
  }

  if (selected.value === props.response) {
    return 'success'
  }

  return 'error'
}

function computedMuted(index) {
  if (state.value === 'result') {
    return props.response !== index
  }

  if (state.value === 'selected') {
    return selected.value !== index
  }

  return false
}

function computedSize(index) {
  if (
    state.value === 'selected' && index === selected.value ||
    state.value === 'result' && index === props.response
  ) {
    return 'scale-105'
  }

  return ''
}

</script>

<template>
  <QuizContainer
    class="grid justify-items-center items-center gap-4"
    :class="computedClass"
    :size="state === 'result' ? 'fluid' : 'normal'"
  >
    <template v-for="(answer, index) in answers" :key="`answser-${index}`">
      <QuizOption
        :orientation="orientation"
        v-bind="answer"
        :outline="computedOutline(index)"
        :muted="computedMuted(index)"
        :display="state"
        tabindex="0"
        :class="[computedSize(index)]"
        @click="select(index)"
        @focusout="select(null)"
      >
        <Button
          class="rounded-full absolute place-self-center transition-all opacity-0 pointer-events-none"
          :class="{
            'opacity-100': selected === index && state === 'selected',
          }"
        >
          Choisir
        </Button>
      </QuizOption>
      <div v-if="index < answers.length - 1">VS</div>
    </template>
  </QuizContainer>
</template>
