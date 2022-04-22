<script>
    import DashboardButton from "./DashboardButton.svelte";
    import { preview } from "./quiz";

    let questions;
    let shuffled;

    function order() {
        shuffled = false;
        questions = [];

        for (let i = 0; i < $preview.data.questions.length; i++) {
            questions.push(i);
        }
    }

    function shuffle() {
        shuffled = true;
        questions = [];

        while (questions.length < $preview.data.questions.length) {
            let questionId = Math.floor(
                Math.random() * $preview.data.questions.length
            );
            if (!questions.includes(questionId)) {
                questions.push(questionId);
            }
        }
    }

    order();
</script>

<DashboardButton />

<button style="width:100%" on:click={() => (shuffled ? order : shuffle)()}
    >{shuffled ? "Order" : "Shuffle"}</button
>

<h1>{$preview.data.name}</h1>

<table>
    <tr>
        <th>#</th>
        <th>{$preview.data.labels && $preview.data.labels.first || "First"}</th>
        <th>{$preview.data.labels && $preview.data.labels.second || "Second"}</th>
    </tr>
    {#each questions as questionId, index}
        <tr>
            <td>{index + 1}</td>
            <td>{$preview.data.questions[questionId].first}</td>
            <td>{$preview.data.questions[questionId].second}</td>
        </tr>
    {/each}
</table>

<DashboardButton />

<style>
    table {
        width: 100%;
    }
</style>