<script>
	const QUESTIONS = [
		["Cічень", "Январь"],
		["Лютий", "Февраль"],
		["Березень", "Март"],
		["Квітень", "Апрель"],
		["Травень", "Май"],
		["Червень", "Июнь"],
		["Липень", "Июль"],
		["Серпень", "Август"],
		["Вересень", "Сентябрь"],
		["Жовтень", "Октябрь"],
		["Листопад", "Ноябрь"],
		["Грудень", "Декабрь"],
	];

	const OPTIONS_PER_QUESTION = Math.min(4, QUESTIONS.length);

	let questions = [];
	let currentQuestionId = -1;
	let currentOptions = [];
	let answers = [];
	let correctAnswer;
	let currentAnswer = null;

	let reversed = true;

	let results = false;

	function reset() {
		currentQuestionId = -1;
		answers = [];
		questions = [];
		results = false;

		while (questions.length < QUESTIONS.length) {
			let questionId = Math.floor(Math.random() * QUESTIONS.length);
			if (!questions.includes(questionId)) {
				questions.push(questionId);
			}
		}

		nextQuestion();
	}

	function addAnswer() {
		if (currentAnswer != null) {
			answers.push({
				answer: currentAnswer,
				correctAnswer: currentOptions[correctAnswer],
				isCorrect: currentAnswer === currentOptions[correctAnswer],
			});
			if (nextQuestion()) {
				results = true;
			}
		}
	}

	function nextQuestion() {
		currentQuestionId++;
		correctAnswer = Math.floor(Math.random() * OPTIONS_PER_QUESTION);
		currentOptions = [];
		currentAnswer = null;

		if (currentQuestionId < questions.length) {
			currentOptions[correctAnswer] =
				QUESTIONS[questions[currentQuestionId]][reversed ? 0 : 1];

			for (let i = 0; i < OPTIONS_PER_QUESTION; i++) {
				if (i !== correctAnswer) {
					while (true) {
						let variant =
							QUESTIONS[
								Math.floor(Math.random() * QUESTIONS.length)
							][reversed ? 0 : 1];
						if (!currentOptions.includes(variant)) {
							currentOptions[i] = variant;
							break;
						}
					}
				}
			}
		} else {
			return true;
		}
	}

	reset();
</script>

<div class="content">
	{#if results}
		<!-- <div class="header"><h1>РЕЗУЛЬТАТЫ</h1></div> -->
		<div class="results">
			{#each questions as questionId, index}
				<p>
					{index + 1}. {QUESTIONS[questionId][reversed ? 1 : 0]} &mdash;
					<span
						class={answers[index].isCorrect
							? "correct"
							: "incorrect"}>{answers[index].answer}</span
					>, {answers[index].isCorrect
						? "правильно!"
						: "правильный ответ: " + answers[index].correctAnswer}
				</p>
			{/each}
		</div>
	{:else}
		<div class="header">
			<h1>{currentQuestionId + 1} из {questions.length}</h1>
			<h2>
				"{QUESTIONS[questions[currentQuestionId]][reversed ? 1 : 0]}"
				&mdash; это...
			</h2>
		</div>
		<form class="quiz">
			{#each currentOptions as value, index}
				<div class="form_radio_btn">
					<input
						id={"option-" + currentQuestionId + "_" + index}
						type="radio"
						name="question"
						{value}
						bind:group={currentAnswer}
					/>
					<label for={"option-" + currentQuestionId + "_" + index}
						>{value}</label
					>
				</div>
			{/each}
		</form>
		<div class="footer" on:click={addAnswer}>
			<h1>ДАЛЕЕ</h1>
		</div>
	{/if}
</div>
