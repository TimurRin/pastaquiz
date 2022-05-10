import { writable } from "svelte/store";
import { pool } from "./pool";

let quiz;

let maxQuestions;
let optionsPerQuestion;
let showAllQuestions;

let currentQuestionId = -1;
let questions = [];
let questionsWhole = [];
let currentOptions = [];
let answers = [];
let reversed = false;
let results = false;

export const dataVersion = 2;
export const page = writable("dashboard");
export const dashboard = writable({});
export const preview = writable({});
export const edit = writable({});
export const process = writable({});
export const processWhole = writable({});
export const result = writable({});

export function updateDashboard() {
    page.set("dashboard");
    dashboard.set({
        quiz: quiz,
        pool: pool
    });
}

export function updatePreview(poolId) {
    page.set("preview");
    preview.set({
        id: poolId,
        data: poolId != null ? pool[poolId] : null
    });
}

export function updateEdit(poolId) {
    page.set("edit");
    edit.set({
        id: poolId,
        data: poolId != null ? pool[poolId] : null
    });
}

export function updateProcess() {
    if (currentQuestionId < questions.length) {
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
    } else {
        updateResult();
    }
}

export function updateProcessWhole() {
    page.set("processWhole");

    if (questionsWhole.length === 0) {
        questions.forEach((questionId, index) => {
            questionsWhole.push({
                text: quiz.questions[questionId][reversed ? "second" : "first"],
                number: index + 1,
                options: generateQuestionOptions(questionId)
            });
        });
    }

    processWhole.set({
        quizName: quiz.name,
        questions: questionsWhole,
    });
}

export function updateResult() {
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
    showAllQuestions = params.showAllQuestions;
    currentQuestionId = -1;
    answers = [];
    questions = [];
    questionsWhole = [];
    results = false;

    while (questions.length < maxQuestions) {
        let questionId = Math.floor(Math.random() * quiz.questions.length);
        if (!questions.includes(questionId)) {
            questions.push(questionId);
        }
    }

    showProcess();
}

export function showProcess() {
    (showAllQuestions ? updateProcessWhole : nextQuestion)();
}

export function addAnswer(answer, options) {
    if (answer != null) {
        if (options != null) {
            answers.push({
                answer: answer,
                correctAnswer: options.options[options.answer],
                isCorrect: answer === options.options[options.answer],
            });
        } else {
            answers.push({
                answer: answer,
                correctAnswer: currentOptions.options[currentOptions.answer],
                isCorrect: answer === currentOptions.options[currentOptions.answer],
            });
            if (next && nextQuestion()) {
                updateResult();
            }
        }

    }
}

function generateQuestionOptions(questionId) {
    let options = [];
    let answer = Math.floor(Math.random() * optionsPerQuestion);
    options[answer] =
        quiz.questions[questionId][reversed ? "first" : "second"];

    for (let i = 0; i < optionsPerQuestion; i++) {
        if (i !== answer) {
            while (true) {
                let variant =
                    quiz.questions[
                    Math.floor(Math.random() * quiz.questions.length)
                    ][reversed ? "first" : "second"];
                if (!options.includes(variant)) {
                    options[i] = variant;
                    break;
                }
            }
        }
    }
    return { options: options, answer: answer };
}

function nextQuestion() {
    currentQuestionId++;
    if (currentQuestionId < questions.length) {
        currentOptions = generateQuestionOptions(questions[currentQuestionId]);
        updateProcess();
    } else {
        return true;
    }
}
