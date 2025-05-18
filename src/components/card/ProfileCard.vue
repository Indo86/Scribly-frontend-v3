<script setup>
import BaseButton from '../button/BaseButton.vue';
const props = defineProps({ user: Object });
const emit = defineEmits(['logout','change-password','edit-profile']);

const onEdit = () => emit('edit-profile')
const onChange = () => emit('change-password');
const onLogout = () => emit('logout');
</script>

<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="profile-avatar">
        <i class="bi bi-person-circle"></i>
      </div>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <div class="profile-details">
      <div class="detail-item">
        <span class="detail-label">Name</span>
        <div class="detail-content">
          <span>{{ user.name }}</span>
          <BaseButton type="light" class="edit-btn" @click="onEdit">
              <i class="bi bi-pencil"></i>
          </BaseButton>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Email</span>
        <div class="detail-content">
          <span>{{ user.email }}</span>
           <BaseButton type="light" class="edit-btn" @click="onEdit">
              <i class="bi bi-pencil"></i>
          </BaseButton>
        </div>
      </div>

      <div class="detail-item">
        <span class="detail-label">Gender</span>
        <div class="detail-content">
          <span>{{ user.gender }}</span>
        </div>
      </div>
    </div>

   <div class="profile-actions">
      <BaseButton type="warning" @click="onChange">
        Change Password
      </BaseButton>
      <BaseButton type="danger" @click="onLogout">
        Logout
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 30px;
  text-align: center;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.profile-avatar i {
  font-size: 100px;
  color: #3b71ca;
}

.profile-header h2 {
  margin-bottom: 5px;
  color: #333;
}

.profile-header p {
  color: #666;
}

.profile-details {
  text-align: left;
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.detail-label {
  font-weight: 600;
  color: #666;
}

.detail-content {
  display: flex;
  align-items: center;
}

.edit-btn {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 12px;
}

.profile-actions {
  display: flex;
  justify-content: space-evenly;
  flex:1;
  gap: 15px;
}

.edit-password-btn,
.logout-btn {
  flex-grow: 1;
}
</style>
