// import { writable } from "svelte/store";
// import { uuidv4 } from "../utils";

export let pool = JSON.parse(localStorage.getItem("pool")) || [];

// localStorage.setItem("pool", JSON.stringify(pool));

// pool.subscribe(value => {
//     localStorage.setItem("pool", value);
// });

