
interface ExploreProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Explore({ searchParams }: ExploreProps) {
  return (
    <>
      <div>{searchParams?.search}</div>
    </>
  );
}

