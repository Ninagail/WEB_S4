import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import CinemaPage from './pages/CinemaPage.vue';


const routes = [
    {
        path: '/',
        component: HomePage,
        name : 'HomePage'
    },
        
    {
        path: '/cinema',
        component: CinemaPage,
        name : 'CinemaPage'
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
