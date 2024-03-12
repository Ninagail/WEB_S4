<template>
    <Menu />
    <Bienvenue />
    <Score :bestScores="bestScores" />
    <Footer />
</template>

<script>
import Menu from '../components/Menu.vue';
import Bienvenue from '../components/Bienvenue.vue';
import Score from '../components/Score.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "HomePage",
    components: {
        Menu,
        Bienvenue,
        Score,
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