<template>
    <div>
        <h1>Quiz Cinéma</h1>
        <Quiz category="tv_cinema" />
    </div>
</template>

<script>
import Quiz from '../components/Quiz.vue';

export default {
    components: {
        Quiz
    }
};
</script>