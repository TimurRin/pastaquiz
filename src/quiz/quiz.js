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
let reversed = false;
let results = false;

export const page = writable("dashboard");
export const process = writable({});
export const result = writable({});

export function updateDashboard() {
    page.set("dashboard");
}

export function updateEdit(poolId) {
    page.set("edit");
}

function updateProcess() {
    page.set("process");
    process.set({
        quizName: quiz.name,
        question: {
            text: quiz.questions[questions[currentQuestionId]][reversed ? "second" : "first"],
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

export function restart(params) {
    quiz = pool[params.poolId];
    maxQuestions = Math.min(params.questions, quiz.questions.length);
    optionsPerQuestion = Math.min(params.optionsPerQuestion, quiz.questions.length);
    currentQuestionId = -1;
    answers = [];
    questions = [];
    results = false;

    while (questions.length < maxQuestions) {
        let questionId = Math.floor(Math.random() * quiz.questions.length);
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
            quiz.questions[questions[currentQuestionId]][reversed ? "first" : "second"];

        for (let i = 0; i < optionsPerQuestion; i++) {
            if (i !== correctAnswer) {
                while (true) {
                    let variant =
                        quiz.questions[
                        Math.floor(Math.random() * quiz.questions.length)
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
