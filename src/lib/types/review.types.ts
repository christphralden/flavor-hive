interface Review{
    id:string,
    title:string,
    description:string,
    images:string[],
    poster:string,
    rating:number,
    restaurant:string,
    created:Date,
    updated:Date,
    expand?:any
}

interface Review_Poster extends Review{
    expand:{
        poster:User
    }
}