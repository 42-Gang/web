import { notFound } from 'next/navigation';

interface Props {
  searchParams: Promise<{ mode: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { mode } = await searchParams;
  if (!mode) notFound();

  return mode;
};

export default Page;
