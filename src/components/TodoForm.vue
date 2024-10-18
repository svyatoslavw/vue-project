<script lang="ts" setup>
import { ListChecks, ListTodo, ListTree } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { ref } from "vue"

import { IconList } from "./icons"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useTodoStore } from "@/stores/todo"

const store = useTodoStore()
const { addTodo, changeFilter } = store

const { text, filters } = storeToRefs(store)

const open = ref(false)

const onSubmit = (e: Event) => {
  e.preventDefault()
  addTodo()
}
</script>

<template>
  <form
    :onsubmit="onSubmit"
    v-motion-fade-visible-once
    class="flex w-full items-center justify-center gap-2"
  >
    <div class="relative w-full max-w-xs items-center">
      <Input v-model="text" placeholder="Add new todo..." class="bg-card pl-10" />
      <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
        <IconList v-motion-roll-visible-left :delay="100" class="size-6 text-muted-foreground" />
      </span>
    </div>
    <Button v-motion-slide-right type="submit" size="sm">Add new todo</Button>
  </form>

  <Accordion @update:modelValue="open = !open" type="single" collapsible>
    <AccordionItem value="item-1" class="rounded-2xl border-0 bg-transparent p-0 shadow-none">
      <AccordionTrigger class="flex min-w-[220px] items-center justify-center gap-2 text-xs"
        >{{ open ? "Hide" : "Show" }} filters</AccordionTrigger
      >
      <AccordionContent class="flex gap-1">
        <Button
          size="xs"
          @click="changeFilter('all')"
          :variant="filters === 'all' ? 'default' : 'outline'"
        >
          <ListTree class="mr-2 size-4" />
          All</Button
        >
        <Button
          size="xs"
          @click="changeFilter('completed')"
          :variant="filters === 'completed' ? 'default' : 'outline'"
        >
          <ListChecks class="mr-2 size-4" />
          Completed
        </Button>
        <Button
          size="xs"
          @click="changeFilter('uncompleted')"
          :variant="filters === 'uncompleted' ? 'default' : 'outline'"
        >
          <ListTodo class="mr-2 size-4" />
          In progress</Button
        >
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
