<template>
    <div>
        <h2>Quiz Cinéma et TV</h2>
        <div v-if="loading">Chargement...</div>
        <div v-else>
            <div v-for="(question, index) in questions" :key="index">
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

export default {
    name: 'Cinema',
    setup() {
        const questions = ref([]);
        const loading = ref(true);

        const fetchQuizQuestions = async () => {
            try {
                const response = await fetch("https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=tv_cinema");
                const data = await response.json();
                questions.value = data.quizzes; // Assurez-vous que vous accédez aux questions correctement
                loading.value = false;
            } catch (error) {
                console.error("Erreur lors de la récupération des questions du quiz :", error);
            }
        };

        fetchQuizQuestions();

        return { questions, loading }; // Exportez les données pour pouvoir les utiliser dans un autre composant
    }
};
</script>
  
  
  

  
  
  