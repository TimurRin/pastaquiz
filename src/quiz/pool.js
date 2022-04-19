// import { writable } from "svelte/store";

export let pool = JSON.parse(localStorage.getItem("pool")) || [];

export function updateQuiz(quizData, quizId) {
    if (quizId != null) {
        pool[quizId] = quizData;
    } else {
        pool.push(quizData);
    }
    
    localStorage.setItem("pool", JSON.stringify(pool));
}

export function updatePool(value) {
    pool = value;
    localStorage.setItem("pool", JSON.stringify(pool));
}

