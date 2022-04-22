<script>
    import { onMount } from 'svelte';
    import { restart } from "./quiz";

    export let quizId;
    export let quiz;

    let questions = Math.min(15, quiz.questions.length);
        let optionsPerQuestion = Math.min(4, quiz.questions.length);
</script>

<div>
    {#if quiz.questions != null && quiz.questions.length > 1}
        <div>
            <label for="quiz-settings-questions"
                >Questions ({"max. " + quiz.questions.length})</label
            >
            <input
                id="quiz-settings-questions"
                type="number"
                min="1"
                max={quiz.questions.length}
                bind:value={questions}
            />
        </div>
        <div>
            <label for="quiz-settings-optionsPerQuestion"
                >Options per question ({"max. " + quiz.questions.length})</label
            >
            <input
                id="quiz-settings-optionsPerQuestion"
                type="number"
                min="1"
                max={quiz.questions.length}
                bind:value={optionsPerQuestion}
            />
        </div>
    {/if}
</div>

<button
    style="width:100%"
    on:click={() =>
        restart({
            poolId: quizId,
            questions: questions,
            optionsPerQuestion: optionsPerQuestion,
        })}>Start</button
>
