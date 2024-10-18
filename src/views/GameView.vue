<script setup lang="ts">
import { Angry, Annoyed, Bug, BugOff, Frown, Laugh, Meh, Smile } from "lucide-vue-next"
import { onMounted, watch } from "vue"
import { useReward } from "vue-rewards"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGame } from "@/composables/useGame"

const icons = {
  Angry,
  Laugh,
  Annoyed,
  Meh,
  Smile,
  BugOff,
  Frown,
  Bug
}

const RESTARTED_TIME = 5

const {
  items,
  selectedCards,
  completedCards,
  isLoading,
  isFinished,
  isStarted,
  seconds,
  startGame,
  checkCard
} = useGame()
const { reward } = useReward("full-page", "confetti", {
  startVelocity: 15,
  spread: 300,
  elementCount: 100
})

watch(completedCards.value, () => {
  if (completedCards.value.length === items.value.length) {
    isStarted.value = false
    isFinished.value = true
    reward()
    setTimeout(() => {
      completedCards.value = []
      seconds.value = 0
      isFinished.value = false
    }, RESTARTED_TIME * 1000)
  }
})

onMounted(() => {
  setInterval(() => {
    if (!isFinished.value && isStarted.value) {
      seconds.value++
    }
  }, 1000)
})
</script>

<template>
  <div id="full-page" class="flex h-full w-full flex-col items-center">
    <div
      v-if="isFinished"
      class="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg border bg-card px-8 py-4 shadow-lg"
    >
      <h3 class="text-lg font-semibold">🎊Congratulations!🎊</h3>
      <div class="text-center">
        <p>You finished the game in {{ seconds }} seconds!</p>
        <span class="text-sm">The game will restart soon.</span>
      </div>
    </div>

    <div
      v-motion-slide-visible-top
      class="grid aspect-square w-[450px] grid-cols-4 grid-rows-4 gap-2"
    >
      <Card
        v-for="item in items"
        :key="item.id"
        class="relative h-full w-full border-none bg-transparent"
      >
        <Button
          :disabled="isLoading"
          @click="checkCard(item)"
          variant="ghost"
          style="transform-style: preserve-3d; transition: transform 0.6s"
          :class="[
            'h-full w-full transform transition-transform duration-500',
            { 'rotate-y-180': selectedCards.includes(item) || completedCards.includes(item) }
          ]"
          class="relative flex flex-col items-center justify-center"
        >
          <div class="backface-hidden absolute inset-0 flex items-center justify-center bg-card" />

          <div
            class="rotate-y-180 backface-hidden absolute inset-0 flex select-none items-center justify-center bg-green-800 text-white"
          >
            <component :is="icons[item.icon]" />
          </div>
        </Button>
      </Card>
    </div>

    <Button
      v-motion-slide-visible-bottom
      v-if="!isStarted"
      @click="startGame"
      size="sm"
      variant="secondary"
      class="mt-2 w-[450px]"
      >Start</Button
    >
  </div>
</template>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
