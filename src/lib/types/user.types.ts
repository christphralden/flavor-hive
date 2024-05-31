

interface UserBase{
    username: string,
    email:string,
    name:string,
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

type UserLogin = {
    email: string,
    password: string,
}