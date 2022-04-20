<script>
    import { updatePool } from "./pool";
    import { updateDashboard, updateEdit, restart, dashboard } from "./quiz";

    let selectedQuiz;

    async function loadSamplePool() {
        const response = await fetch("sampleQuizzes.json");
        updatePool(await response.json());
        localStorage.setItem("samples", new Date().toISOString());
        updateDashboard();
    }

    if (localStorage.getItem("samples") == null) {
        loadSamplePool();
    } else {
        updateDashboard();
    }
</script>

<div class="box">
    <div class="start">
        {#if selectedQuiz != null}
            <h1>
                {selectedQuiz.data.name ||
                    "Quiz " + (selectedQuiz.data.uid || "(Unnamed)")}
            </h1>
            {#if selectedQuiz.data.description != null}
                <p><i>{selectedQuiz.data.description}</i></p>
            {/if}
            <p>
                by <b>{selectedQuiz.data.author || "anonymous"}</b> &mdash; {selectedQuiz
                    .data.date != null
                    ? new Date(selectedQuiz.data.date).toLocaleString()
                    : "Unknown date"} &mdash; {selectedQuiz.data.uid}
            </p>
            <button
                style="width:100%"
                on:click={() => updateEdit(selectedQuiz.id)}>Edit</button
            >
            <button
                style="width:100%"
                on:click={() =>
                    restart({
                        poolId: selectedQuiz.id,
                        questions: 15,
                        optionsPerQuestion: 4,
                    })}>Start</button
            >
        {:else}
            <h1>{"Welcome to Pastaquiz!"}</h1>
            <p><i>Create new or select saved quiz to start</i></p>
        {/if}
    </div>

    <div class="table">
        <h1>Saved quizzes</h1>
        {#if $dashboard.pool && $dashboard.pool.length > 0}
            <table>
                <tr>
                    <th>Name</th>
                    <th>Questions</th>
                    <th>Author</th>
                    <th>Date</th>
                    <!-- <th /> -->
                </tr>
                {#each $dashboard.pool as poolItem, poolId}
                    <tr
                        on:click={() =>
                            (selectedQuiz = { id: poolId, data: $dashboard.pool[poolId] })}
                    >
                        <td>{poolItem.name}</td>
                        <td>{poolItem.questions.length}</td>
                        <td>{poolItem.author}</td>
                        <td>{new Date(poolItem.date).toLocaleString()}</td>
                    </tr>
                {/each}
            </table>
        {/if}
        <button style="width:100%; margin-top:2vh" on:click={() => updateEdit()}
            >Create new</button
        >
    </div>
</div>

<style>
    .box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .box div {
        padding: 2vh;
    }

    table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 0.5vh;
    }

    td {
        cursor: pointer;
    }
</style>
