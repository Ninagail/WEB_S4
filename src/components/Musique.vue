<template>
    <Quiz :title="title" :questions="questions" :loading="loading" category="musique" />
</template>

<script>
import Quiz from '../components/Quiz.vue';
import { ref } from 'vue';
import { getQuizQuestions } from '../services/api/quizAPI.js';

export default {
    components: {
        Quiz
    },
    setup() {
        const title = ref('Quiz Musique');
        const questions = ref([]);
        const loading = ref(true);

        const fetchQuizQuestions = async () => {
            try {
                const data = await getQuizQuestions(3, 'musique', 'facile');
                questions.value = data.quizzes.map(quiz => {
                    return {
                        question: quiz.question,
                        options: [quiz.answer, ...quiz.badAnswers],
                        correctAnswer: quiz.answer
                    };
                });
                loading.value = false;
                console.log(questions.value);
            } catch (error) {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
            }
        };

        fetchQuizQuestions();

        return { title, questions, loading };
    }
};
</script>