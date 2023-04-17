import { writable } from "svelte/store";
// window width
export const windowWidth = writable(1920);

// window height
export const windowHeight = writable(1080);

// scrollY position
export const scrollY = writable(0);

// scrollX position
export const scrollX = writable(0);

export const mobile = writable(false);

