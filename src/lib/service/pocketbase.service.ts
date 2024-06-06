import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
pb.autoCancellation(false);

export default pb;

export enum PB_KEYS {
    AUTH_TOKEN = 'pb_auth',
    USERS = 'users',
    RESTAURANTS = 'restaurants',
    REVIEWS = 'reviews',
    MENUS = 'menus',
}