<template>
    <li>Cinéma et TV: {{ bestScores.cinema || 'Aucun score enregistré' }}</li>
    <li>Art: {{ bestScores.art || 'Aucun score enregistré' }}</li>
    <li>Musique: {{ bestScores.music || 'Aucun score enregistré' }}</li>
</template>

<script>
export default {
    name: 'Score',
    props: {
        bestScores: Object
    }

}
</script>
<style scoped>
li {
    margin-top: 1rem;
    margin-bottom: 2rem;
    height: 2rem;

}
</style>