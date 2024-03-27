<template>
    <div>
        <title>Page de Bienvenue</title>
        <nav class="nav-background">
            <button class="button-quizz" @click="goToHome">Quizzz</button>
            <div class="buttons">
                <router-link class="button" to="/cinema">Cinéma</router-link>
                <router-link class="button" to="/art">Art</router-link>
                <router-link class="button" to="/music">Musique</router-link>
            </div>
        </nav>
        <link rel="stylesheet" href="main.css">
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        goToHome() {
            this.$router.push('/');
        }
    }
}
</script>

<style>
.nav-background {
    padding: 5px;
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

@media screen and (max-width: 768px) {
    .buttons {
        flex-direction: column;
        align-items: center;
    }

    .button {
        margin: 8px;
    }
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
    margin: 16px 16px;
    cursor: pointer;
}

.button:hover {
    background-color: #28862d;
}

.button-quizz {
    margin-bottom: 20px;
    background-color: #d05797;
    border: none;
    padding: 20px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10px;
}

.button-quizz:hover {
    background-color: #dc0a7a;
}
</style>
