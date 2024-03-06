<template>
    <div>
        <h2>{{ title }}</h2>
        <div v-if="loading">Chargement...</div>
        <div v-else>
            <div v-if="currentQuestionIndex < quizQuestions.length">
                <h3>{{ quizQuestions[currentQuestionIndex].question }}</h3>
                <ul>
                    <li v-for="(option, i) in quizQuestions[currentQuestionIndex].options" :key="i">
                        <label>
                            <input type="radio" :value="option" v-model="selectedAnswers[currentQuestionIndex]">
                            {{ option }}
                        </label>
                    </li>
                </ul>
                <button class="nextButton" @click="nextQuestion">
                    {{ currentQuestionIndex === quizQuestions.length - 1 ? 'Terminer' : 'Question suivante' }}
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

export default {
    props: {
        title: String,
        questions: Array,
        loading: Boolean
        // Ajoutez d'autres props nécessaires
    },
    setup(props) {
        const quizQuestions = ref(props.questions);
        const loading = ref(props.loading);
        const selectedAnswers = ref([]);
        const currentQuestionIndex = ref(0);
        const score = ref(0);
        const scoreMessage = ref('');

        const nextQuestion = () => {
            if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
                currentQuestionIndex.value++;
            } else {
                currentQuestionIndex.value = quizQuestions.value.length;
                submitQuiz();
            }
        };


        const selectAnswer = (option) => {
            selectedAnswers[currentQuestionIndex.value] = option;
        };

        const calculateScore = () => {
            score.value = 0;
            for (let i = 0; i < quizQuestions.value.length; i++) {
                if (selectedAnswers.value[i] === quizQuestions.value[i].correctAnswer) {
                    score.value++;
                }
            }
            return score.value;
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

        const submitQuiz = () => {
            if (currentQuestionIndex.value === quizQuestions.value.length) {
                calculateScore();
                setScoreMessage();
            }

        };
        const resetQuiz = () => {
            window.location.reload();
        };
        

        return { quizQuestions, loading, selectedAnswers, currentQuestionIndex, score, scoreMessage, nextQuestion, selectAnswer, calculateScore, setScoreMessage, submitQuiz, resetQuiz };
    }
}; 
</script>

<style>
.h2 {
    text-align: center;

}

.nextButton {
    text-align: center;
    margin-top: 20px;
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10px;

}

.nextButton:hover {
    background-color: #28862d;
}

.message {
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
}

.label {
    margin-top: 10px;

}
</style>
