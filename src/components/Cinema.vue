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
            <div>
                <label for="questionCount">Nombre de questions (10 max) : </label>
                <input type="number" id="questionCount" v-model.number="selectedQuestionCount" min="1" max="10">
                <button @click="startQuiz">Commencer le quiz</button>
            </div>
            <div>
                <ProgressBar :current="currentQuestionIndex" :total="questions.length" />
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
import ProgressBar from './ProgressBar.vue';

export default {
    components: {
        ProgressBar
    },
    setup() {
        const title = ref('Quiz Cinéma et TV');
        const questions = ref([]);
        const loading = ref(true);
        const selectedDifficulty = ref('facile');
        const selectedAnswer = ref(null);
        const currentQuestionIndex = ref(0);
        const score = ref(0);
        const scoreMessage = ref('');
        const quizSubmitted = ref(false);
        const selectedQuestionCount = ref(10);
        const maxQuestionCount = ref(10);


        const fetchQuizQuestions = async () => {
            try {
                loading.value = true;

                const amount = parseInt(selectedQuestionCount.value);
                if (isNaN(amount) || amount <= 0) {
                    console.error('Le nombre de questions doit être un entier positif.');
                    loading.value = false;
                    return;
                }

                if (amount > maxQuestionCount.value) {
                    console.error('Le nombre de questions demandé dépasse la limite autorisée.');
                    loading.value = false;
                    return;
                }

                const data = await getQuizQuestions(amount, 'tv_cinema', selectedDifficulty.value);
                questions.value = data.quizzes.map(quiz => {
                    const shuffledOptions = shuffleArray([quiz.answer, ...quiz.badAnswers]);
                    return {
                        question: quiz.question,
                        options: shuffledOptions,
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

        const startQuiz = async () => {
            if (selectedQuestionCount.value > 10) {
                selectedQuestionCount.value = 10;
            }
            loading.value = true;
            try {
                await fetchQuizQuestions(selectedDifficulty.value, selectedQuestionCount.value);
            } catch (error) {
                console.error("Erreur lors du chargement des questions :", error);
            } finally {
                loading.value = false;
            }
        };

        const nextQuestion = () => {
            if (currentQuestionIndex.value < questions.value.length - 1) {
                currentQuestionIndex.value++;
                selectedAnswer.value = null;
            } else {
                currentQuestionIndex.value = questions.value.length;
                submitQuiz();
            }
        };

        const selectAnswer = (option) => {
            selectedAnswer.value = option;
            if (option === questions.value[currentQuestionIndex.value].correctAnswer) {
                score.value++;
            }
        };

        const calculateScore = () => {
            return score.value;
        };

        const setScoreMessage = () => {
            const percentage = (score.value / questions.value.length) * 100;
            if (percentage >= 80) {
                scoreMessage.value = "Bravo ! Tu es un expert.";
            } else if (percentage >= 50) {
                scoreMessage.value = "Tu pourras faire mieux la prochaine fois.";
            } else {
                scoreMessage.value = "Hmm, tu devrais revoir tes classiques.";
            }
        };

        const submitQuiz = () => {
            if (currentQuestionIndex.value === questions.value.length && !quizSubmitted.value) {
                const category = 'tv_cinema';
                const bestScore = localStorage.getItem(`bestScore_${category}`);
                const newScore = calculateScore();

                if (!bestScore || newScore > parseInt(bestScore)) {
                    localStorage.setItem(`bestScore_${category}`, newScore);
                }

                quizSubmitted.value = true;
            }
        };

        const resetQuiz = () => {
            window.location.reload();
        };



        fetchQuizQuestions();

        return {
            title,
            questions,
            loading,
            selectedDifficulty,
            selectedAnswer,
            currentQuestionIndex,
            score,
            scoreMessage,
            nextQuestion,
            selectAnswer,
            calculateScore,
            setScoreMessage,
            submitQuiz,
            resetQuiz,
            fetchQuizQuestions,
            startQuiz,
            selectedQuestionCount
        };
    }
};
</script>

<style>
@import '../assets/quiz.css';
</style>
