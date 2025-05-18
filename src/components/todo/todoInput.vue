<script setup>
import { ref } from 'vue';
import BaseButton from '../button/BaseButton.vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Add To Do..'
  }
});

const emit = defineEmits(['add-todo']);
const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim()) {
    emit('add-todo', newTodo.value);
    newTodo.value = '';
  }
};

</script>


<template>

<div class="add-todo-container">
    <div class="add-todo-carda">
      <div class="collapsed-form mb-4">
        <div class="input-group shadow-xl">
          <input 
            v-model="newTodo"
            @keyup.enter="addTodo"
            type="text"
            class="form-control"
            :placeholder="placeholder"
          />
          <BaseButton type="primary" @click="addTodo">
            <i class="bi bi-plus-lg"></i>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped>
.add-todo-container{
  max-width: 600px;
  margin: 20px auto 40px;
}

.collapsed-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 50px;
}

</style>