<script>
    import DashboardButton from "./DashboardButton.svelte";
    import { processWhole, addAnswer, updateResult } from "./quiz";

    let answers = [];
</script>

<DashboardButton />

<div class="header">
    <h1>{$processWhole.quizName}</h1>
</div>
<form class="quiz">
    {#each $processWhole.questions as question, questionIndex}
        <div class="question-wrapper">
            <h3>{question.number}. {question.text}</h3>
            {#each question.options.options as value, optionIndex}
                <div class="option-wrapper">
                    <input
                        id={"option-" + question.number + "-" + optionIndex}
                        type="radio"
                        name={"question-" + question.number}
                        {value}
                        bind:group={answers[questionIndex]}
                    />
                    <label for={"option-" + question.number + "-" + optionIndex}
                        >{value}</label
                    >
                </div>
            {/each}
        </div>
    {/each}
</form>
<button
    class="footer"
    on:click={() => {
        $processWhole.questions.forEach((question, index) => {
            addAnswer(answers[index], question.options);
        });
        updateResult();
    }}
>
    Submit
</button>
