<template>
    <div>
        <h2>{{ loading ? 'Chargement...' : title }}</h2>
        <div v-if="!loading">
            <div>
                <label for="difficulty">Choisissez le niveau de difficulté :</label>
                <select id="difficulty" v-model="selectedDifficulty" @change="fetchQuizQuestions">
                    <option value="facile">Facile</option>
                    <option value="normal">Normal</option>
                    <option value="difficile">Difficile</option>
                </select>
            </div>
            <div v-if="currentQuestionIndex < questions.length">
                <h3>{{ questions[currentQuestionIndex].question }}</h3>
                <ul>
                    <li v-for="(option, i) in questions[currentQuestionIndex].options" :key="i">
                        <button
                            :class="{ 'selected': selectedAnswer === option, 'correct': selectedAnswer === option && option === questions[currentQuestionIndex].correctAnswer, 'incorrect': selectedAnswer === option && option !== questions[currentQuestionIndex].correctAnswer }"
                            @click="selectAnswer(option)" :disabled="selectedAnswer">
                            {{ option }}
                        </button>
                    </li>
                </ul>
                <button class="nextButton" @click="nextQuestion">
                    {{ currentQuestionIndex === questions.length - 1 ? 'Terminer' : 'Question suivante' }}
                </button>
            </div>
            <div v-else>
                <p>Résultat du quiz:</p>
                <p>Score: {{ calculateScore() }}</p>
                <p class="message">{{ scoreMessage }}</p>
                <button class="nextButton" @click="resetQuiz">Recommencer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getQuizQuestions } from '../services/api/quizAPI.js';
import { shuffleArray } from '../utils/quizUtils.js';

export default {
    props: {
        title: String,
        questions: Array,
        loading: Boolean
    },
    setup(props) {
        const quizQuestions = ref(props.questions);
        const selectedAnswer = ref(null);
        const currentQuestionIndex = ref(0);
        const score = ref(0);
        const scoreMessage = ref('');
        const quizCompleted = ref(false);
        const quizSubmitted = ref(false);

        const nextQuestion = () => {
            if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
                currentQuestionIndex.value++;
                selectedAnswer.value = null; // Réinitialiser la réponse sélectionnée pour la prochaine question
            } else {
                currentQuestionIndex.value = quizQuestions.value.length;
                submitQuiz();
            }
        };

        const selectAnswer = (option) => {
            selectedAnswer.value = option;
            if (option === quizQuestions.value[currentQuestionIndex.value].correctAnswer) {
                score.value++; // Incrémenter le score si la réponse est correcte
            }
        };



        const setScoreMessage = () => {
            const percentage = (score.value / quizQuestions.value.length) * 100;
            if (percentage >= 80) {
                scoreMessage.value = "Bravo ! Tu es un expert.";
            } else if (percentage >= 50) {
                scoreMessage.value = "Tu pourras faire mieux la prochaine fois.";
            } else {
                scoreMessage.value = "Hmm, tu devrais revoir tes classiques.";
            }
        };



        const resetQuiz = () => {
            window.location.reload();
        };

        return {
            quizQuestions,
            loading: props.loading,
            selectedAnswer,
            currentQuestionIndex,
            score,
            scoreMessage,
            nextQuestion,
            selectAnswer,
            calculateScore,
            setScoreMessage,
            submitQuiz,
            resetQuiz
        };
    }
}; 
</script>

<style>
@import '../assets/quiz.css';
</style>
