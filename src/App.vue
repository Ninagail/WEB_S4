<script setup >
import { computed, ref } from 'vue';
//import { Quiz } from './services/api/quiz.vue'

const questions = ref([
  {
    question: "Quel acteur a joué le rôle de James Bond dans le film Casino Royale ?",
    options: ["Pierce Brosnan", "Daniel Craig", "Sean Connery", "Roger Moore"],
    answer: "Daniel Craig",

  }

]);
const currentQuestion = ref(0);
const getQuestions = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const setAnswer = e => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return
  }
  quizCompleted.value = true;
};
</script>

<template>
  <main class="app">
    <h1>
      Quizzzzzzz
    </h1>
    <section class="quiz">
      <div class="quiz-info">
        <span class="question">
          {{ getQuestions.question }}
        </span>
      </div>
      <div class="options">
        <ul>
          <li v-for="(option, index) in getQuestions.options" :key="index">
            <label>
              <input type="radio" :value="option" @change="setAnswer" />
              {{ option }}
            </label>
          </li>
        </ul>
      </div>

    </section>
    <router-view></router-view>
  </main>
  <footer>
    <p>
      Un quiz pour toute la famille fait avec <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> and
      <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </p>
  </footer>
  <div class="container">
    <quiz />
  </div>
</template>



<style>
@import './assets/main.css';
</style>
