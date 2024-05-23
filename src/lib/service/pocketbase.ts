import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default pb;



export enum PB_KEYS {
    PB_AUTH_TOKEN = 'pb_auth',
    PB_USERS_COLLECTION = 'users',
}