<script>
	import Dashboard from "./quiz/Dashboard.svelte";
	import Preview from "./quiz/Preview.svelte";
	import Edit from "./quiz/Edit.svelte";
	import Process from "./quiz/Process.svelte";
	import ProcessWhole from "./quiz/ProcessWhole.svelte";
	import Result from "./quiz/Result.svelte";
	import { page } from "./quiz/quiz";
</script>

<div class="content">
	{#if $page === "result"}
		<Result />
	{:else if $page === "process"}
		<Process />
	{:else if $page === "processWhole"}
		<ProcessWhole />
	{:else if $page === "edit"}
		<Edit />
	{:else if $page === "preview"}
		<Preview />
	{:else}
		<Dashboard />
	{/if}
</div>
