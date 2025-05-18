<script setup>
import { ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import NoteCard from '@/components/card/NoteCard.vue';
import AddNoteCard from '@/components/card/AddNoteCard.vue';
import NoteModal from '@/components/modal/NoteModal.vue';
import api from '@/services/api'; 

// State for notes
const notes = ref([]);
const showModal = ref(false);
const currentNote = ref(null);
const loading = ref(false);

// Fetch notes from API
const fetchNotes = async () => {
  loading.value = true;
  try {
    const response = await api.getNotes();
    notes.value = response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNotes();
});

const addNote = async (noteData) => {
  const note = {
    title: noteData.title,
    text: noteData.text,
    pinned: false,
    bookmarked: false,
    archived: false,
    createdAt: new Date().toISOString()
  };
  
  try {
    const response = await api.addNote(note);
    notes.value.unshift(response.data);
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

// Delete a note
const deleteNote = async (id, event) => {
  event.stopPropagation();
  
  try {
    await api.deleteNote(id);
    notes.value = notes.value.filter(note => note.id !== id);
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

// Toggle pinned status
const togglePinned = async (id, event) => {
  event.stopPropagation();
  
  const note = notes.value.find(note => note.id == id);
  
  if (note) {
    const updatedNote = { ...note, pinned: !note.pinned };
    
    try {
      await api.updateNote(id, updatedNote);
      note.pinned = !note.pinned;
      notes.value = [...notes.value];
    } catch (error) {
      console.error('Error updating note:', error);
    }
  } 
};

const toggleBookmarked = async (id, event) => {
  event.stopPropagation();

  const note = notes.value.find(note => note.id == id);
  if (note) {
    const updatedNote = { ...note, bookmarked: !note.bookmarked };
    
    try {
      await api.updateNote(id, updatedNote);
      note.bookmarked = !note.bookmarked;
      notes.value = [...notes.value];
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
};

// Open modal with note details
const openNoteModal = (note) => {
  currentNote.value = { ...note }; // Create a copy to avoid direct mutations
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
  currentNote.value = null;
};

// Save changes from modal
const saveChanges = async (updatedNote) => {
  if (updatedNote) {
    try {
      await api.updateNote(updatedNote.id, updatedNote);
      const index = notes.value.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
      closeModal();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }
};

// Filter notes based on pinned and archived status
const pinnedNotes = computed(() => 
  notes.value.filter(note => note.pinned && !note.archived)
);

const unpinnedNotes = computed(() => 
  notes.value.filter(note => !note.pinned && !note.archived)
);
</script>

<template>
  <Navbar />
  <div class="main-content">
    <h1>My Notes</h1>
    
    <!-- Loading indicator -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <!-- Add new note section -->
    <AddNoteCard @add="addNote"/>
    
    <!-- Pinned notes section -->
    <div v-if="pinnedNotes.length > 0" class="notes-section">
      <h5 class="notes-section-title">Pinned Notes</h5>
      <div class="notes-grid">
        <NoteCard 
          v-for="note in pinnedNotes"
          :key="note.id"
          :note="note"
          @open="openNoteModal"
          @pin="togglePinned"
          @bookmark="toggleBookmarked"
          @delete="deleteNote"
        />
      </div>
    </div>
    
    <!-- Other notes section -->
    <div class="notes-section">
      <h5 v-if="pinnedNotes.length > 0" class="notes-section-title">Other Notes</h5>
      <div class="notes-grid">
        <NoteCard 
          v-for="note in unpinnedNotes"
          :key="note.id"
          :note="note"
          @open="openNoteModal"
          @pin="togglePinned"
          @bookmark="toggleBookmarked"
          @delete="deleteNote"
        />
      </div>
    </div>
    
    <!-- Empty state message -->
    <div v-if="!loading && pinnedNotes.length === 0 && unpinnedNotes.length === 0" class="empty-state">
      <i class="bi bi-sticky fs-1 mb-3"></i>
      <p>No notes yet. Create your first note above!</p>
    </div>
    
    <!-- Note edit modal -->
    <NoteModal 
      :show="showModal"
      :note="currentNote"
      @close="closeModal"
      @save="saveChanges"
      @pin="togglePinned"
      @bookmark="toggleBookmarked"
    />
  </div>
</template>

<style scoped>
.notes-section {
  margin-top: 30px;
}

.notes-section-title {
  margin-bottom: 15px;
  font-weight: 500;
  color: #5f6368;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.empty-state {
  text-align: center;
  margin-top: 50px;
  color: #5f6368;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>