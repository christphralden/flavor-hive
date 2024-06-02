interface Restaurant extends RestaurantBase{
    id:string,
    created?:Date,
    updated?:Date,
}

interface RestaurantBase{
    name:string,
    coverImage:string,
    images:string[],
    description:string,
    location:string,
    keywords:RestaurantKeywords,
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

interface AppendRestaurantData{
    data:any,
    key:"name"|"images"|"coverImage"|"description"|"location"|"keywords.tags"|"restaurantOwner"
}