<script setup>
import LoginCard from '@/components/card/LoginCard.vue';
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = ref(null); // untuk menangani error

const loginUser = async (formData) => {
  try {
    const res = await api.login(formData);
    router.push('/'); 
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal';
  }
};
</script>

<template>
  <div class="container">
    <div class="layout-wraper flex flex-col align-items-center justify-content-center">
        <LoginCard @login="loginUser" />
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.layout-wraper{
  width:100%;
  max-width: 400px;
  margin: 0 auto;
}

.alert{
  max-width: 400px;
}

</style>
