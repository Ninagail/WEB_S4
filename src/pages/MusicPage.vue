<template>
    <div>
        <Menu />
        <Musique />
        <Footer />
    </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Musique from '../components/Musique.vue';

export default {
    name: "MusiquePage",
    components: {
        Menu,
        Footer,
        Musique,

    },

}
</script>