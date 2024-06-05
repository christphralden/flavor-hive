
// interface State{
//     status?:number
//     message?:string
// }

interface PocketbaseAttributes {
    id: string
    created: string | Date
    updated: string | Date
    collectionId: string
    collectionName: string
}

export interface PocketbaseListTyped<T> {
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: T[]
}
export type PocketbaseTyped<T> = T & PocketbaseAttributes;

