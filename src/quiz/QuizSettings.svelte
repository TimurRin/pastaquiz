<script>
    import { restart } from "./quiz";

    export let quizId;
    export let quiz;

    let questions = Math.min(15, quiz.questions.length);
    let optionsPerQuestion = Math.min(4, quiz.questions.length);
    let showAllQuestions = false;
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
        <div>
            <label for="quiz-settings-showAllQuestions"
                >Show all questions</label
            >
            <input
                id="quiz-settings-showAllQuestions"
                type="checkbox"
                bind:value={showAllQuestions}
            />
        </div>
    {/if}
</div>

<div>
    <button
        style="width:100%"
        on:click={() =>
            restart({
                poolId: quizId,
                questions: questions,
                optionsPerQuestion: optionsPerQuestion,
                showAllQuestions: showAllQuestions,
            })}>Start</button
    >
</div>
