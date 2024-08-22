import { useSyncExternalStore } from "react";

let listeners: Listener[] = [];

export const localStore = {
	setItem(item: string) {
		localStorage.setItem("bucket-list", item);

		emitChange();
	},

	subscribe(listener: Listener) {
		listeners = [...listeners, listener];

		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	},

	getSnapshot() {
		return localStorage.getItem("bucket-list");
	},
};

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}

export function useLocalStorage() {
	const storedValue = useSyncExternalStore(
		localStore.subscribe,
		localStore.getSnapshot,
	);
	return [storedValue, localStore.setItem] as const;
}

type Listener = () => void;

export class ExternalStore<T> {
	private value;
	private listeners: Array<Listener> = [];

	constructor(initialValue: T) {
		this.value = initialValue;
	}

	// 인자로 받은 `listener`를 저장소의 구독자 목록에 추가한다.
	// 구독자 목록에서 제거하는 함수를 반환한다.
	subscribe(listener: Listener) {
		this.listeners = [...this.listeners, listener];

		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	// 저장소에서 호출 시점의 데이터를 꺼내 반환한다.
	getSnapshot() {
		return this.value;
	}

	// setSnapshot(value: T) {
	// 	this.value = value;
	// 	this.notify();
	// }

	// 구독자들에게 변화를 알려준다.
	private notify() {
		for (const listener of this.listeners) {
			listener();
		}
	}
}
