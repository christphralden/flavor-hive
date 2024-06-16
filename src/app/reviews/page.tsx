import RestaurantComment from "@components/review/restaurant-comment";
import { Separator } from "@components/ui/separator";
import { getUserPastReviewsPaged } from "@service/reviews.service";
import { PocketbaseListTyped, PocketbaseTyped } from "lib/types/utils.types";

export default async function Reviews() {
  const pastReviews: PocketbaseListTyped<
    PocketbaseTyped<Review_Poster_Restaurant>
  > = await getUserPastReviewsPaged({ page: 1, perPage: 10, sort: "-created" });
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-2 h-64">
        <h1 className="text-3xl font-medium ">Your past reviews</h1>
        <p className="text-gray-500 text-sm lg:text-base">
          Revisit your past culinary journeys that you shared with us
        </p>
      </div>
      <div>
        <p className="text-gray-500 p-4 mb-4 text-lg lg:text-xl">
          {pastReviews.totalItems} Total reviews
        </p>
      </div>
      <div className="w-[100%] flex flex-col gap-8">
        {pastReviews.items.map((pastReview, i) => {
          return (
            <>
              <RestaurantComment review={pastReview} key={i} />
              <Separator />
            </>
          );
        })}
      </div>
    </>
  );
}
