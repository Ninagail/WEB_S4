<template>
    <div>
        <Header />
        <Music />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Music from '../components/Music.vue';

export default {
    name: "MusicPage",
    components: {
        Header,
        Footer,
        Music,

    },

}
</script>