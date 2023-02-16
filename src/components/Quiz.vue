<script setup lang="ts">
import QuizOption from '@/components/QuizOption.vue'
import Button from '@/components/Button.vue'
import QuizContainer from '@/components/layout/QuizContainer.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  answers: {src: string, scale: number, translate: number[]}[],
  response: number,
  state: string
}>()
const emit = defineEmits(['select'])

const selected = ref(-1)
// const state = ref('idle')

function select(index: number) {
  if (props.state === 'result') return

  selected.value = index
  emit('select', index)
}

function computedOutline(index: number) {
  if (selected.value !== index) {
    return 'none'
  }

  if (props.state !== 'result') {
    return 'default'
  }

  if (selected.value === props.response) {
    return 'success'
  }

  return 'error'
}

function computedMuted(index: number) {
  if (props.state === 'result') {
    return props.response !== index
  }

  if (props.state === 'selected') {
    return selected.value !== index
  }

  return false
}

function computedSize(index: number) {
  if (
    props.state === 'selected' && index === selected.value ||
    props.state === 'result' && index === props.response
  ) {
    return 'scale-105'
  }

  return ''
}

</script>

<template>
  <QuizContainer
    class="grid justify-items-center items-center gap-4"
    :size="state === 'result' ? 'fluid' : 'normal'"
  >
    <template v-for="(answer, index) in answers" :key="`answser-${index}`">
      <QuizOption
        v-bind="answer"
        :outline="computedOutline(index)"
        :muted="computedMuted(index)"
        :display="state"
        tabindex="0"
        :class="[computedSize(index)]"
        @focusin="select(index)"
      />
      <div v-if="index < answers.length - 1">VS</div>
    </template>
  </QuizContainer>
</template>
