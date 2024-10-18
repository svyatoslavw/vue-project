import type { icons } from "lucide-vue-next"

export interface IPost {
  id: number
  userId: number
  title: string
  body: string
}

export interface ITodo {
  id: string
  text: string
  completed: boolean
  removing: boolean
}

export interface ICurrencyResponse {
  exchangeRate: {
    baseCurrency: string
    currency: string
    saleRateNB: number
    purchaseRateNB: number
    saleRate: number
    purchaseRate: number
  }[]
}

export interface ICurrencyItem {
  baseCurrency: string
  currency: string
  sale: number
  purchase: number
}

export type IFilterTodos = "completed" | "uncompleted" | "all"

export interface IGameCard {
  id: string
  icon: keyof typeof icons
  num: string
}
