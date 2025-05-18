<script setup>
import { ref } from 'vue';
import BaseButton from '../button/BaseButton.vue';


const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  editing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle', 'edit-start', 'edit-save', 'edit-cancel', 'delete']);

const editText = ref(props.todo.text);

const saveEdit = () => {
  if (editText.value.trim()) {
    emit('edit-save', { id: props.todo.id, text: editText.value });
  }
};
</script>


<template>
 <li 
    class="list-group-item d-flex justify-content-between align-items-center p-3"
    :class="{'border-start-success': todo.completed}"
  >
    <!-- Display mode -->
    <div v-if="!editing" class="d-flex align-items-center flex-grow-1">
      <button 
        :class="{'completed': todo.completed}"
        class="check-btn me-3"  
        @click="$emit('toggle', todo.id)"
      >
        <i class="bi bi-check-circle-fill"></i>
      </button>

      <span :class="{ 'text-decoration-line-through text-muted': todo.completed, 'todo-text': true }">
        {{ todo.text }}
      </span>
    </div>

    <!-- Edit mode -->
    <div v-else class="d-flex flex-grow-1">
      <input 
        type="text" 
        class="form-control" 
        v-model="editText"
        @keyup.enter="saveEdit"
        autofocus
      >
    </div>

    <!-- Action buttons -->
    <div class="action-buttons">
      <div v-if="!editing">
        <BaseButton
          type="light"
          class="btn btn-sm me-1 action-btn" 
          @click="$emit('edit-start', todo)"
          title="Edit"
        >
          <i class="bi bi-pencil-square"></i>
        </BaseButton>

        <BaseButton
          type="light"
          class="btn btn-sm action-btn" 
          @click="$emit('delete', todo.id)"
          title="Delete"
        >
          <i class="bi bi-trash"></i>
        </BaseButton>
      </div>
      <div v-else>
        <BaseButton
          type="success"
          class="btn btn-sm me-1" 
          @click="saveEdit"
        >
          <i class="bi bi-check-lg me-1"></i> Save
        </BaseButton>
        <BaseButton
          type="secondary"
          class="btn btn-sm" 
          @click="$emit('edit-cancel')"
        >
          Cancel
        </BaseButton>
      </div>
    </div>
  </li>


</template>


<style scoped>

.list-group-item {
  transition: all 0.3s ease;
  border-left: 5px solid transparent;
}

.border-start-success {
  border-left: 5px solid #28a745 !important;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.check-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #dee2e6;
  transition: color 0.3s ease;
  padding: 0;
}

.check-btn:hover {
  color: #28a745;
}

.check-btn.completed {
  color: #28a745;
}

.todo-text {
  font-size: 1.1rem;
  word-break: break-word;
}

.action-buttons {
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.list-group-item:hover .action-buttons {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.action-btn:hover {
  background-color: #e9ecef;
}

</style>