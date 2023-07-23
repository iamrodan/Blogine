/* eslint-disable @next/next/no-img-element */
type UserAvatarProps = {
  onClick?(): void;
};
export default function UserAvatar({ onClick }: UserAvatarProps) {
  //TODO: Show first letter of username in the avatar
  return (
    <div className="space-x-6">
      <img
        className="inline-block h-10 w-10 rounded-full"
        src="/images/user-avatar.svg"
        alt="Dan_Abromov"
        onClick={onClick}
      />
    </div>
  );
}
