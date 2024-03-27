<template>
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
</template>

<script>
export default {
    props: {
        currentQuestionIndex: Number,
        questions: Array,
        selectedAnswer: String,
        selectAnswer: Function,
        nextQuestion: Function
    }
};
</script>