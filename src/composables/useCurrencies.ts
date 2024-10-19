import { ref } from "vue"

import type { ICurrencyItem, ICurrencyResponse } from "@/lib/types"
import { formatDate, sleep, timeout } from "@/lib/utils"

const GOLD = "XAU"

export function useCurrencies() {
  const date = new Date(new Date().setDate(new Date().getDate() - 1))
  const isProduction = import.meta.env.PROD
  const baseUrl = isProduction ? "https://api.privatbank.ua" : "/api"

  const url = `${baseUrl}/p24api/exchange_rates?date=${formatDate(date)}`

  const items = ref<ICurrencyItem[]>([])

  const isLoading = ref(false)
  const isError = ref(false)
  const isRetrying = ref(false)

  const fetchCurrencies = async (withError = false) => {
    isLoading.value = true
    try {
      await sleep(1000)

      if (withError) {
        await timeout()
      }

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      })

      if (!response.ok) {
        throw new Error("Error fetching currencies")
      }

      const data = (await response.json()) as ICurrencyResponse

      if (!data.exchangeRate) {
        throw new Error("Currencies not found")
      }

      items.value = data.exchangeRate
        .filter((item) => item.saleRateNB && item.purchaseRateNB && item.currency !== GOLD)
        .map((item) => ({
          baseCurrency: item.baseCurrency,
          currency: item.currency,
          sale: item.saleRateNB,
          purchase: item.purchaseRateNB
        }))

      return data
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const retryFetchCurrencies = async () => {
    isRetrying.value = true
    isError.value = false
    await fetchCurrencies()
    isRetrying.value = false
  }

  return {
    items,
    isLoading,
    isError,
    isRetrying,
    fetchCurrencies,
    retryFetchCurrencies
  }
}
