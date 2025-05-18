<!-- src/components/modal/ChangePasswordModal.vue -->
<script setup>
import { ref, watch } from 'vue';
import BaseButton from '../button/BaseButton.vue';

const props = defineProps({
  show: { type: Boolean, default: false }
});
const emit = defineEmits(['close', 'save']);

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const error = ref(null);

watch(() => props.show, val => {
  if (val) {
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    error.value = null;
  }
});

const onClose = () => emit('close');

const onSave = () => {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = "Semua field wajib diisi";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Password baru dan konfirmasi tidak cocok";
    return;
  }
  emit('save', { oldPassword: oldPassword.value, newPassword: newPassword.value });
};
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click="onClose">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h5 class="modal-title">Change Password</h5>
        <button class="btn-close" @click="onClose"></button>
      </div>
      <div class="modal-body">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div class="mb-3">
          <label class="form-label">Old Password</label>
          <input type="password" v-model="oldPassword" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">New Password</label>
          <input type="password" v-model="newPassword" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm New Password</label>
          <input type="password" v-model="confirmPassword" class="form-control" />
        </div>
      </div>
      <div class="modal-footer">
        <BaseButton type="secondary" @click="onClose">Cancel</BaseButton>
        <BaseButton type="primary" @click="onSave">Save</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed; top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.5);
  display:flex; align-items:center; justify-content:center;
  z-index:1050;
}
.modal-container {
  background:#fff; border-radius:6px; width:100%; max-width:400px;
  overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.2);
}
.modal-header, .modal-footer { padding:1rem; display:flex; align-items:center; }
.modal-header { justify-content: space-between; border-bottom:1px solid #e9ecef; }
.modal-body { padding:1rem; }
.btn-close { border:none; background:transparent; font-size:1.25rem; }
.modal-footer { justify-content:flex-end; gap:.5rem; border-top:1px solid #e9ecef; }
</style>
