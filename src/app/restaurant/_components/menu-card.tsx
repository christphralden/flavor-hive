import pb from "@service/pocketbase.service";
import { formatPrice } from "@utils/utils";
import { PocketbaseTyped } from "lib/types/utils.types";
import Image from "next/image";

interface MenuCardProps {
  menu: PocketbaseTyped<MenuBase>;
}

export default function MenuCard({ menu }: MenuCardProps) {
  const menuImage = pb.files.getUrl(menu, menu.image as string, {
    thumb: "0x300",
  });

  const price = formatPrice(menu.price);

  return (
    <div className=" flex flex-col rounded-lg justify-between gap-2 p-4 ">
      <div className="w-full h-[70%] aspect-square rounded-lg overflow-clip">
        <Image
          width={300}
          height={300}
          className="w-full h-full object-cover"
          src={menuImage}
          alt={menu.name}
        />
      </div>
      <div className="w-full h-[30%] flex-col justify-between flex gap-2 lg:gap-4">
        <div className="flex flex-col h-full">
          <h2 className="font-medium   text-base ">{menu.name}</h2>
          <p className="text-sm lg:  text-gray-500">{menu.description}</p>
        </div>
        <p className="font-medium   text-base lg:text-lg">{price}</p>
      </div>
    </div>
  );
}
