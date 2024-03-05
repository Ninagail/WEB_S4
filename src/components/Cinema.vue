<template>
    <div>
        <h2>Quiz Cinéma et TV</h2>
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
    name: 'Cinema',
    data() {
        return {
            quizQuestions: [],
            selectedAnswers: [],
            loading: true // Ajout de la variable loading
        };
    },
    mounted() {
        getQuizQuestions(10, 'cinema', 'easy')
            .then(questions => {
                this.quizQuestions = questions;
                this.loading = false; // Mettre à jour loading une fois les questions chargées
            })
            .catch(error => {
                console.error('Error getting cinema quiz questions:', error);
                this.loading = false; // Assure-toi de mettre à jour loading en cas d'erreur également
            });
    },
    methods: {
        submitQuiz() {
            console.log('Selected answers:', this.selectedAnswers);
        }
    }
};
</script>
