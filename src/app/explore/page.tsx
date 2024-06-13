
interface ExploreProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Explore({ searchParams }: ExploreProps) {
  console.log(searchParams)
  console.log(searchParams.search)
  return (
    
    <>
      <div>Explore</div>
    </>
  );
}

