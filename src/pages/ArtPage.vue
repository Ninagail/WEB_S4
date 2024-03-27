<template>
    <div>
        <Header />
        <Art />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Art from '../components/Art.vue';

export default {
    name: "ArtPage",
    components: {
        Header,
        Footer,
        Art,

    },

}
</script>