<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'

import {useRoute} from "vue-router"

const route = useRoute()

</script>

<template>
  <PageLayout class="bg-gradient-to-br from-slate-700 to-slate-800 text-white">
    <RouterView :key="route.path" />
  </PageLayout>
</template>
