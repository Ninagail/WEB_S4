import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import CinemaPage from './pages/CinemaPage.vue';
import ArtPage from './pages/ArtPage.vue';
import Musique from './pages/MusiquePage.vue';


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
    {
        path: '/art',
        component: ArtPage,
        name : 'ArtPage'
    },
    {
        path: '/musique',
        component: Musique,
        name : 'Musique'
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
