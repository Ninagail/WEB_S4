<template>
    <div>
        <h2>{{ title }}</h2>
        <h2>{{ loading }}</h2>
        <div v-if="loading">Chargement...</div>
        <div v-else>
            <div v-if="currentQuestionIndex < quizQuestions.length">
                <h3>{{ quizQuestions[currentQuestionIndex].question }}</h3>
                <ul>
                    <li v-for="(option, i) in quizQuestions[currentQuestionIndex].options" :key="i">
                        <button
                            :class="{ 'selected': selectedAnswer === option, 'correct': selectedAnswer === option && option === quizQuestions[currentQuestionIndex].correctAnswer, 'incorrect': selectedAnswer === option && option !== quizQuestions[currentQuestionIndex].correctAnswer }"
                            @click="selectAnswer(option)" :disabled="selectedAnswer">
                            {{ option }}
                        </button>
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

        const calculateScore = () => {
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
            if (currentQuestionIndex.value === quizQuestions.value.length && !quizSubmitted.value) {
                setScoreMessage();
                emit('quizCompleted', score.value);
                quizSubmitted.value = true;
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
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.correct {
    background-color: #4CAF50;
    color: white;
}

.incorrect {
    background-color: #af4c56;
    color: white;
}

button {
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}

.nextButton {
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
</style>
