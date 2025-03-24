<template>

    <div class="bg-dark text-light min-vh-100">
        <header class="bg-warning text-dark py-3">
            <div class="container text-center">
                <h1 class="display-4 fw-bold">Book Manager</h1>
            </div>
        </header>
        <LibraryFilter @update-title="handletitle" @update-author="handleauthor" @update-status="handlestatus" />
        <div class="container mt-4">
            <h1 class="mb-4 text-center">Books</h1>
            <div class="row">
                <div class="col-md-4 mb-4" v-for="book in filteredbooks" :key="book.id">
                    <div class="card h-100 bg-secondary text-light shadow">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-warning">{{ book.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
                            <img src="@/assets/imagebook.jpg" alt="IMAGE">
                            <p class="card-text mt-3">
                                <strong>Category:</strong> {{ book.category }}<br />

                                <strong>Status:</strong> 
                                <span :class="book.status === 'disponible' ? 'text-success' : 'text-danger'">
                                    {{ book.status }}
                                </span>
                            </p>
                            <router-link :to="`/book/${book.id}`" class="btn btn-outline-warning mt-auto">Details</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LibraryFilter from './LibraryFilter.vue';
import { ref } from 'vue';
import { onMounted, computed } from 'vue';

const books = ref([]);
const title = ref('');
const author = ref('');
const status = ref('');

onMounted(async () => {
    const response = await fetch("http://localhost:3000/books");
    books.value = await response.json();
});

const filteredbooks = computed(() => {
    return books.value.filter(book => {
        if (title.value && !book.title.toLowerCase().includes(title.value.toLowerCase())) {
            return false;
        }
        if (author.value && !book.author.toLowerCase().includes(author.value.toLowerCase())) {
            return false;
        }
        if (status.value && book.status !== status.value) {
            return false;
        }
        return true;
    });
});

function handletitle(val) {
    title.value = val;
}
function handleauthor(val) {
    author.value = val;
}
function handlestatus(val) {
    status.value = val;
}
</script>

<style scoped>

body {
    background-color: #121212;
    color: #ffffff;
}

.card {
    border-radius: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.card-text {
    font-size: 0.9rem;
}

.btn-outline-warning {
    border-radius: 20px;
}

.text-success {
    font-weight: bold;
}

.text-danger {
    font-weight: bold;
}
</style>