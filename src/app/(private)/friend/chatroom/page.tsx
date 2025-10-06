interface Props {
  searchParams: Promise<{ friendId: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { friendId } = await searchParams;

  return <>{friendId}</>;
};

export default Page;
