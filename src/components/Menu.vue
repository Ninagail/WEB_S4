<template>
    <title>Page de Bienvenue</title>
    <nav class="nav-background">
        <div class="buttons">
            <router-link class="button" to="/cinema">Cinéma</router-link>
            <router-link class="button" to="/art">Art</router-link>
            <router-link class="button" to="/musique">Musique</router-link>
        </div>


    </nav>
    <link rel="stylesheet" href="base.css">
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
.nav-background {
    padding: 20px;
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10px;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.button:hover {
    background-color: #28862d;
}

h1 {
    font-size: 2em;
    justify-content: center;
}
</style>
