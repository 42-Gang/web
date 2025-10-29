interface PageProps {
  searchParams: Promise<{ id: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  return <>{id}</>;
};

export default Page;
