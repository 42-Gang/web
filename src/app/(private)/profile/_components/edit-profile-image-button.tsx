import { EditIcon } from '~/components/icon';

export const EditProfileImageButton = () => {
  return (
    <button type="button" className="active:translate-y-px">
      <EditIcon className="size-6 cursor-pointer text-yellow-300" />
    </button>
  );
};
