// import { writable } from "svelte/store";
// import { uuidv4 } from "../utils";

console.log(localStorage.getItem("pool"))

export let pool = JSON.parse(localStorage.getItem("pool")) || [];

console.log(pool)

export function updatePool(value) {
    console.log("updatePool")
    pool = value;
    localStorage.setItem("pool", JSON.stringify(pool));
}

// localStorage.setItem("pool", JSON.stringify(pool));

// pool.subscribe(value => {
//     localStorage.setItem("pool", value);
// });

