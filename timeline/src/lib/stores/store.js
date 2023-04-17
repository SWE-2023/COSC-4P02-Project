import { quintOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import { writable } from "svelte/store";

// local storage stores

// current motion preference
export const reduceMotion =
	typeof localStorage !== "undefined" && localStorage.reduceMotion === "true";
export const reduceMotionStore = writable(reduceMotion);
reduceMotionStore.subscribe(
	(value) =>
		typeof localStorage !== "undefined" && (localStorage.reduceMotion = value)
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
	typeof localStorage !== "undefined" &&
	parseFloat(localStorage.currentSize || 1.2);
export const currentSizeStore = writable(currentSize);
currentSizeStore.subscribe(
	(value) =>
		typeof localStorage !== "undefined" && (localStorage.currentSize = value)
);

// current theme
export const theme = typeof localStorage !== "undefined" && localStorage.theme;
export const themeStore = writable(theme || "light-theme");
themeStore.subscribe(
	(value) => typeof localStorage !== "undefined" && (localStorage.theme = value)
);

// current timeline index
const initialIndex =
	typeof localStorage !== "undefined"
		? parseInt(localStorage.currentItemIndex || "0")
		: 0;
export const currentItemIndexStore = writable(initialIndex);

currentItemIndexStore.subscribe((value) => {
	if (typeof localStorage !== "undefined") {
		localStorage.currentItemIndex = value;
	}
});

// temp stores

export const firstYear = writable(0);
export const lastYear = writable(0);
export const atStart = writable(true);
export const atEnd = writable(false);

// year tweened
export const year = tweened(0, {
	duration: 500,
	easing: quintOut,
	interpolate: (a, b) => (t) => a + (b - a) * t,
});

// transition direction
export const direction = writable("down");

// modal store
export const showModal = writable(false);