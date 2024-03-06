<template>
    <Menu />
    <Bienvenue :bestScores="bestScores" />
    <Footer />
</template>

<script>
import Menu from '../components/Menu.vue';
import Bienvenue from '../components/Bienvenue.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "HomePage",
    components: {
        Menu,
        Bienvenue,
        Footer
    },
    data() {
        return {
            bestScores: {
                cinema: localStorage.getItem('cinema'),
                art: localStorage.getItem('art'),
                musique: localStorage.getItem('musique')
            }
        };
    }
}
</script>