<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: width }"></div>
    </div>
</template>

<script>
export default {
    props: {
        current: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    computed: {
        width() {
            return (this.current / this.total) * 100 + "%";
        }
    }
};
</script>

<style>
.progress-bar {
    width: 50%;
    background-color: #ddd;
    margin: 20px auto;
}

.progress {
    width: 50%;
    height: 20px;
    background-color: #4caf50;
}
</style>