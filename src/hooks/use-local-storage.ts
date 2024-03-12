import { useState, useEffect, useSyncExternalStore, useCallback } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T) {
// 	const [storedValue, setStoredValue] = useState<T>(() => {
// 		const item = localStorage.getItem(key);
// 		console.log({ item });

// 		return item ? JSON.parse(item) : initialValue;
// 	});

// 	console.log({ storedValue });

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(storedValue));
// 	}, [key, storedValue]);

// 	return [storedValue, setStoredValue] as const;
// }

export function useLocalStorage(key: string) {
	const subscribe = (listener: () => void) => {
		window.addEventListener("storage", listener);

		return () => window.removeEventListener("storage", listener);
	};

	const getSnapshot = () => {
		return localStorage.getItem(key);
	};

	const setItem = useCallback(
		(value: string) => {
			const newValue = value;

			window.localStorage.setItem(key, newValue);
			window.dispatchEvent(new StorageEvent("storage", { key: key, newValue }));
		},
		[key],
	);

	const item = useSyncExternalStore(subscribe, getSnapshot);

	return [item, setItem] as const;
}
