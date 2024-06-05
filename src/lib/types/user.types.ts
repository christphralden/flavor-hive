

interface UserBase{
    username: string,
    email:string,
    name:string,
    isRestaurantOwner:boolean,
}

interface User extends UserBase{
    id: string,
    verified: boolean,
    avatar:string|null

    
}
interface UserRegister extends UserBase{
    emailVisibility: boolean,
    password:string,
    passwordConfirm:string,
};

interface UserLogin {
    email: string,
    password: string,
}