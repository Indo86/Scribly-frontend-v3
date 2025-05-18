<script setup>
import { ref } from 'vue';
import BaseButton from '../button/BaseButton.vue';
import IconButton from '../button/IconButton.vue';

const emit = defineEmits(['add']);

const showForm = ref(false);
const title = ref('');
const text = ref('');

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) {
    title.value = '';
    text.value = '';
  }
};

const openForm = () => {
  showForm.value = true;
}

const closeForm = () => {
  showForm.value = false;
  title.value = '';
  text.value = '';
};

const saveNote = () => {
  if (text.value.trim() || title.value.trim()) {
    emit('add', {
      title: title.value.trim(),
      text: text.value.trim()
    });
    title.value = '';
    text.value = '';
    showForm.value = false;
  }
};
</script>

<template>
  <div class="add-note-container">
    <div class="card add-note-card" :class="{ 'expanded': showForm }">
      <div v-if="!showForm" class="card-body collapsed-form" @click="toggleForm">
        <div class="placeholder-text">Take a note...</div>
        <div class="quick-actions">
          <IconButton icon="bi-plus-lg" title="New note" @click="openForm"/>
        </div>
      </div>
      <div v-else class="card-body expanded-form">
        <input 
          type="text" 
          class="form-control note-title-input" 
          placeholder="Title" 
          v-model="title"
        >
        <textarea 
          class="form-control note-content-input" 
          rows="3" 
          placeholder="Take a note..." 
          v-model="text"
        ></textarea>
        <div class="form-actions">
          <div class="form-tools">
            <IconButton icon="bi-type-bold" title="Bold" />
            <IconButton icon="bi-type-italic" title="Italic" />
            <IconButton icon="bi-list-ul" title="List" />
          </div>
          <div>
            <BaseButton type="light" class="me-2" @click="closeForm">Close</BaseButton>
            <BaseButton type="primary" @click="saveNote">Save</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-note-container {
  max-width: 600px;
  margin: 20px auto 40px;
}

.add-note-card {
  transition: box-shadow 0.3s, height 0.3s;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
}

.add-note-card.expanded {
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.collapsed-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 50px;
}

.placeholder-text {
  color: #5f6368;
  font-size: 16px;
}

.quick-actions {
  display: flex;
}

.expanded-form {
  display: flex;
  flex-direction: column;
}

.note-title-input {
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  padding: 0;
}

.note-content-input {
  border: none;
  resize: none;
  min-height: 80px;
  margin-bottom: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f1f3f4;
}

.form-tools {
  display: flex;
}

input:focus, textarea:focus {
  outline: none;
  box-shadow: none !important;
}
</style>