export function MainPage() {
	function onSubmitBucket() {}

	return (
		<main className="min-h-screen bg-blossom bg-no-repeat bg-cover flex justify-center">
			<section className="bg-white/20 flex flex-col items-center">
				<h1 className="text-5xl text-red-500">Sparthon Bucket List</h1>
				<h2>꿈은 꾸는 것이 아닌, 이루는 것이다.</h2>

				<form onSubmit={onSubmitBucket}>
					<input type="text" />
					<button>
						<img src="/add_icon.png" />
						<span className="sr-only">제출</span>
					</button>
				</form>

				<section>
					<ul>
						<li>
							<div>
								<span>웹 개발 시작하기</span>
								<button>
									<img src="/delete_icon.png" />
									<span className="sr-only">삭제</span>
								</button>
							</div>
						</li>
					</ul>
				</section>
			</section>
		</main>
	);
}
