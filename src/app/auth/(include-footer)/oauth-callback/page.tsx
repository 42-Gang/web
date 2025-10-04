import { CallbackController } from './callback-controller';

interface Props {
  searchParams: Promise<{ code: string; state: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { code, state } = await searchParams;

  return <CallbackController code={code} state={state} />;
};

export default Page;
