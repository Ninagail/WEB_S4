<template>
    <footer>
        <p>
            Un quiz pour toute la famille fait avec <a href="https://vitejs.dev/" target="_blank"
                rel="noopener">Vite</a> and
            <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3 </a> par Nina Gaillard.
        </p>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>
<style>
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    background-color: #333;
}

@media screen and (max-height: 768px) {
    footer {
        position: static;
    }
}
</style>
