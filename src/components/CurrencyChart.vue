<script setup lang="ts">
import { onMounted } from "vue"

import { Button } from "./ui/button"
import { BarChart } from "./ui/chart-bar"
import { useCurrencies } from "@/composables/useCurrencies"

const { items, isLoading, isError, isRetrying, fetchCurrencies, retryFetchCurrencies } =
  useCurrencies()

onMounted(() => {
  fetchCurrencies(true)
})
</script>

<template>
  <div class="mb-10 flex w-full flex-col items-center justify-center">
    <template v-if="isLoading">
      <p class="animate-pulse text-primary">Loading currencies...</p>
    </template>

    <template v-if="isError && !isLoading">
      <div class="flex flex-col gap-2">
        <p class="text-red-500">Oops! An error occurred. Cannot load currencies.</p>
        <Button
          size="xs"
          class="mb-4 min-w-28 self-center"
          v-if="!isLoading"
          @click="retryFetchCurrencies"
          >Retry</Button
        >
      </div>
    </template>

    <template v-if="!isError && items.length && !isLoading">
      <h3 class="mb-4 text-center text-xl font-bold">
        Currencies in
        <span
          class="bg-gradient-to-tr from-green-300 to-green-500 bg-clip-text font-bold text-transparent"
          >UAH</span
        >
      </h3>
      <BarChart
        :data="items"
        index="currency"
        :colors="['#22c55e', '#047857']"
        :categories="['sale', 'purchase']"
        :rounded-corners="3"
        :x-formatter="() => ''"
        :y-formatter="
          (tick, i) => {
            return typeof tick === 'number'
              ? `₴ ${new Intl.NumberFormat('us').format(tick).toString()}`
              : ''
          }
        "
      />
    </template>
  </div>
</template>
