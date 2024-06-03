interface Restaurant extends RestaurantBase{
    id:string,
    created?:Date,
    updated?:Date,
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
    image:string,
}
interface Menu{
    restaurant:string
}

// ======= form handling =========
interface AppendRestaurantData{
    data: any,
    key: keyof RestaurantBase
}
