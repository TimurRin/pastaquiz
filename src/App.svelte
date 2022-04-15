<script>
	import Process from "./quiz/Process.svelte";
	import Result from "./quiz/Result.svelte";
	import { page } from "./quiz/quiz";
</script>

<div class="content">
	{#if $page === "result"}
		<Result />
	{:else}
		<Process />
	{/if}
</div>
