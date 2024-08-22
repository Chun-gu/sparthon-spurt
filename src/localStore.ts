import type { Bucket } from "./types";

type Listener = () => void;

let listeners: Array<Listener> = [];

export const bucketStore = {
	addBucket(bucket: Bucket) {
		localStorage.setItem("bucket-list", JSON.stringify(bucket));
		emitChange();
	},

	updateBucket() {},

	deleteBucket() {},

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
