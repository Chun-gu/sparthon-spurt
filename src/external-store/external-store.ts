/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSyncExternalStore } from "react";

function useSyncLocalStorage() {}

interface ILocalStorage<T> {
	setItem(key: string, value: T): void;
	getItem(key: string): T | null;
	removeItem(key: string): void;
	clear(): void;
}

class LocalStorage<T> implements ILocalStorage<T> {
	key: string = "";
	value?: T;
	length: number = 0;

	snapshot = {};
	listeners = new Set<() => void>();

	constructor(key: string, initialValue?: T) {
		this.value = initialValue;
	}

	subscribe(listener: () => void) {
		this.listeners.add(listener);

		return () => this.listeners.delete(listener);
	}

	publish() {
		this.listeners.forEach((listener) => listener());
	}

	setItem(key: string, value: T): void {}

	// key(index: number): string | null {}

	getItem(key: string): T | null {
		return this.value === undefined ? null : this.value;
	}

	removeItem(key: string): void {}

	clear(): void {}
}

// call signature
function useLocalStorage<T>(initialItem?: T): {
	item: T | undefined;
	setItem: (key: string, value: T) => void;
};
function useLocalStorage(): any {}

// function useLocalStorage() {}
// function useLocalStorage implements useLocalStorage
// const { item, setItem } = useLocalStorage<string>();

type Listener = () => void;

export class ExternalStore<T> {
	#value: T;
	#listeners: Array<Listener> = [];

	constructor(initialValue: T) {
		this.#value = initialValue;
	}

	getSnapshot() {
		return this.#value;
	}

	subscribe(listener: Listener) {
		this.#listeners.push(listener);

		return () => {
			this.#listeners.filter((l) => l !== listener);
		};
	}

	emitChange() {
		this.#listeners.forEach((listener) => listener());
	}
}

// export function useSES<T>(store:ExternalStore<T>) {
// 	const { data } = useSyncExternalStore(store.subscribe, store.getSnapshot);

// 	return data;
// }
