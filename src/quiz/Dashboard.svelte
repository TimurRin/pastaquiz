<script>
    import QuizCard from "./QuizCard.svelte";
    import QuizSettings from "./QuizSettings.svelte";
    import { updatePool } from "./pool";
    import {
        updateDashboard,
        updatePreview,
        updateEdit,
        showProcess,
        dashboard,
    } from "./quiz";

    let selectedQuiz;

    function selectQuiz(quizId, quizData) {
        selectedQuiz = {
            id: quizId,
            data: quizData,
        };
    }

    async function loadSamplePool() {
        const response = await fetch("sampleQuizzes.json");
        updatePool(await response.json());
        localStorage.setItem("samples", new Date().toISOString());
        updateDashboard();
    }

    // if (localStorage.getItem("samples") == null) {
    //     loadSamplePool();
    // } else {
        updateDashboard();
    // }
</script>

<div class="box">
    <div class="left">
        <div class="quiz-selected">
            {#if selectedQuiz != null}
                <h1>Selected quiz</h1>
                <QuizCard quiz={selectedQuiz.data} />
                <QuizSettings
                    quizId={selectedQuiz.id}
                    quiz={selectedQuiz.data}
                />
                <button
                    style="width:100%"
                    on:click={() => updatePreview(selectedQuiz.id)}
                    >Preview</button
                >
                <button
                    style="width:100%"
                    on:click={() => updateEdit(selectedQuiz.id)}>Edit</button
                >
            {:else}
                <h1>{"Welcome to PastaQuiz!"}</h1>
                <p>
                    <i>A simple tool to create quizzes, tests and exersizes</i>
                </p>
                <p>
                    All the data is stored in your browser and is not synced at
                    the moment
                </p>
                <p>
                    <b
                        >The app is in the development stage, proper design and
                        advanced settings are on the way!</b
                    >
                </p>
                <p>
                    <b
                        >DO NOT use it as a proper tool since you may lose some
                        data e.g. when refreshing the page</b
                    >
                </p>
            {/if}
        </div>
        {#if $dashboard.quiz != null}
            <div class="quiz-current">
                <h1>Active quiz</h1>
                <QuizCard quiz={$dashboard.quiz} />
                <button style="width:100%" on:click={() => showProcess()}
                    >Continue</button
                >
            </div>
        {/if}
    </div>

    <div class="left">
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
                                selectQuiz(poolId, $dashboard.pool[poolId])}
                        >
                            <td>{poolItem.name}</td>
                            <td>{poolItem.questions.length}</td>
                            <td>{poolItem.author}</td>
                            <td>{new Date(poolItem.date).toLocaleString()}</td>
                        </tr>
                    {/each}
                </table>
            {:else}
                <button style="width:100%" on:click={() => loadSamplePool()}
                    >Load examples</button
                >
            {/if}
            <button
                style="width:100%; margin-top:2vh"
                on:click={() => updateEdit()}>Create new</button
            >
        </div>
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

    td {
        cursor: pointer;
    }
</style>
