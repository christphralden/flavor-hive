interface Restaurant{
    id:string,
    name:string,
    images:string[],
    location:string,
    keywords?:RestaurantKeywords,
    restaurantOwner:string,
    created?:Date,
    updated?:Date,
}
interface Restaurant_RestaurantOwner{
    extends:{
        restaurantOwner:User
    }
}


interface RestaurantKeywords{
    tags?:string[]
    //tambahin nanti mungkin buat sentiment AI
}