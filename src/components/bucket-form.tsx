import { useRef, type FormEvent } from "react";
import addIcon from "/add_icon.png";
import { BUCKET_BG_IMG_COUNT } from "../constants";
import { useBuckets } from "../hooks/use-buckets";
import type { Bucket } from "../types";

export function BucketForm() {
	const bucketInputRef = useRef<HTMLInputElement>(null);
	const { addBucket } = useBuckets();

	function onSubmitBucket(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!bucketInputRef || !bucketInputRef.current) return;

		const content = bucketInputRef.current.value;
		if (content === "") return bucketInputRef.current.focus();

		const id = crypto.randomUUID();
		const imgId = Math.floor(Math.random() * BUCKET_BG_IMG_COUNT) + 1;

		const newBucket: Bucket = {
			id,
			content,
			imgId: `/bucket_bg_${imgId}.png`,
			isDone: false,
		};

		addBucket(newBucket);

		e.currentTarget.reset();
	}

	return (
		<form
			onSubmit={onSubmitBucket}
			className="flex w-3/4 items-center gap-2 self-center"
		>
			<input
				type="text"
				ref={bucketInputRef}
				className="h-full flex-grow text-center font-bold"
			/>
			<button>
				<img src={addIcon} role="presentation" />
				<span className="sr-only">제출</span>
			</button>
		</form>
	);
}
