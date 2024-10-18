<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
  <header class="mb-6 flex w-full flex-col items-center justify-center gap-4 p-3 font-inter">
    <h1
      class="bg-gradient-to-tr from-green-400 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent"
    >
      Vue Project
    </h1>
    <nav class="flex gap-2 text-sm text-neutral-400">
      <RouterLink
        to="/"
        activeClass="rounded-sm bg-card px-4 py-2 text-primary"
        class="rounded-sm px-4 py-2 transition-all hover:bg-card/50 hover:text-foreground"
        >Home</RouterLink
      >
      <RouterLink
        to="/game"
        activeClass="rounded-sm bg-card px-4 py-2 text-primary"
        class="rounded-sm px-4 py-2 transition-all hover:bg-card/50 hover:text-foreground"
        >Game</RouterLink
      >
      <RouterLink
        to="/todos"
        activeClass="rounded-sm bg-card px-4 py-2 text-primary"
        class="rounded-sm px-4 py-2 transition-all hover:bg-card/50 hover:text-foreground"
        >Todos</RouterLink
      >
    </nav>
  </header>
  <RouterView class="mx-auto max-w-2xl font-inter" />
</template>
