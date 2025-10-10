import { Suspense } from "@suspensive/react";
import { LogoutButton } from "~/app/(private)/profile/_components/logout-button";
import { ProfileDetail } from "~/app/(private)/profile/_components/profile-detail";
import { ProfileHeader } from "~/app/(private)/profile/_components/profile-header";
import { CloseButton } from "~/components/ui";

const Page = () => {
	return (
		<>
			<CloseButton />

			<div className="column-center-x h-full">
				<ProfileHeader />

				<div className="mt-10 flex flex-row">
					<Suspense clientOnly={true}>
						<ProfileDetail />
					</Suspense>
				</div>

				<LogoutButton />
			</div>
		</>
	);
};

export default Page;
