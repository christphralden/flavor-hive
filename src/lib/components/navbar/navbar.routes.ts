interface Routes{
    name:string,
    path:string
}

export const NavbarRoutes:Routes[] = [
    {
        name:"Home",
        path:"/home"
    },
    {
        name:"Explore",
        path:"/explore"
    },
    {
        name:"Favorites",
        path:"/favorites"
    },
    {
        name:"Reviews",
        path:"/reviews"
    },
]