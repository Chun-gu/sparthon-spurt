import { BucketForm } from "../components/bucket-form";
import { BucketList } from "../components/bucket-list";

export function MainPage() {
	return (
		<main className="flex min-h-screen justify-center bg-blossom bg-cover bg-fixed bg-no-repeat">
			<section className="flex min-w-[320px] flex-col gap-4 bg-white/60 p-10">
				<h1 className="text-5xl font-extrabold text-red-500">
					Sparthon Bucket List
				</h1>
				<h2 className="text-center text-lg font-bold">
					꿈은 꾸는 것이 아닌, 이루는 것이다.
				</h2>

				<BucketForm />

				<section>
					<BucketList />
				</section>
			</section>
		</main>
	);
}
