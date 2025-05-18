<script setup>
import { ref, onMounted } from 'vue';
import ProfileCard from '@/components/card/ProfileCard.vue';
import ChangePasswordModal from '@/components/modal/ChangePasswordModal.vue';
import EditProfileModal from '@/components/modal/EditProfileModal.vue';
import Navbar from '@/components/Navbar.vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const user       = ref(null);
const showEdit   = ref(false);
const showChange = ref(false);
const router     = useRouter();

const fetchUser = async () => {
  try {
    const { data } = await api.getProfile();
    user.value = data.data;
  } catch {
    router.push('/login');
  }
};

const doLogout = async () => {
  try {
    await api.logout();
    router.push('/login');
  } catch (err) {
    console.error('Logout failed', err);
    alert('Gagal logout. Coba lagi.');
  }
};

async function onSaveProfile(updated){
  try {
    await api.updateProfile(updated);
    showEdit.value = false;
    await fetchUser();
    alert('Profil berhasil diperbarui');
  } catch(err){
    alert(err.response?.data?.message || 'Gagal update profil');
  }
}


const onChangePassword = () => {
  showChange.value = true;
};
const onEditProfile = () => {
  showEdit.value = true;
};


const onSavePassword = async ({ oldPassword, newPassword}) => {
  try {
    await api.updatePassword(oldPassword, newPassword);
    showChange.value = false;
    alert("Password berhasil diubah");
  } catch (err) {
    alert(err.response?.data?.message || "Gagal mengubah password");
  }
};

onMounted(fetchUser);
</script>

<template>
  <Navbar />
  <div class="main-content">
    <h1>My Profile</h1>
    <ProfileCard
      v-if="user"
      :user="user"
      @logout="doLogout"
      @change-password="onChangePassword"
      @edit-profile="onEditProfile"
    />
      <EditProfileModal
      :show="showEdit"
      :user="user"
      @close="showEdit = false"
      @save="onSaveProfile"
    />

    <ChangePasswordModal
      :show="showChange"
      @close="showChange = false"
      @save="onSavePassword"
    />
  </div>
</template>
<style scoped>
.profile-page {
  background-color: #f4f6f9;
  min-height: 100vh;
}

.main-content {
  margin-left: 240px;
  padding: 20px;
  transition: margin-left 0.3s;
}

.main-content.collapsed {
  margin-left: 60px;
}

h1 {
  color: #3b71ca;
  font-weight: 600;
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
