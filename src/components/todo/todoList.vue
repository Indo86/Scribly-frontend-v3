<script setup>
import { ref,computed, defineEmits } from 'vue';
import BaseButton from '../button/BaseButton.vue';
import todoItem from './todoItem.vue';

const props = defineProps({
  todos: {
    type: Array,
    required: true
  },
  filter: {
    type: String,
    required: true
  },
  editingId: {
    type: Number,
    default: null
  }
});

const emit = defineEmits([
  'toggle', 
  'edit-start', 
  'edit-save', 
  'edit-cancel', 
  'delete', 
  'clear-completed'
]);

// Filter todos based on status
const filteredTodos = computed(() => {
  if (props.filter === 'active') {
    return props.todos.filter(todo => !todo.completed);
  } else if (props.filter === 'completed') {
    return props.todos.filter(todo => todo.completed);
  }
  return props.todos;
});

// Count active todos
const activeTodoCount = computed(() => {
  return props.todos.filter(todo => !todo.completed).length;
});

const hasCompleted = computed(() => {
  return props.todos.some(todo => todo.completed);
});
</script>


<template>

<div class="card shadow">
    <div class="card-body p-0">
      <ul class="list-group list-group-flush" v-if="filteredTodos.length > 0">
        <todoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :editing="editingId === todo.id"
          @toggle="$emit('toggle', $event)"
          @edit-start="$emit('edit-start', $event)"
          @edit-save="$emit('edit-save', $event)"
          @edit-cancel="$emit('edit-cancel')"
          @delete="$emit('delete', $event)"
        />
      </ul>
      
      <!-- Empty state -->
      <div v-else class="empty-state p-5 text-center">
        <i class="bi bi-clipboard-check display-1 text-muted"></i>
        <p class="mt-3 text-muted">No tasks yet. Add some tasks to get started!</p>
      </div>
      
      <!-- Footer -->
      <div class="card-footer d-flex justify-content-between align-items-center" v-if="todos.length > 0">
        <small class="text-muted">{{ activeTodoCount }} To Do left</small>
        <BaseButton 
          type="danger"
          class="btn btn-sm"
          @click="$emit('clear-completed')"
          v-if="hasCompleted"
        >Clear completed</BaseButton>
      </div>
    </div>
  </div>


</template>


<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  border: none;
}

.empty-state {
  color: #6c757d;
}

.card-footer {
  background-color: #f8f9fa;
  padding: 0.75rem 1.25rem;
}
</style>