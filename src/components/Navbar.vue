<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidenavOpen = ref(true);
const toggleSidenav = () => {
  isSidenavOpen.value = !isSidenavOpen.value;
};

watch(isSidenavOpen, (newVal) => {
  const mainContent = document.querySelector('.main-content');
  const logoText = document.querySelector('.logo-text')
  if (mainContent) {
    if (newVal) {
      mainContent.classList.remove('collapsed');
      logoText.style.display = 'block'; 
    } else {
      mainContent.classList.add('collapsed');
      logoText.style.display = 'none';  
    }
  }
});

const navigateTo = (route) => {
  router.push({ name: route });
};
</script>

<template>
  <header>
    <div 
      id="sidenav" 
      class="sidenav" 
      :class="{ 'sidenav-closed': !isSidenavOpen }" 
      role="navigation"
    >
      <a class="d-flex justify-content-center py-4" href="#!">
        <span class="logo-text">Scribly</span>
      </a>
      <ul class="sidenav-menu">
        <li class="sidenav-item">
          <a class="sidenav-link" :class="{ 'active': $route.name === 'home' }" @click="navigateTo('home')">
            <i class="bi bi-list-task me-3"></i><span>To-Do List</span>
          </a>
        </li>
        <li class="sidenav-item">
          <a class="sidenav-link" :class="{ 'active': $route.name === 'bookmarks' }" @click="navigateTo('bookmarks')">
            <i class="bi bi-bookmark-fill me-3"></i><span>Bookmarks</span>
          </a>
        </li>
        <li class="sidenav-item">
          <a class="sidenav-link" :class="{ 'active': $route.name === 'notes' }" @click="navigateTo('notes')">
            <i class="bi bi-journal-text me-3"></i><span>Notes</span>
          </a>
        </li>
        <!-- New Profile Link -->
        <li class="sidenav-item">
          <a class="sidenav-link" :class="{ 'active': $route.name === 'profile' }" @click="navigateTo('profile')">
            <i class="bi bi-person-circle me-3"></i><span>Profile</span>
          </a>
        </li>
      </ul>
    </div>
    
    <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container-fluid">
        <i class="bi bi-list fs-3" @click="toggleSidenav"></i>

        <div class="navbar-brand">
          <span class="ms-2 d-none d-md-inline fw-bold">Scribly</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Sidenav styles */
.sidenav {
  position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      padding: 58px 0 0; /* Height of navbar */
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
      width: 240px;
      z-index: 600;
  flex-direction: column;
}

.sidenav-closed {
  width: 60px;
}

.sidenav-closed .sidenav-link span {
  display: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b71ca;
}

.sidenav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidenav-item {
  padding: 8px 0;
}

.sidenav-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #4f4f4f;
  text-decoration: none;
  border-radius: 5px;
  margin: 0 8px;
  transition: all 0.3s;
  cursor: pointer;
}

.sidenav-link:hover,
.sidenav-link.active {
  background-color: rgba(59, 113, 202, 0.1);
  color: #3b71ca;
}

.sidenav-link.active {
  font-weight: 600;
}

/* Navbar */
nav {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

/* Search Box */
.search-box {
  max-width: 600px;
  width: 100%;
}

.search-input {
  height: 45px;
  font-size: 1rem;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-icon {
  background-color: #3b71ca;
  color: white;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
}


/* Responsive adjustments */
@media (max-width: 992px) {
  .sidenav {
    transform: translateX(-100%);
  }
  
  .sidenav.sidenav-closed {
    transform: translateX(-100%);
  }
  
  /* .main-content,
  .main-content-collapsed {
    margin-left: 0 !important;
  }
   */
  .sidenav.show {
    transform: translateX(0);
  }
}
</style>