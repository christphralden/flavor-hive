
//TODO: tambahin favorited, sama review count (display aja), 
// opening hours
// sentiment overview -> ai generated summary
interface RestaurantBase{
    name: string,
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
    //TODO: tambahin nanti mungkin buat sentiment AI
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


// ======= form handling =========
interface AppendRestaurantData{
    data: any,
    key: keyof RestaurantBase
}
