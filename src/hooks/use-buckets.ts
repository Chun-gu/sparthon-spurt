import { useCallback } from "react";
import { BUCKETLIST_STORAGE_ID } from "../constants";
import type { Bucket } from "../types";
import { useLocalStorage } from "./use-local-storage";

export function useBuckets() {
	console.log("useBuckets re-render");
	const initialBuckets: Array<Bucket> = [];
	const [item, setItem] = useLocalStorage(BUCKETLIST_STORAGE_ID);
	const buckets =
		item === null ? initialBuckets : (JSON.parse(item) as Array<Bucket>);

	const setBuckets = useCallback(
		(buckets: Array<Bucket>) => {
			setItem(JSON.stringify(buckets));
		},
		[setItem],
	);

	const addBucket = useCallback(
		(bucket: Bucket) => {
			const newBuckets = [...buckets!, bucket];
			setBuckets(newBuckets);
		},
		[buckets, setBuckets],
	);

	const updateBucket = useCallback(
		(id: Bucket["id"], content: Partial<Omit<Bucket, "id">>) => {
			const updatedBuckets = buckets.map((bucket) =>
				bucket.id === id ? { ...bucket, ...content } : bucket,
			);
			setBuckets(updatedBuckets);
		},
		[buckets, setBuckets],
	);

	const deleteBucket = useCallback(
		(id: Bucket["id"]) => {
			const filteredBuckets = buckets.filter((bucket) => bucket.id !== id);
			setBuckets(filteredBuckets);
		},
		[buckets, setBuckets],
	);

	return { buckets, addBucket, updateBucket, deleteBucket };
}
