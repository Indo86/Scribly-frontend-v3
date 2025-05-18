<script setup>
import { ref, onMounted, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import NoteCard from '@/components/card/NoteCard.vue';
import NoteModal from '@/components/modal/NoteModal.vue';
import api from '@/services/api';


const notes = ref([]);
const showModal = ref(false);
const currentNote = ref(null);
const loading = ref(false);

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

onMounted(() => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes);
  }
});


const deleteNote = async (id, event) =>{
  event.stopPropagation();

  try{
    await api.deleteNote(id);
    notes.value = notes.value.filter(note => note.id !== id);
  }catch(error){
    console.error('Error deleting note: ', error)
  }
}

const toggleBookmarked = async (id, event) =>{
  event.stopPropagation();

  const note = notes.value.find(note => note.id === id);
  if(note){
    const updatedNote  = { ...note, bookmarked: !note.bookmarked};
    try{
      await api.updateNote(id, updatedNote);
      note.bookmarked = !note.bookmarked;
      notes.value = [...notes.value];
    }catch(error){
      console.error('Error updating note: ', error);
    }
  }
}


const togglePinned = async (id, event)=>{
  event.stopPropagation();

  const note = notes.value.find(note => note.id === id);

  if(note){
    const updateNote = { ...note, pinned: !note.pinned};
    try{
      await api.updateNote(id, updateNote);
      note.pinned = !note.pinned;
      notes.value = [...notes.value]
    }catch(error){
      console.error('Error updating note: ', error)
    }
  }
}


// Open modal with note details
const openNoteModal = (note) => {
  currentNote.value = note;
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
    try{
      await api.updateNote(updatedNote.id, updatedNote);
      const index = notes.value.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        notes.value[index] = updatedNote;
      }
    closeModal();
    }catch(error){
      console.error('Error updating note: ', error)
    }
  }
};

// Filter bookmarked notes based on pinned status
const pinnedBookmarkedNotes = computed(() => 
  notes.value.filter(note => note.bookmarked && note.pinned && !note.archived)
);

const unpinnedBookmarkedNotes = computed(() => 
  notes.value.filter(note => note.bookmarked && !note.pinned && !note.archived)
);

// Count of total bookmarks
const totalBookmarks = computed(() => 
  pinnedBookmarkedNotes.value.length + unpinnedBookmarkedNotes.value.length
);
</script>

<template>
  <Navbar />
  <div class="main-content">
    <div class="bookmark-header">
      <h1>Bookmarks</h1>
      <span class="bookmark-count">{{ totalBookmarks }} Notes</span>
    </div>
    
    <!-- Pinned bookmarked notes section -->
    <div v-if="pinnedBookmarkedNotes.length > 0" class="notes-section">
      <h5 class="notes-section-title">Pinned Bookmarks</h5>
      <div class="notes-grid">
        <NoteCard 
          v-for="note in pinnedBookmarkedNotes"
          :key="note.id"
          :note="note"
          @open="openNoteModal"
          @pin="togglePinned"
          @bookmark="toggleBookmarked"
          @delete="deleteNote"
        />
      </div>
    </div>
    
    <!-- Other bookmarked notes section -->
    <div v-if="unpinnedBookmarkedNotes.length > 0" class="notes-section">
      <h5 class="notes-section-title">Other Bookmarks</h5>
      <div class="notes-grid">
        <NoteCard 
          v-for="note in unpinnedBookmarkedNotes"
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
    <div v-if="totalBookmarks === 0" class="empty-state">
      <i class="bi bi-bookmark-star fs-1 mb-3"></i>
      <p>No bookmarks yet. Bookmark notes from the main page!</p>
    </div>
    

    <NoteModal 
      :show="showModal"
      :note="currentNote"
      @close="closeModal"
      @save="saveChanges"
    />
  </div>
</template>

<style scoped>
.bookmark-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bookmark-count {
  margin-left: 15px;
  font-size: 0.9rem;
  color: #5f6368;
  background-color: #f1f3f4;
  padding: 4px 12px;
  border-radius: 16px;
}

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