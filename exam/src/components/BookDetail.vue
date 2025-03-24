<template>
    <div class="container mt-5">
        <div class="card bg-dark text-light shadow-lg">
            <div class="card-body">
                <h1 class="card-title text-warning text-center mb-4">Book Detail</h1>
                <p class="card-text">
                    <strong>Book Title:</strong> {{ book.title }}
                </p>
                <p class="card-text">
                    <strong>Book Author:</strong> {{ book.author }}
                </p>
                <p class="card-text">
                    <strong>Book Year:</strong> {{ book.annee }}
                </p>
                <p class="card-text">
                    <strong>Book Description:</strong> {{ book.description || "No description available." }}
                </p>
                <p class="card-text">
                    <strong>Book Category:</strong> {{ book.category }}
                </p>
                <p class="card-text">
                    <strong>Book Status:</strong> 
                    <span :class="book.status === 'disponible' ? 'text-success' : 'text-danger'">
                        {{ book.status }}
                    </span>
                </p>
                <router-link to="/" class="btn btn-outline-warning mt-3">Back to Library</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const book = ref({});
const route = useRoute();

onMounted(async () => {
    const response = await fetch(`http://localhost:3000/books/${route.params.id}`);
    book.value = await response.json();
});
</script>

<style scoped>
.card {
    border-radius: 15px;
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
}

.card-title {
    font-size: 2rem;
    font-weight: bold;
}

.card-text {
    font-size: 1.1rem;
    margin-bottom: 10px;
}

.btn-outline-warning {
    display: block;
    width: 100%;
    border-radius: 20px;
    font-weight: bold;
}
</style>