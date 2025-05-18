<script setup>
import { computed } from 'vue';
import IconButton from '../button/IconButton.vue';

const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  clickable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['open', 'pin', 'bookmark', 'delete']);

const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const truncatedText = computed(() => {
  return truncateText(props.note.text);
});

const handleOpen = () => {
  if (props.clickable) {
    emit('open', props.note);
  }
};

// Add a flag to prevent double emits
let isProcessing = false;

const handlePin = (event) => {
  if (isProcessing) return;
  isProcessing = true;
  
  // Use setTimeout to reset the flag after the current event cycle
  setTimeout(() => {
    isProcessing = false;
  }, 100);
  
  emit('pin', props.note.id, event);
};

const handleBookmark = (event) => {
  if (isProcessing) return;
  isProcessing = true;
  
  setTimeout(() => {
    isProcessing = false;
  }, 100);
  
  emit('bookmark', props.note.id, event);
};



const handleDelete = (event) => {
  if (isProcessing) return;
  isProcessing = true;
  
  setTimeout(() => {
    isProcessing = false;
  }, 100);
  
  emit('delete', props.note.id, event);
};
</script>

<template>
  <div 
    class="note-card"
    :class="{ 'clickable': clickable }"
    @click="handleOpen"
  >
    <div class="card h-100">
      <div class="card-body note-content">
        <h5 v-if="note.title" class="note-title">{{ note.title }}</h5>
        <div class="note-text">{{ truncatedText }}</div>
        <div class="note-actions">
        <IconButton 
          :icon="note.pinned ? 'bi-pin-angle-fill' : 'bi-pin-angle'" 
          :active="note.pinned"
          :title="note.pinned ? 'Unpin' : 'Pin'"
          @click="handlePin"
        />
        <IconButton 
          :icon="note.bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'" 
          :active="note.bookmarked"
          :title="note.bookmarked ? 'Unbookmark' : 'Bookmark'"
          @click="handleBookmark"
        />
        <IconButton 
          icon="bi-trash-fill" 
          danger
          title="Delete"
          @click="handleDelete"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  break-inside: avoid;
  transition: transform 0.2s, box-shadow 0.2s;
}

.note-card.clickable {
  cursor: pointer;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.note-content {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding-bottom: 40px;
}

.note-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-text {
  flex-grow: 1;
  white-space: pre-wrap;
  word-break: break-word;
  color: #202124;
  font-size: 0.875rem;
}

.note-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.note-card:hover .note-actions {
  opacity: 1;
}
</style>