<script>
	import Dashboard from "./quiz/Dashboard.svelte";
	import Edit from "./quiz/Edit.svelte";
	import Process from "./quiz/Process.svelte";
	import Result from "./quiz/Result.svelte";
	import { page } from "./quiz/quiz";
</script>

<div class="content">
	{#if $page === "result"}
		<Result />
	{:else if $page === "process"}
		<Process />
	{:else if $page === "edit"}
		<Edit />
	{:else}
		<Dashboard />
	{/if}
</div>
