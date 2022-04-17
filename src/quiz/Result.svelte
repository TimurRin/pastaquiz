<script>
    import { result, updateDashboard } from "./quiz";
</script>

{#each $result.questions as questionId, index}
    <p>
        {index + 1}. {$result.quiz.questions[questionId][$result.reversed ? "second" : "first"]} &mdash;
        <span class={$result.answers[index].isCorrect ? "correct" : "incorrect"}
            >{$result.answers[index].answer}</span
        >{$result.answers[index].isCorrect ? "" : (" " + $result.answers[index].correctAnswer)}
    </p>
{/each}

<button style="width:100%" on:click={() => updateDashboard()}
    >Back to Dashboard</button
>

<style>
    span.correct {
        color: green;
    }

    span.incorrect {
        color: firebrick;
        text-decoration: line-through;
    }
</style>
