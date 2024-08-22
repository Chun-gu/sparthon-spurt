import { useEffect, useSyncExternalStore } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

export function LocalStoragePage() {
	const [count, setCount] = useCount();

	return (
		<main>
			<h1>로컬 스토리지 실험</h1>

			<p>{count}</p>

			<button onClick={() => setCount(count - 1)}>감소</button>
			{count < 2 && <Child1 />}
			{count < 3 && <Child2 />}
			{count < 4 && <Child3 />}
		</main>
	);
}

function Child1() {
	const [count, setCount] = useCount();

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>1번: {count}</button>
		</div>
	);
}

function Child2() {
	const [count, setCount] = useCount();

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>2번: {count}</button>
		</div>
	);
}

function Child3() {
	const [count, setCount] = useCount();

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>3번: {count}</button>
		</div>
	);
}

function useCount() {
	const [hcount, hsetCount] = useLocalStorage("count");
	const count = hcount ? +hcount : 0;
	const setCount = (newCount: number) => hsetCount(newCount + "");

	return [+count!, setCount] as const;
}

// type StoreChangeHandler = () => void;

// const storeChangeHandlers = new Set<StoreChangeHandler>();

// function emitChange() {
// 	storeChangeHandlers.forEach((handler) => handler());
// }

// const localStore = {
// 	setItem(item: string) {
// 		localStorage.setItem("ls", item);
// 		emitChange();
// 	},

// 	getItem(key: string) {
// 		return localStorage.getItem(key);
// 	},

// 	subscribe(storeChangeHandler: () => void) {
// 		function handleStorageEvent(e: StorageEvent) {
// 			console.log(e.key);
// 			if (e.key === "ls") emitChange();
// 		}

// 		window.addEventListener("storage", handleStorageEvent);
// 		storeChangeHandlers.add(storeChangeHandler);
// 		console.log("onSubscribe", storeChangeHandlers.size);

// 		return () => {
// 			window.removeEventListener("storage", handleStorageEvent);
// 			storeChangeHandlers.delete(storeChangeHandler);
// 			console.log("onUnsubscribe", storeChangeHandlers.size);
// 		};
// 	},
// };

// function useLocalStorage<T>(key: string, initialValue: T) {
// 	const { subscribe, getItem } = localStore;
// 	const storedValue = useSyncExternalStore(subscribe, getItem);
// 	const count = JSON.parse(storedValue ?? "0");

// 	return [count, localStore.setItem] as const;
// }

// const cache = (<T,>() => new Map<string, T>())();
// const handlers = new Set<(key: string) => unknown>();
// const IS_PRIMITIVE = "__IS_PRIMITIVE__";

// const isPrimitive = (value: unknown) =>
// 	["number", "string", "boolean"].includes(typeof value);

// const useLocalStorage = <T,>(key: string, defaultValue?: T) => {
// 	useEffect(() => {
// 		const cachedValue = cache.get(key);

// 		if (cachedValue !== null && cachedValue !== undefined) {
// 			return;
// 		}

// 		const storedItem = window.localStorage.getItem(key);

// 		if (storedItem !== null && storedItem !== undefined) {
// 			const parsed = JSON.parse(storedItem);

// 			if (parsed[IS_PRIMITIVE]) cache.set(key, parsed[key]);
// 			else cache.set(key, parsed);

// 			return;
// 		}

// 		if (defaultValue !== null && defaultValue !== undefined) {
// 			if (isPrimitive(defaultValue)) {
// 				const wrapped = {
// 					[IS_PRIMITIVE]: true,
// 					[key]: defaultValue,
// 				};

// 				window.localStorage.setItem(key, JSON.stringify(wrapped));
// 			} else {
// 				window.localStorage.setItem(key, JSON.stringify(defaultValue));
// 			}
// 			cache.set(key, defaultValue);
// 		}
// 	}, [defaultValue, key]);

// 	const onSubscribe = (onStoreChange: () => unknown) => {
// 		const onChange = (cacheKey: string) => {
// 			if (cacheKey === key) onStoreChange();
// 		};

// 		handlers.add(onChange);

// 		return () => {
// 			handlers.delete(onChange);
// 		};
// 	};

// 	const onSnapshot = () => {
// 		return cache.get(key) as T;
// 	};

// 	const state = useSyncExternalStore(onSubscribe, onSnapshot);

// 	const setState = (newValue: T) => {
// 		cache.set(key, newValue);

// 		if (isPrimitive(newValue)) {
// 			const wrapped = { [IS_PRIMITIVE]: true, [key]: newValue };
// 			window.localStorage.setItem(key, JSON.stringify(wrapped));
// 		} else {
// 			window.localStorage.setItem(key, JSON.stringify(newValue));
// 		}

// 		handlers.forEach((handler) => handler(key));
// 	};

// 	useEffect(() => {
// 		const onStorage = (event: StorageEvent) => {
// 			if (event.key === key) handlers.forEach((handler) => handler(key));
// 		};

// 		window.addEventListener("storage", onStorage);

// 		return () => window.removeEventListener("storage", onStorage);
// 	}, [key]);

// 	return [state, setState] as const;
// };
