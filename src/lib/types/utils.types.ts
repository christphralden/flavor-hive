import { RecordModel } from "pocketbase"

interface State{
    status?:number
    message?:string
}
export interface PocketbaseTyped<Type> {
    record: RecordModel;
    data: Type;
}
