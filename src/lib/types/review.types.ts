interface Review extends ReviewBase{
    id:string,
    created:Date,
    updated:Date,
    expand?:any
}

interface ReviewBase{
    description:string,
    images?: File[] | FileList | string[],
    poster:string,
    rating:number,
    restaurant:string,
    minPriceRange:number,
    maxPriceRange:number,
}

// TODO: price range, remove title, add upvotes and downvotes

interface Review_Poster extends Review{
    expand:{
        poster:User
    }
}