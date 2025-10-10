"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useLogout } from "~/api";

export const LogoutButton = () => {
	const router = useRouter();
	const { mutate: logout, isPending } = useLogout();

	const handleLogout = () => {
		if (isPending) return;

		logout(undefined, {
			onSuccess: () => {
				// 로그아웃 성공 시 로그인 페이지로 이동
				router.push("/");
			},
			onError: (error) => {
				console.error("Failed to logout:", error);
				alert("로그아웃에 실패했습니다.");
			},
		});
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={isPending}
			className={twMerge("cursor-pointer text-3xl text-red-800 tracking-wider hover:bg-white active:translate-y-px", "pt-3 pr-10 pb-3 pl-10", "rounded-4xl border-2 border-white", isPending && "opacity-50 cursor-not-allowed")}
		>
			<div className="flex gap-6">
				<span>L</span>
				<span>o</span>
				<span>g</span>
				<span>o</span>
				<span>u</span>
				<span>t</span>
			</div>
		</button>
	);
};
