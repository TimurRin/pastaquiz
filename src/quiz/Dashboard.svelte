<script>
    import { pool } from "./pool";
    import { updateEdit, restart } from "./quiz";

    let selectedQuiz;
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
        <h1>Saved quizes</h1>
        {#if selectedQuiz != null}
            <table>
                <tr>
                    <th>Name</th>
                    <th>Questions</th>
                    <th>Author</th>
                    <th>Date</th>
                    <!-- <th /> -->
                </tr>
                {#each pool as poolItem, poolId}
                    <tr
                        on:click={() =>
                            (selectedQuiz = { id: poolId, data: pool[poolId] })}
                    >
                        <td>{poolItem.name}</td>
                        <td>{poolItem.questions.length}</td>
                        <td>{poolItem.author}</td>
                        <td>{new Date(poolItem.date).toLocaleString()}</td>
                        <!-- <td
                            ><button on:click={() => updateEdit(poolId)}
                                >Edit</button
                            ></td
                        > -->
                    </tr>
                {/each}
            </table>
        {/if}
        <button
            disabled
            style="width:100%; margin-top:2vh"
            on:click={() => updateEdit()}>Create new</button
        >
    </div>
</div>

<style>
    .box {
        display: flex;
        flex-direction: column;
    }

    .box div {
        margin: 1vh;
    }

    table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 0.5vh;
    }
</style>
