"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useLogout } from "~/api";
import { env } from "~/constants/variables";

export const LogoutButton = () => {
	const router = useRouter();
	const { mutate: logout, isPending } = useLogout();

	const handleLogout = () => {
		if (isPending) return;

		logout(undefined, {
			onSuccess: () => {
				// 로컬 스토리지 토큰 제거
				try {
					window.localStorage.removeItem(env.access_token);
				} catch {}

				// 쿠키 제거 (클라이언트에서 가능한 경우)
				const deleteCookie = (name: string) => {
					// Delete with common paths
					document.cookie = `${name}=; Max-Age=0; path=/`;
					document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
				};
				if (env.access_token) deleteCookie(env.access_token);
				if (env.refresh_token) deleteCookie(env.refresh_token);

				// 최상단 페이지로 하드 리다이렉트
				if (typeof window !== "undefined") {
					window.location.replace("/auth");
				} else {
					router.push("/");
				}
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
