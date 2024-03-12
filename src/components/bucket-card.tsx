import deleteIcon from "/delete_icon.png";
import doneIndicator from "/done_indicator.png";
import { imgSrc } from "../utils/imgSrc";
import { useBuckets } from "../hooks/use-buckets";
import type { Bucket } from "../types";

type BucketCardProps = { bucket: Bucket };

export function BucketCard({ bucket }: BucketCardProps) {
	const { updateBucket, deleteBucket } = useBuckets();

	function handleClickToggleDone(id: Bucket["id"], isDone: Bucket["isDone"]) {
		updateBucket(id, { isDone: !isDone });
	}

	function onClickDeleteBucket(id: Bucket["id"]) {
		deleteBucket(id);
	}

	return (
		<div className="relative">
			<div
				onClick={() => handleClickToggleDone(bucket.id, bucket.isDone)}
				style={{ backgroundImage: `url(${imgSrc(bucket.imgId)})` }}
				className="flex aspect-square cursor-pointer items-center justify-center bg-cover p-6"
			>
				<p className="break-all font-bold">{bucket.content}</p>

				{bucket.isDone && <img src={doneIndicator} className="absolute" />}
			</div>

			<button
				onClick={() => onClickDeleteBucket(bucket.id)}
				className="absolute right-0 top-0"
			>
				<img src={deleteIcon} role="presentation" />
				<span className="sr-only">삭제</span>
			</button>
		</div>
	);
}
