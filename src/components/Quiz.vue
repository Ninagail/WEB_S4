<template>
  <main class="app">
    <h1>
      Quizzzzzzz
    </h1>
    <nav>
      <router-link to="/tv-cinema">TV et Cinéma</router-link>

    </nav>

    <section class="quiz">
      <div class="quiz-info">
        <span class="question">
          {{ getCurrentQuestion.question }}
        </span>
        <span class="score"> Score : {{ score }} / {{ questions.length }}
        </span>

      </div>

      <div class="options">
        <li v-for="(option, index) in getCurrentQuestion.options" :key="index">
          <label>
            <input type="radio" />
            <span> {{ option }}</span>
          </label>
        </li>

      </div>

      <button v-for="answer in currentQuestion.answers" :index="currentQuestion.key" :key="answer" v-html="answer"
        @click.prevent="handleClick">
      </button>
    </section>
    <router-view></router-view>
  </main>
  <footer>
    <p>
      Un quiz pour toute la famille fait avec <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> and
      <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3 </a> par Nina Gaillard.
    </p>
  </footer>
  <div class="container">
  </div>
</template>


<script setup>
import { ref, computed, defineComponent } from 'vue';
import Cinema from './Cinema.vue'; // Importez le composant Cinema.vue

const questions = ref([]);
const loading = ref(true);

defineComponent({
  name: 'Quiz',
  components: {
    Cinema // Inclure le composant Cinema.vue dans le composant Quiz.vue
  },
  setup() {
    return { questions, loading }; // Exporter les données pour pouvoir les utiliser dans le template
  }
});

</script>


