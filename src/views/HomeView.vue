<script setup lang="ts">
import { onMounted, ref } from "vue"

import CurrencyChart from "@/components/CurrencyChart.vue"
import PostList from "@/components/PostList.vue"
import { IconLoader } from "@/components/icons"

const isPaginationComponentMount = ref<boolean>(false)
const isChartComponentMount = ref<boolean>(false)
const isAllComponentMount = ref<boolean>(false)
const percentage = ref<number>(100)

onMounted(() => {
  const percentageTimer = setInterval(() => {
    percentage.value--
    if (percentage.value === 0) clearInterval(percentageTimer)
  }, 21)

  setTimeout(() => {
    isPaginationComponentMount.value = true
  }, 1000)

  setTimeout(() => {
    isChartComponentMount.value = true
  }, 1500)

  setTimeout(() => {
    isAllComponentMount.value = true
  }, 2000)
})
</script>

<template>
  <main class="w-full">
    <div
      v-if="!isAllComponentMount"
      class="fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border bg-card px-8 py-4 shadow-lg"
    >
      <h3>Components are on the way</h3>
      <h4>{{ percentage }}%</h4>
      <IconLoader />
    </div>

    <template v-if="isPaginationComponentMount">
      <PostList />
    </template>

    <template v-if="isChartComponentMount">
      <CurrencyChart />
    </template>
  </main>
</template>
