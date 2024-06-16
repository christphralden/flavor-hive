import StarRepeat from "@components/review/star-repeat";
import { Star } from "@geist-ui/icons";
import pb from "@service/pocketbase.service";
import { formatDate } from "@utils/date-utils";
import { formatPrice, round } from "@utils/utils";
import { dateType } from "lib/types/date.types";
import { PocketbaseTyped } from "lib/types/utils.types";
import Image from "next/image";
import Link from "next/link";

interface RestaurantCommentProps {
  review: PocketbaseTyped<Review_Poster_Restaurant>;
}

export default async function RestaurantComment({
  review,
}: RestaurantCommentProps) {
  const coverImage = pb.files.getUrl(
    review.expand.restaurant,
    review.expand.restaurant.cover as string,
    {
      thumb: "0x300",
    },
  );

  const imageList = (review.images as string[]).map((image) => {
    return pb.files.getUrl(review, image as string, {
      thumb: "0x300",
    });
  });

  const restaurant = review.expand.restaurant;
  const spent = formatPrice(review.spent);

  const time = formatDate(new Date(review.created), dateType.default);
  return (
    <div className="w-full min-h-48 flex p-4 gap-16">
      <section className="w-[30%] flex-1 flex flex-col justify-between">
        <Link
          href={`/restaurant/${review.restaurant}`}
          className="w-full h-fit flex gap-4 items-center"
        >
          <Image
            width={1024}
            height={720}
            src={coverImage}
            alt="coverImage"
            className="lg:w-20 lg:h-20 w-16 h-16 rounded-md aspect-square"
          />
          <div className="w-full flex flex-col h-full justify-center items-start gap-1">
            <div className="flex gap-2 items-center">
              <h1 className="font-medium text-base leading-5">
                {restaurant.name}
              </h1>
              <div className="flex gap-1 items-center">
                <Star color="#6b7280" className="w-4 flex-shrink-0" />
                <p className="text-gray-500 text-sm lg:text-base">
                  {round(restaurant.cachedRating)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-gray-500">
              <span>Total Spent:</span>
              <span className="font-medium">{spent}</span>
            </div>
          </div>
        </Link>
      </section>
      <section className="w-[70%] h-full flex flex-col gap-4 items-start">
        <div className="flex gap-2 items-center">
          <StarRepeat amount={review.rating} />
          <span className="text-xs lg:text-sm text-gray-500 text-right">
            {time}
          </span>
        </div>
        <p className="text-gray-500">{review.description}</p>
        <div>
          {imageList.map((image, i) => {
            return (
              <Image
                key={i}
                width={1024}
                height={720}
                className="w-32 h-32 object-cover opacity-80 rounded-md"
                src={image}
                alt="image"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
