import { writable } from "svelte/store";

// current motion preference
export const reduceMotion =
    typeof localStorage !== "undefined" && (localStorage.reduceMotion === "true");
export const reduceMotionStore = writable(reduceMotion);
reduceMotionStore.subscribe(
    (value) =>
        typeof localStorage !== "undefined" &&
        (localStorage.reduceMotion = value)
);

// current click count
export const count =
	typeof localStorage !== "undefined" && parseInt(localStorage.count || 0);
export const countStore = writable(count);
countStore.subscribe(
	(value) => typeof localStorage !== "undefined" && (localStorage.count = value)
);

// current font size
export const currentSize =
	typeof localStorage !== "undefined" && parseFloat(localStorage.currentSize || 1.2);
export const currentSizeStore = writable(currentSize);
currentSizeStore.subscribe(
	(value) =>
		typeof localStorage !== "undefined" && (localStorage.currentSize = value)
);

// current theme
export const currentTheme =
	typeof localStorage !== "undefined" && localStorage.currentTheme;
export const currentThemeStore = writable(currentTheme);
currentThemeStore.subscribe(
	(value) =>
		typeof localStorage !== "undefined" && (localStorage.currentTheme = value)
);


