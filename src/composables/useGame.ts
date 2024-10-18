import { ref } from "vue"

import type { IGameCard } from "@/lib/types"

const cards: IGameCard[] = [
  {
    id: crypto.randomUUID(),
    icon: "Angry",
    num: "1"
  },
  {
    id: crypto.randomUUID(),
    icon: "Laugh",
    num: "2"
  },
  {
    id: crypto.randomUUID(),
    icon: "Annoyed",
    num: "3"
  },
  {
    id: crypto.randomUUID(),
    icon: "Meh",
    num: "4"
  },
  {
    id: crypto.randomUUID(),
    icon: "Smile",
    num: "5"
  },
  {
    id: crypto.randomUUID(),
    icon: "BugOff",
    num: "6"
  },
  {
    id: crypto.randomUUID(),
    icon: "Frown",
    num: "7"
  },
  {
    id: crypto.randomUUID(),
    icon: "Bug",
    num: "8"
  }
]

const CARD_PAIRS = 2

export function useGame() {
  const generateArray = (array: IGameCard[]) => {
    const newArray = array.flatMap((card) => [
      { ...card, id: crypto.randomUUID() },
      { ...card, id: crypto.randomUUID() }
    ])
    newArray.sort(() => Math.random() - 0.5)
    return newArray
  }
  const items = ref<IGameCard[]>(generateArray(cards))

  const selectedCards = ref<IGameCard[]>([])
  const completedCards = ref<IGameCard[]>([])
  const isLoading = ref(false)
  const isFinished = ref(false)
  const isStarted = ref(false)
  const seconds = ref(0)

  const startGame = () => {
    isStarted.value = true
  }

  const checkCard = (card: IGameCard) => {
    if (
      isLoading.value ||
      selectedCards.value.includes(card) ||
      completedCards.value.includes(card) ||
      !isStarted.value
    ) {
      return
    }

    isLoading.value = true

    selectedCards.value.push(card)

    if (selectedCards.value.length === CARD_PAIRS) {
      if (selectedCards.value[0].num === selectedCards.value[1].num) {
        completedCards.value.push(...selectedCards.value)
        selectedCards.value = []
      } else {
        setTimeout(() => {
          selectedCards.value = []
        }, 400)
      }
    }

    isLoading.value = false
  }

  return {
    items,
    selectedCards,
    completedCards,
    isLoading,
    isFinished,
    isStarted,
    seconds,
    startGame,
    checkCard
  }
}
