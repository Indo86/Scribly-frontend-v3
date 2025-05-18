<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import BaseButton from '../button/BaseButton.vue';
import IconButton from '../button/IconButton.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  note: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save', 'pin', 'bookmark']);
const localNote = ref(null);
let isProcessing = false;

watch(() => props.note, (newVal) => {
  if (newVal) {
    localNote.value = { ...newVal };
  }
}, { immediate: true });

const close = () => {
  emit('close');
};

const save = () => {
  if (localNote.value && (localNote.value.text.trim() || localNote.value.title.trim())) {
    emit('save', localNote.value);
  }
};

const togglePin = (event) => {
  if (isProcessing) return;
  isProcessing = true;
  
  setTimeout(() => {
    isProcessing = false;
  }, 100);
  if (localNote.value) {
    localNote.value.pinned = !localNote.value.pinned;
    emit('pin', localNote.value.id, event);

  }
};

const toggleBookmark = (event) => {

  if (isProcessing) return;
  isProcessing = true;
  
  setTimeout(() => {
    isProcessing = false;
  }, 100);

  if (localNote.value) {
    localNote.value.bookmarked = !localNote.value.bookmarked;
    emit('bookmark', localNote.value.id, event);
  }
};


</script>

<template>
  <div v-if="show && localNote" class="modal-backdrop" @click="close">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <input 
          type="text" 
          class="form-control modal-title-input" 
          placeholder="Title" 
          v-model="localNote.title"
        >
        <div class="modal-actions">
          <IconButton 
            :icon="localNote.pinned ? 'bi-pin-angle-fill' : 'bi-pin-angle'" 
            :active="localNote.pinned"
            :title="localNote.pinned ? 'Unpin' : 'Pin'"
            @click.stop="togglePin"
          />
          <IconButton 
            :icon="localNote.bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'" 
            :active="localNote.bookmarked"
            :title="localNote.bookmarked ? 'Unbookmark' : 'Bookmark'"
            @click.stop="toggleBookmark"
          />
          <button class="btn-close ms-2" @click="close"></button>
        </div>
      </div>
      <div class="modal-body">
        <textarea 
          class="form-control note-editor" 
          v-model="localNote.text" 
          placeholder="Take a note..."
          rows="8"
        ></textarea>
      </div>
      <div class="modal-footer">
        <small class="text-muted">Last edited: {{ new Date(localNote?.createdAt).toLocaleString() }}</small>
        <BaseButton type="primary" @click="save">Save</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-title-input {
  border: none;
  font-size: 1.25rem;
  font-weight: 500;
  flex-grow: 1;
  margin-right: 16px;
  padding: 0;
}

.modal-title-input:focus {
  outline: none;
  box-shadow: none;
}

.modal-actions {
  display: flex;
  align-items: center;
}

.modal-body {
  padding: 8px 16px;
  flex-grow: 1;
  overflow-y: auto;
}

.note-editor {
  border: none;
  resize: none;
  width: 100%;
  min-height: 150px;
  font-size: 16px;
}

.note-editor:focus {
  outline: none;
  box-shadow: none;
}

.modal-footer {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
}
</style>