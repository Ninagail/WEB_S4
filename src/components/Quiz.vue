<template>
    <div>
        <h2>{{ loading ? 'Chargement...' : title }}</h2>
        <div v-if="!loading">
            <QuizDifficultySelector :selectedDifficulty="selectedDifficulty"
                @update:selectedDifficulty="updateSelectedDifficulty" :fetchQuizQuestions="fetchQuizQuestions" />

            <div>
                <label for="questionCount">Nombre de questions (10 max) : </label>
                <input type="number" id="questionCount" v-model.number="selectedQuestionCount" min="1" max="10">
                <button @click="startQuiz">Commencer le quiz</button>
            </div>

            <ProgressBar :current="currentQuestionIndex" :total="questions.length" />

            <QuizQuestion v-if="currentQuestionIndex < questions.length" :currentQuestionIndex="currentQuestionIndex"
                :questions="questions" :selectedAnswer="selectedAnswer" :selectAnswer="selectAnswer"
                :nextQuestion="nextQuestion" />

            <QuizResult v-else-if="questions.length > 0" :calculateScore="calculateScore" :scoreMessage="scoreMessage"
                :resetQuiz="resetQuiz" />
        </div>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { getQuizQuestions } from '../services/api/quizAPI.js';
import { shuffleArray } from '../utils/quizUtils.js';
import ProgressBar from './ProgressBar.vue';
import QuizDifficultySelector from './QuizDifficultySelector.vue';
import QuizQuestion from './QuizQuestion.vue';
import QuizResult from './QuizResult.vue';

export default {
    components: {
        ProgressBar,
        QuizDifficultySelector,
        QuizQuestion,
        QuizResult
    },
    props: {
        category: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: true,
            title: 'Quiz',
            questions: [],
            selectedDifficulty: 'facile',
            selectedAnswer: null,
            currentQuestionIndex: 0,
            score: 0,
            scoreMessage: '',
            quizSubmitted: false,
            selectedQuestionCount: 10,
            maxQuestionCount: 10,
        };
    },
    methods: {
        updateSelectedDifficulty(value) {
            this.selectedDifficulty = value;
        },
        async fetchQuizQuestions() {
            try {
                this.loading = true;

                const amount = parseInt(this.selectedQuestionCount);
                if (isNaN(amount) || amount <= 0) {
                    console.error('Le nombre de questions doit être un entier positif.');
                    this.loading = false;
                    return;
                }

                if (amount > this.maxQuestionCount) {
                    console.error('Le nombre de questions demandé dépasse la limite autorisée.');
                    this.loading = false;
                    return;
                }

                const data = await getQuizQuestions(amount, this.category, this.selectedDifficulty);
                this.questions = data.quizzes.map(quiz => {
                    const shuffledOptions = shuffleArray([quiz.answer, ...quiz.badAnswers]);
                    return {
                        question: quiz.question,
                        options: shuffledOptions,
                        correctAnswer: quiz.answer
                    };
                });

                this.loading = false;
            } catch (error) {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
                this.loading = false;
            }
        },
        startQuiz() {
            if (this.selectedQuestionCount > 10) {
                this.selectedQuestionCount = 10;
            }
            this.fetchQuizQuestions();
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.selectedAnswer = null;
            } else {
                this.currentQuestionIndex = this.questions.length;
                this.submitQuiz();
            }
        },
        selectAnswer(option) {
            this.selectedAnswer = option;
            if (option === this.questions[this.currentQuestionIndex].correctAnswer) {
                this.score++;
            }
        },
        calculateScore() {
            return this.score;
        },
        setScoreMessage() {
            const percentage = (this.score / this.questions.length) * 100;
            if (percentage >= 80) {
                this.scoreMessage = "Bravo ! Tu es un expert.";
            } else if (percentage >= 50) {
                this.scoreMessage = "Tu pourras faire mieux la prochaine fois.";
            } else {
                this.scoreMessage = "Hmm, tu devrais revoir tes classiques.";
            }
        },
        submitQuiz() {
            if (this.currentQuestionIndex === this.questions.length && !this.quizSubmitted) {
                const bestScore = localStorage.getItem(`bestScore_${this.category}`);
                const newScore = this.calculateScore();

                if (!bestScore || newScore > parseInt(bestScore)) {
                    localStorage.setItem(`bestScore_${this.category}`, newScore);
                }
                this.setScoreMessage();
                this.quizSubmitted = true;
            }
        },
        resetQuiz() {
            window.location.reload();
        }
    },

    async mounted() {
        await this.fetchQuizQuestions();
    }
};
</script>

<style>
@import '../assets/quiz.css';
</style>
