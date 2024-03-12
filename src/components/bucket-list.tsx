import { useBuckets } from "../hooks/use-buckets";
import { BucketCard } from "./bucket-card";

export function BucketList() {
	const { buckets } = useBuckets();
	console.log({ buckets });

	return (
		<ul className="grid grid-cols-3 gap-4">
			{buckets.map((bucket) => (
				<li key={bucket.id} className="contents">
					<BucketCard bucket={bucket} />
				</li>
			))}
		</ul>
	);
}
