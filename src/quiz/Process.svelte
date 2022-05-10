<script>
    import DashboardButton from "./DashboardButton.svelte";
    import { process, addAnswer } from "./quiz";

    let answer = null;
</script>

<DashboardButton />

<div class="header">
    <h1>{$process.quizName}</h1>
    <h2>{$process.question.number} / {$process.questions}</h2>
    <h3>{$process.question.text}</h3>
</div>
<form class="quiz">
    {#each $process.question.options.options as value, index}
        <div class="option-wrapper">
            <input
                id={"option-" + $process.question.number + "-" + index}
                type="radio"
                name="question"
                {value}
                bind:group={answer}
            />
            <label for={"option-" + $process.question.number + "-" + index}
                >{value}</label
            >
        </div>
    {/each}
</form>
<button
    class="footer"
    on:click={() => {
        addAnswer(answer);
        answer = null;
    }}
    disabled={answer == null}
>
    Next question
</button>
