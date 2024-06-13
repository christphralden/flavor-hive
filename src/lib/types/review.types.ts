
interface Review{
    description:string,
    images?: File[] | FileList | string[],
    poster:string,
    rating:number,
    restaurant:string,
    spent:number
}

// TODO: price range, remove title, add upvotes and downvotes

interface Review_Poster extends Review{
    expand:{
        poster:User
    }
}
interface Review_Poster_Restaurant extends Review{
    expand:{
        poster:User,
        restaurant:RestaurantBase
    }
}
interface Stars{
    [key:number]:number;
}

interface ReviewStats{
    amount:number,
    average:number,
    stars:Stars,
}

type VoteInteractions = "upvote" | "downvote" | "none"

interface Vote{
    review:string,
    user:string,
    type:VoteInteractions
}
