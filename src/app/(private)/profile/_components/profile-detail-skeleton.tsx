export const ProfileDetailSkeleton = () => {
  return (
    <div className="flex flex-row content-center items-center">
      {/* Avatar Skeleton */}
      <div className="relative m-8 mr-14">
        <div className="size-[200px] overflow-hidden rounded-full bg-gray-700/30">
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="column gap-4 text-3xl text-white">
        {/* Nickname */}
        <div className="flex flex-row items-center">
          <span className="text-gray-500/60">Nickname :</span>
          <div className="ml-4 h-9 w-40 overflow-hidden rounded bg-gray-700/30">
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          </div>
        </div>

        {/* WIN */}
        <div className="flex flex-row items-center gap-2">
          <span className="text-gray-500/60">WIN :</span>
          <div className="h-9 w-16 overflow-hidden rounded bg-gray-700/30">
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          </div>
        </div>

        {/* LOSE */}
        <div className="flex flex-row items-center gap-2">
          <span className="text-gray-500/60">LOSE :</span>
          <div className="h-9 w-16 overflow-hidden rounded bg-gray-700/30">
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          </div>
        </div>

        {/* Tournament */}
        <div className="flex flex-row items-center gap-2">
          <span className="text-gray-500/60">Tournament :</span>
          <div className="h-9 w-16 overflow-hidden rounded bg-gray-700/30">
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
