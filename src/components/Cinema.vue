<template>
    <Quiz :title="title" :questions="questions" :loading="loading" category="tv_cinema" />
    <h2>{{ loading }}</h2>
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
        const title = ref('Quiz Cinéma et TV');
        const questions = ref([]);
        const loading = ref(true);

        const handleQuizCompleted = (score) => {
            const category = 'tv_cinema';
            const bestScore = localStorage.getItem(`bestScore_${category}`);
            if (!bestScore || score > parseInt(bestScore)) {
                localStorage.setItem(`bestScore_${category}`, score);
            }
            console.log('Quiz completed with score:', score);
        };

        const fetchQuizQuestions = async () => {
            try {
                const data = await getQuizQuestions(3, 'tv_cinema', 'facile');
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
                loading.value = false;
            }
        };

        fetchQuizQuestions();

        return { title, questions, loading, handleQuizCompleted };
    }
};
</script>
