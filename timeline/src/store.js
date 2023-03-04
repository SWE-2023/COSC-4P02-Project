import { writable } from 'svelte/store';

export const reduceMotionStore = writable(false);
export let count = writable(0);

// make count store locally
export const countStore = {
	subscribe: count.subscribe,
	set: count.set,
	update: count.update,
};
