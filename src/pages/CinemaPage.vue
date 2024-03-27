<template>
    <div>
        <Header />
        <Cinema />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Cinema from '../components/Cinema.vue';

export default {
    name: "CinemaPage",
    components: {
        Header,
        Footer,
        Cinema,
    },
}
</script>
