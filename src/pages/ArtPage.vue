<template>
    <div>
        <Menu />
        <Art />
        <Footer />
    </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Cinema from '../components/Cinema.vue';

export default {
    name: "ArtPage",
    components: {
        Menu,
        Footer,

    },

}
</script>