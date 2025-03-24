<template>
    <div class="filterbook bg-dark text-light p-4 rounded">
        <h2 class="text-center mb-4">Filter Books</h2>
        <div class="d-flex flex-column align-items-center gap-3">
            <input
                type="text"
                v-model="title"
                class="form-control w-50"
                placeholder="Search Book"
                @input="emitTitle"
            />
            <input
                type="text"
                v-model="author"
                class="form-control w-50"
                placeholder="Search Author"
                @input="emitAuthor"
            />
            <select
                v-model="status"
                class="form-select w-50"
                @change="emitStatus"
            >
                <option value="">All Statuses</option>
                <option value="disponible">Disponible</option>
                <option value="emprunte">Emprunté</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const title = ref('');
const author = ref('');
const status = ref('');

const emit = defineEmits(['update-author', 'update-title', 'update-status']);

const emitTitle = () => emit('update-title', title.value);
const emitAuthor = () => emit('update-author', author.value);
const emitStatus = () => emit('update-status', status.value);
</script>

<style scoped>
.filterbook {
    margin-top: 50px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>