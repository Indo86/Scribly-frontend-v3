<script setup>
const props = defineProps({
  currentFilter: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:filter']);

const setFilter = (filter) => {
  emit('update:filter', filter);
};

</script>


<template>

<div class="d-flex justify-content-center mb-3">
    <div class="btn-group" role="group">
      <button 
        @click="setFilter('all')" 
        :class="['btn', currentFilter === 'all' ? 'btn-primary' : 'btn-outline-primary']"
      >
        All
      </button>
      <button 
        @click="setFilter('active')" 
        :class="['btn', currentFilter === 'active' ? 'btn-primary' : 'btn-outline-primary']"
      >
        Active
      </button>
      <button 
        @click="setFilter('completed')" 
        :class="['btn', currentFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary']"
      >
        Completed
      </button>
    </div>
  </div>

</template>


<style scoped>



</style>