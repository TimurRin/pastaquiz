import { writable } from "svelte/store";
import { pool } from "./pool";

let quiz = {};
let maxQuestions;
let optionsPerQuestion;
let currentQuestionId = -1;
let questions = [];
let currentOptions = [];
let answers = [];
let correctAnswer;
let reversed = true;
let results = false;

export const page = writable("process");
export const process = writable({});
export const result = writable({});

function updateProcess() {
    page.set("process");
    process.set({
        quizName: quiz.name,
        question: {
            text: quiz.pairs[questions[currentQuestionId]][reversed ? "second" : "first"],
            number: currentQuestionId + 1,
            options: currentOptions
        },
        questions: maxQuestions,
    });
}

function updateResult() {
    page.set("result");
    result.set({
        quiz: quiz,
        reversed: reversed,
        questions: questions,
        answers: answers
    });
}

function restart(params) {
    quiz = pool[params.poolId];
    maxQuestions = Math.min(params.questions, quiz.pairs.length);
    optionsPerQuestion = Math.min(params.optionsPerQuestion, quiz.pairs.length);
    currentQuestionId = -1;
    answers = [];
    questions = [];
    results = false;

    while (questions.length < maxQuestions) {
        let questionId = Math.floor(Math.random() * quiz.pairs.length);
        if (!questions.includes(questionId)) {
            questions.push(questionId);
        }
    }

    nextQuestion();
}

export function addAnswer(currentAnswer) {
    if (currentAnswer != null) {
        answers.push({
            answer: currentAnswer,
            correctAnswer: currentOptions[correctAnswer],
            isCorrect: currentAnswer === currentOptions[correctAnswer],
        });
        if (nextQuestion()) {
            updateResult();
        }
    }
}

function nextQuestion() {
    currentQuestionId++;
    if (currentQuestionId < questions.length) {
        currentOptions = [];
        correctAnswer = Math.floor(Math.random() * optionsPerQuestion);
        currentOptions[correctAnswer] =
            quiz.pairs[questions[currentQuestionId]][reversed ? "first" : "second"];

        for (let i = 0; i < optionsPerQuestion; i++) {
            if (i !== correctAnswer) {
                while (true) {
                    let variant =
                        quiz.pairs[
                        Math.floor(Math.random() * quiz.pairs.length)
                        ][reversed ? "first" : "second"];
                    if (!currentOptions.includes(variant)) {
                        currentOptions[i] = variant;
                        break;
                    }
                }
            }
        }
        updateProcess();
    } else {
        return true;
    }
}

restart({
    poolId: Math.floor(Math.random() * pool.length),
    questions: 15,
    optionsPerQuestion: 4,
});
