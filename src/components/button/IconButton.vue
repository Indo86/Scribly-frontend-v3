<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  }
});

const buttonClass = computed(() => ({
  'active': props.active,
  'danger': props.danger
}));
</script>

<template>
  <button 
    class="btn-icon"
    :class="buttonClass"
    :title="title"
    @click.stop="$emit('click', $event)"
  >
    <i class="bi" :class="icon"></i>
  </button>
</template>

<style scoped>
.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  margin-right: 8px;
  color: #5f6368;
  border-radius: 50%;
}

.btn-icon:hover {
  background-color: rgba(95, 99, 104, 0.1);
}

.btn-icon.active i {
  color: #1a73e8;
}

.btn-icon.danger:hover {
  color: #d93025;
}
</style>