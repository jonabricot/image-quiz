<script setup lang="ts">
import Center from '@/components/layout/Center.vue'
import Container from '@/components/layout/Container.vue'
import Button from '@/components/Button.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<template>
  <Center class="p-4">
    <Container>
      <Center>
        <Button @click="router.push({name: 'quiz', params: {quiz: 'lolo'}})">Quiz de Lolo</Button>
      </Center>
    </Container>
  </Center>
</template>
