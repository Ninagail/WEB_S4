import { createRouter, createWebHistory } from 'vue-router';
import Quiz from './components/Quiz.vue';
import Cinema from './components/Cinema.vue';
// Importez d'autres composants pour d'autres catégories de quiz

const routes = [
    {
        path: '/',
        redirect: '/quiz' // Redirige '/' vers '/quiz'
    },
    {
        path: '/quiz',
        component: Quiz
    },
    {
        path: '/tv-cinema',
        component: Cinema
    },
    // Ajoutez d'autres routes pour d'autres catégories de quiz
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
