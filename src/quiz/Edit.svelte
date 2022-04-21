<script>
    import DashboardButton from "./DashboardButton.svelte";
    import { edit, updateDashboard } from "./quiz";
    import { updateQuiz, removeQuiz } from "./pool";
    import { uuidv4 } from "../utils";

    let originalData = $edit.data || {};

    let quiz = {
        uid: originalData.uid || uuidv4(),
        name: originalData.name,
        description: originalData.description,
        author: originalData.author,
        authorLink: originalData.authorLink,
        questions: [],
    };

    if (originalData.questions != null) {
        originalData.questions.forEach((question) => {
            quiz.questions.push({
                first: question.first,
                second: question.second,
                group: question.group,
            });
        });
    }

    function save() {
        updateQuiz(
            {
                uid: quiz.uid,
                name: quiz.name,
                description: quiz.description,
                author: quiz.author,
                authorLink: quiz.authorLink,
                date: new Date().toISOString(),
                questions: quiz.questions,
            },
            $edit.id
        );
        updateDashboard();
    }

    function remove() {
        removeQuiz($edit.id);
        updateDashboard();
    }
</script>

<DashboardButton />

<h1>{$edit.data != null ? "Edit Quiz" : "New Quiz"}</h1>
<div>
    <div>
        <!-- <label for="quiz-uid">UID</label>
        <input id="quiz-uid" type="text" bind:value={quiz.uid} /> -->
    </div>
    <div>
        <label for="quiz-name">name</label>
        <input id="quiz-name" type="text" bind:value={quiz.name} />
    </div>
    <div>
        <label for="quiz-description">description</label>
        <input
            id="quiz-description"
            type="text"
            bind:value={quiz.description}
        />
    </div>
    <div>
        <label for="quiz-author">author</label>
        <input id="quiz-author" type="text" bind:value={quiz.author} />
    </div>
    <div>
        <label for="quiz-authorLink">authorLink</label>
        <input id="quiz-authorLink" type="url" bind:value={quiz.authorLink} />
    </div>
</div>
<hr />
<div class="questions">
    {#each quiz.questions as question, index}
        <div>
            <h2>Question {index + 1}</h2>
            <div>
                <label for={"quiz-question-" + index + "-first"}>First</label>
                <input
                    id={"quiz-question-" + index + "-first"}
                    type="text"
                    bind:value={question.first}
                />
            </div>
            <div>
                <label for={"quiz-question-" + index + "-second"}>Second</label>
                <input
                    id={"quiz-question-" + index + "-second"}
                    type="text"
                    bind:value={question.second}
                />
            </div>
            <div>
                <label for={"quiz-question-" + index + "-group"}>Group</label>
                <input
                    id={"quiz-question-" + index + "-group"}
                    type="text"
                    bind:value={question.group}
                />
            </div>
            <div>
                <button
                    on:click={() => {
                        quiz.questions.splice(index, 1);
                        quiz = quiz;
                    }}>Remove question</button
                >
            </div>
        </div>
    {/each}
    <div>
        <h2>Question {quiz.questions.length + 1}</h2>
        <button
            on:click={() => {
                quiz.questions.push({});
                quiz = quiz;
            }}>Add question</button
        >
    </div>
</div>
<hr />
<div>
    <button on:click={save}>Save</button>
    {#if $edit.id != null}
        <button on:click={remove}>Delete quiz</button>
    {/if}
</div>
<hr />
<DashboardButton />

<style>
    .questions {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .questions div {
        margin: 1vh;
    }
</style>
