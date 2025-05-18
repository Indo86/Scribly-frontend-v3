<script setup>
import { ref, watch, onMounted } from 'vue';
import BaseButton from '@/components/button/BaseButton.vue';

const props = defineProps({
  show: Boolean,
  user: Object
});
const emit = defineEmits(['close','save']);

const name    = ref('');
const email   = ref('');
const gender  = ref('');

// Perbaikan watch dengan immediate: true
watch(() => props.show, (newVal) => {
  if (newVal && props.user) {
    name.value   = props.user.name;
    email.value  = props.user.email;
    gender.value = props.user.gender || '';
  }
}, { immediate: true });

// Juga watch user untuk memastikan data selalu sinkron
watch(() => props.user, (newVal) => {
  if (props.show && newVal) {
    name.value   = newVal.name;
    email.value  = newVal.email;
    gender.value = newVal.gender || '';
  }
}, { immediate: true });

const doSave = () => {
  emit('save', {
    name:   name.value.trim(),
    email:  email.value.trim(),
    gender: gender.value
  });
};
</script>

<template>
  <!-- Gunakan teleport untuk menempatkan modal di luar struktur DOM normal -->
  <teleport to="body">
    <div v-if="show" class="edit-backdrop" @click.self="$emit('close')">
       <div class="edit-modal">
        <h3>Edit Profile</h3>
        <div class="form-group">
          <label>Name</label>
          <input v-model="name" type="text" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" />
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select v-model="gender">
            <option value="">— pilih gender —</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="actions">
          <BaseButton type="light" @click="$emit('close')">Cancel</BaseButton>
          <BaseButton type="primary" @click="doSave">Save</BaseButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>


.edit-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .edit-modal {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    padding: 20px;
    width: 320px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 2001;
  }


h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>