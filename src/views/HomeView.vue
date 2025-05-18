<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import todoInput from '@/components/todo/todoInput.vue';
import todoList from '@/components/todo/todoList.vue';
import TodoFilter from '@/components/todo/todoFilter.vue';
import api from '@/services/api';


const todos = ref([]);
const editingId = ref(null);
const filter = ref('all'); 
const loading = ref(false);

const fetchTodos = async () => {
  loading.value = true;
  try {
    const response = await api.getTodos();
    todos.value = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  } finally {
    loading.value = false;
  }
};

// Add a new todo
const addTodo = async (text) => {
  try {
    const newTodo = {
      text: text,
      completed: false
    };
    const response = await api.addTodo(newTodo);
    todos.value.push(response.data);
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};

// Toggle todo completion
const toggleComplete = async (id) => {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await api.updateTodo(id, updatedTodo);
      todo.completed = !todo.completed;
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
};

// Start editing a todo
const startEdit = (todo) => {
  editingId.value = todo.id;
};

// Save edited todo
const saveEdit = async (data) => {
  if (data.text.trim()) {
    try {
      const todo = todos.value.find(todo => todo.id === data.id);
      if (todo) {
        const updatedTodo = { ...todo, text: data.text };
        await api.updateTodo(data.id, updatedTodo);
        todo.text = data.text;
        editingId.value = null;
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
};

// Cancel editing
const cancelEdit = () => {
  editingId.value = null;
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    await api.deleteTodo(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

// Clear all completed todos
const clearCompleted = async () => {
  const completedTodos = todos.value.filter(todo => todo.completed);
  
  try {
    // Delete each completed todo
    for (const todo of completedTodos) {
      await api.deleteTodo(todo.id);
    }
    todos.value = todos.value.filter(todo => !todo.completed);
  } catch (error) {
    console.error('Error clearing completed todos:', error);
  }
};

// Load todos from API on component mount
onMounted(() => {
  fetchTodos();
});

</script>


<template>

<Navbar />
  <div class="main-content">
    <div class="row">
      <div class="col-md-12">
        <div class="todo">
          <h1 class="mb-4 text-center">My To Do</h1>
          
          <todoInput @add-todo="addTodo" />
          
          <TodoFilter 
            :current-filter="filter" 
            @update:filter="filter = $event" 
          />

          <!-- Loading indicator -->
          <div v-if="loading" class="text-center my-4">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <todoList
            v-if="!loading"
            :todos="todos"
            :filter="filter"
            :editing-id="editingId"
            @toggle="toggleComplete"
            @edit-start="startEdit"
            @edit-save="saveEdit"
            @edit-cancel="cancelEdit"
            @delete="deleteTodo"
            @clear-completed="clearCompleted"
          />
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped>
.todo {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #343a40;
  font-weight: 600;
}
</style>  