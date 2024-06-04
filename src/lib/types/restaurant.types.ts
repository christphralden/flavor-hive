interface Restaurant extends RestaurantBase{
    id:string,
    created?:Date|string,
    updated?:Date|string,
}

interface RestaurantBase{
    name:string,
    cover?: File | FileList | string,
    images?: File[] | FileList | string[],
    description:string,
    location:string,
    keywords?:RestaurantKeywords,
    restaurantOwner:string,
}

interface Restaurant_RestaurantOwner{
    extends:{
        restaurantOwner:User
    }
}


interface RestaurantKeywords{
    tags:string[]
    //tambahin nanti mungkin buat sentiment AI
}

interface MenuBase{
    name:string,
    description: string,
    price: number,
    image?:File | FileList | string,
}
interface MenuPost extends MenuBase{
    restaurant:string
}

interface Menu extends MenuPost{
    id:string
}

// ======= form handling =========
interface AppendRestaurantData{
    data: any,
    key: keyof RestaurantBase
}
