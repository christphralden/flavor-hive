import FavoritesGrid from "./_components/favorites-grid";

export default async function Favorites() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col items-center justify-center gap-2 h-64">
          <h1 className="text-3xl font-medium ">Your favorite picks</h1>
          <p className="text-gray-500 text-sm lg:text-base">
            See all your favorite dishes and restaurants, all in one place
          </p>
        </div>
        <section>
          <FavoritesGrid />
        </section>
      </div>
    </>
  );
}
