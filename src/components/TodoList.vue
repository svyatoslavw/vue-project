<script lang="ts" setup>
import { useMotions } from "@vueuse/motion"
import { Trash2Icon } from "lucide-vue-next"

import { Checkbox } from "./ui/checkbox"
import type { ITodo } from "@/lib/types"
import { useTodoStore } from "@/stores/todo"

const { todos } = defineProps<{ todos: ITodo[] }>()

const store = useTodoStore()
const { toggleTodo, removeTodo } = store

const motions = useMotions()
const getAnimationName = (index: number) => `todo${index + 1}`
</script>

<template>
  <transition
    v-for="(todo, index) in todos"
    :key="todo.id"
    :css="false"
    @leave="(el, done) => motions[getAnimationName(index)].leave(done)"
  >
    <div
      v-if="!todo.removing"
      v-motion="getAnimationName(index)"
      :initial="{
        y: 100,
        opacity: 0
      }"
      :visibleOnce="{
        y: 0,
        opacity: 1
      }"
      :leave="{
        opacity: 0
      }"
      class="flex w-full items-center justify-between gap-2 rounded-lg border bg-card px-5 py-3"
    >
      <div class="flex w-full items-center gap-3">
        <Checkbox @update:checked="toggleTodo(todo.id)" :checked="todo.completed" />
        <p class="w-full text-wrap" :class="todo.completed && 'text-neutral-500 line-through'">
          {{ todo.text }}
        </p>
      </div>
      <Trash2Icon
        class="size-4 cursor-pointer rounded-md text-neutral-500 hover:text-red-500"
        @click="removeTodo(todo.id)"
      />
    </div>
  </transition>

  <div v-motion-roll-bottom class="animate-pulse text-center text-neutral-300" v-if="!todos.length">
    There are no todos
  </div>
</template>
