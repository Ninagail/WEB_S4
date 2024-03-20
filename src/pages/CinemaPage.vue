<template>
    <div>
        <Menu />
        <Cinema />
        <Footer />
    </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Cinema from '../components/Cinema.vue';

export default {
    name: "CinemaPage",
    components: {
        Menu,
        Footer,
        Cinema,
    },
}
</script>
