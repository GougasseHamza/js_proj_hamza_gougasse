import { createRouter, createWebHistory } from 'vue-router';

import BookDetail from '@/components/BookDetail.vue';

import LibraryFile from '@/components/LibraryFile.vue';

const routes = [
    { path: '/', component: LibraryFile },
    { path: '/book/:id', component:BookDetail },
   
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
