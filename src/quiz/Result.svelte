<script>
    import { result } from "./quiz";
</script>

{#each $result.questions as questionId, index}
    <p>
        {index + 1}. {$result.quiz.pairs[questionId][$result.reversed ? "second" : "first"]} &mdash;
        <span class={$result.answers[index].isCorrect ? "correct" : "incorrect"}
            >{$result.answers[index].answer}</span
        >{$result.answers[index].isCorrect ? "" : (" " + $result.answers[index].correctAnswer)}
    </p>
{/each}

<style>
    span.correct {
        color: green;
    }

    span.incorrect {
        color: firebrick;
        text-decoration: line-through;
    }
</style>
