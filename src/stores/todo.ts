import { defineStore } from "pinia"
import { computed, ref } from "vue"

import type { IFilterTodos, ITodo } from "@/lib/types"
import { useLocalStorage } from "@/lib/utils"

export const useTodoStore = defineStore("todo", () => {
  const { value, setValue } = useLocalStorage<ITodo[]>("todos", [])

  const filters = ref<IFilterTodos>("all")
  const todos = ref<ITodo[]>(value)
  const text = ref("")
  const uncompletedTodos = computed(() => todos.value.filter((todo) => !todo.completed))
  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))

  function addTodo() {
    if (text.value.trim() === "") {
      alert("Please enter some text")
      return
    }

    if (text.value.length > 70) {
      alert("Please enter a text less than 70 characters")
      return
    }

    todos.value.push({
      id: crypto.randomUUID(),
      completed: false,
      removing: false,
      text: text.value
    })
    setValue(todos.value)
    text.value = ""
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
    setValue(todos.value)
  }

  function removeTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id)

    if (todo) {
      todo.removing = true
      setTimeout(() => {
        todos.value = todos.value.filter((t) => t.id !== id)
        setValue(todos.value)
      })
    }
  }

  function changeFilter(filter: IFilterTodos) {
    filters.value = filter
  }

  return {
    todos,
    text,
    filters,
    completedTodos,
    uncompletedTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    changeFilter
  }
})
