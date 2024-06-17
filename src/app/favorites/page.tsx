import FavoritesGrid from "./_components/favorites-grid";

export default async function Favorites() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <section>
          <FavoritesGrid />
        </section>
      </div>
    </>
  );
}
