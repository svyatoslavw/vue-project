import { computed, ref } from "vue"

import type { IPost } from "@/lib/types"
import { debounce, sleep, timeout } from "@/lib/utils"

const POSTS_PER_PAGE = 4
const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
const ERROR_MSG = "There was an artificial error in Posts request. Please try again."

export function usePosts() {
  const page = ref(1)
  const searchTerm = ref("")
  const sort = ref<"asc" | "desc">("asc")
  const posts = ref<IPost[]>([])
  const isLoading = ref(false)
  const isError = ref(false)
  const isRetrying = ref(false)

  const apiUrl = computed(() => {
    const searchParam = searchTerm.value ? `&q=${searchTerm.value}` : ""
    return `${BASE_URL}?_page=${page.value}&_limit=${POSTS_PER_PAGE}&_sort=title&_order=${sort.value}${searchParam}`
  })

  const fetchPosts = async (withError = false) => {
    isLoading.value = true
    isError.value = false

    if (searchTerm.value) page.value = 1

    try {
      await sleep(400)

      if (withError) await timeout()

      const response = await fetch(apiUrl.value)
      posts.value = await response.json()
    } catch {
      isError.value = true
      console.log(ERROR_MSG)
    } finally {
      isLoading.value = false
      isRetrying.value = false
    }
  }

  const fetchPostsWithDelay = debounce(() => {
    fetchPosts()
  }, 500)

  const retryFetchPosts = () => {
    isRetrying.value = true
    debounce(() => fetchPosts(), 2_000)()
  }

  return {
    page,
    searchTerm,
    limit: POSTS_PER_PAGE,
    sort,
    posts,
    isLoading,
    isError,
    isRetrying,
    fetchPosts,
    retryFetchPosts,
    fetchPostsWithDelay
  }
}
