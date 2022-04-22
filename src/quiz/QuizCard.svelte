<script>
    export let quiz;
</script>

{#if quiz != null}
    <h2>
        {quiz.name || "Quiz " + (quiz.uid || "(Unnamed)")}
    </h2>
    {#if quiz.description != null}
        <p><i>{quiz.description}</i></p>
    {/if}
    <p>
        by <a href={quiz.authorLink || ("https://www.google.com/search?q=" + (quiz.author || "anonymous"))}><b>{quiz.author || "anonymous"}</b></a> &mdash; {quiz.date != null
            ? new Date(quiz.date).toLocaleString()
            : "Unknown date"} &mdash; {quiz.uid}
    </p>
{/if}
