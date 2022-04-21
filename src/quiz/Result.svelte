<script>
    import DashboardButton from "./DashboardButton.svelte";
    import { result } from "./quiz";
</script>

<h1>{$result.quiz.name}</h1>

{#each $result.questions as questionId, index}
    <p>
        {index + 1}. {$result.quiz.questions[questionId][
            $result.reversed ? "second" : "first"
        ]} &mdash;
        <span class={$result.answers[index].isCorrect ? "correct" : "incorrect"}
            >{$result.answers[index].answer}</span
        >{$result.answers[index].isCorrect
            ? ""
            : " " + $result.answers[index].correctAnswer}
    </p>
{/each}

<DashboardButton />

<style>
    span.correct {
        color: green;
    }

    span.incorrect {
        color: firebrick;
        text-decoration: line-through;
    }
</style>
