import { twMerge } from 'tailwind-merge';

export const LogoutButton = () => {
  return (
    <button
      type="button"
      className={twMerge(
        'cursor-pointer text-3xl text-red-800 tracking-wider hover:bg-white active:translate-y-px',
        'pt-3 pr-10 pb-3 pl-10',
        'rounded-4xl border-2 border-white',
      )}
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
