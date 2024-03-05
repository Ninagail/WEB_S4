<template>
    <Menu />
    <Bienvenue />
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
    }
}
</script>