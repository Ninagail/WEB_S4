<template>
    <div>
        <label for="difficulty">Choisissez le niveau de difficulté :</label>
        <select id="difficulty" :value="selectedDifficulty" @change="handleChange">
            <option value="facile">Facile</option>
            <option value="normal">Normal</option>
            <option value="difficile">Difficile</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        selectedDifficulty: String,
        fetchQuizQuestions: Function
    },
    methods: {
        handleChange(event) {
            this.$emit('update:selectedDifficulty', event.target.value);
        }
    }
};
</script>