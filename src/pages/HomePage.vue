<template>
    <Header />
    <Welcome />
    <Score :bestScores="bestScores" />
    <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Welcome from '../components/Welcome.vue';
import Score from '../components/Score.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "HomePage",
    components: {
        Header,
        Welcome,
        Score,
        Footer
    },
    data() {
        return {
            bestScores: {
                cinema: localStorage.getItem('bestScore_tv_cinema'),
                art: localStorage.getItem('bestScore_art_litterature'),
                music: localStorage.getItem('bestScore_musique')
            }
        };
    }
}
</script>