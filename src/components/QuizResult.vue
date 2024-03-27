<template>
    <div>
        <div class="center">
            <div class="center">
                <ConfettiExplosion :shouldDestroyAfterDone="true" :stageHeight="300" :stageWidth="1000"
                    :particleCount="800" :colors="['#4CAF50', '#d05797', '#dc0a7a', '#28862d']" />
            </div>
        </div>

        <p>Résultat du quiz:</p>
        <p>Score: {{ calculateScore() }}</p>
        <p class="message" :class="{ 'blink': showBlink }">{{ scoreMessage }}</p>

        <button class="nextButton" @click="resetQuiz">Recommencer</button>
    </div>
</template>

<script>
import ConfettiExplosion from "vue-confetti-explosion";
export default {
    props: {
        calculateScore: Function,
        scoreMessage: String,
        showBlink: Boolean,
        resetQuiz: Function
    },
    components: {
        ConfettiExplosion
    }
};
</script>
<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
