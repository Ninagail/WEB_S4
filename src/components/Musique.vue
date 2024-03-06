<template>
    <div>
        <h2>Quiz Musique</h2>
        <div v-if="loading">Chargement...</div>
        <div v-else>
            <div v-for="(question, index) in quizQuestions" :key="index">
                <h3>{{ question.question }}</h3>
                <ul>
                    <li v-for="(option, i) in question.options" :key="i">
                        <label>
                            <input type="radio" :value="option" v-model="selectedAnswers[index]">
                            {{ option }}
                        </label>
                    </li>
                </ul>
            </div>
            <button @click="submitQuiz">Soumettre</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getQuizQuestions } from '../services/api/quizAPI.js';

export default {
    name: 'Musique',
    setup() {
        const quizQuestions = ref([]);
        const loading = ref(true);
        const selectedAnswers = ref([]);

        const fetchQuizQuestions = async () => {
            try {
                const data = await getQuizQuestions(10, 'musique', 'facile'); // Modifier les paramètres selon tes besoins
                quizQuestions.value = data.quizzes.map(quiz => {
                    return {
                        question: quiz.question,
                        options: [quiz.answer, ...quiz.badAnswers],
                    };
                });
                loading.value = false;
            } catch (error) {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
            }
        };

        const submitQuiz = () => {
            console.log('Selected answers:', selectedAnswers.value);
        };

        fetchQuizQuestions();

        return { quizQuestions, loading, selectedAnswers, submitQuiz };
    },
};
</script>