<script setup lang="ts">
import { onMounted, watch } from "vue"

import { IconSearch } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { usePosts } from "@/composables/usePosts"

const PAGES_COUNT = 5

const {
  fetchPosts,
  fetchPostsWithDelay,
  retryFetchPosts,
  isError,
  isLoading,
  page,
  limit,
  posts,
  searchTerm,
  sort,
  isRetrying
} = usePosts()

onMounted(() => {
  fetchPosts(true)
})

watch([sort, page], () => {
  fetchPosts()
})

watch(searchTerm, () => {
  fetchPostsWithDelay()
})
</script>

<template>
  <div class="mb-6 flex w-full items-center justify-center gap-2">
    <div class="relative w-full max-w-xs items-center">
      <Input
        v-model="searchTerm"
        :disabled="isLoading || isError"
        id="search"
        type="search"
        placeholder="Search..."
        class="bg-card pl-10"
      />
      <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
        <IconSearch class="size-4 text-muted-foreground" />
      </span>
    </div>
    <Button
      size="sm"
      @click="sort = 'asc'"
      variant="secondary"
      :disabled="sort === 'asc' || isLoading || isError"
      class="text-primary hover:text-primary"
      >Sort A-z</Button
    >
    <Button
      size="sm"
      @click="sort = 'desc'"
      variant="secondary"
      :disabled="sort === 'desc' || isLoading || isError"
      class="text-primary hover:text-primary"
      >Sort Z-a</Button
    >
  </div>

  <div class="mb-4 animate-pulse select-none text-center text-sm font-medium text-neutral-500">
    <p>If you see an error, don't worry, it's artificial</p>
  </div>

  <template v-if="isError && !isLoading">
    <div
      class="mb-4 flex h-28 flex-col justify-center gap-3 rounded border-l-[3px] border-red-600 bg-card p-2 text-center"
    >
      <p class="text-sm font-semibold text-red-600">Oops! An error occurred. Cannot load posts.</p>

      <div class="flex flex-col rounded-b-3xl border">
        <Button
          size="xs"
          variant="default"
          class="mx-[14rem] rounded-b-3xl"
          :class="isRetrying ? 'animate-btn-run px-6 text-secondary' : 'px-6'"
          @click="retryFetchPosts"
        >
          {{ !isRetrying ? "Retry" : "Loading..." }}
        </Button>
      </div>
    </div>
  </template>

  <template v-if="!isLoading">
    <div
      v-for="post in posts"
      :key="post.id"
      class="mb-4 flex h-28 flex-col gap-3 rounded border-l-[3px] border-primary bg-card p-2 text-center transition-colors hover:bg-accent"
    >
      <h4 class="overflow-hidden truncate font-semibold text-amber-200">
        {{ post.title }}
      </h4>
      <p class="line-clamp-3 text-sm text-neutral-500">
        {{ post.body }}
      </p>
    </div>
  </template>

  <template v-if="isLoading && !isError">
    <Skeleton
      v-for="i in limit"
      :key="i"
      class="mb-4 h-28 rounded border-l-[3px] border-primary bg-card p-2 text-center"
    />
  </template>

  <template v-if="!posts.length && !isLoading && !isError && !isRetrying">
    <div
      class="mb-4 flex h-28 flex-col justify-center gap-3 rounded border-l-[3px] border-amber-200 bg-card p-2 text-center"
    >
      <p class="text-sm font-semibold text-amber-200">Sorry, no posts found :(</p>
    </div>
  </template>

  <div class="flex justify-center">
    <Pagination
      :disabled="!posts.length"
      :page="page"
      v-slot="{ page: pp }"
      :total="limit * PAGES_COUNT"
      :items-per-page="limit"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="page = 1" />
        <PaginationPrev @click="page--" />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button
              class="h-9 w-9 p-0 disabled:opacity-100"
              @click="page = item.value"
              :variant="item.value === pp ? 'default' : 'outline'"
              :disabled="item.value === pp || isLoading || !posts.length"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="page++" />
        <PaginationLast @click="page = (limit * PAGES_COUNT) / limit" />
      </PaginationList>
    </Pagination>
  </div>
  <div
    class="my-8 h-2 w-full rounded-sm bg-[linear-gradient(90deg,_rgba(31,31,31,0)_0%,_rgba(52,63,74,0.8)_50%,_rgba(31,31,31,0)_100%)] opacity-20"
  ></div>
</template>
