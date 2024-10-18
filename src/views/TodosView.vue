<script setup lang="ts">
import { storeToRefs } from "pinia"

import TodoForm from "@/components/TodoForm.vue"
import TodoList from "@/components/TodoList.vue"
import { useTodoStore } from "@/stores/todo"

const store = useTodoStore()

const { todos, filters, completedTodos, uncompletedTodos } = storeToRefs(store)
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div class="mb-4 animate-pulse select-none text-center text-sm font-medium text-neutral-500">
      <p>Here you can add, delete and filter your todos</p>
    </div>
    <TodoForm />
    <div class="flex w-full max-w-md flex-col gap-2">
      <template v-if="filters === 'all'">
        <TodoList :todos="todos" />
      </template>

      <template v-if="filters === 'completed'">
        <TodoList :todos="completedTodos" />
      </template>

      <template v-if="filters === 'uncompleted'">
        <TodoList :todos="uncompletedTodos" />
      </template>
    </div>
  </div>
</template>
