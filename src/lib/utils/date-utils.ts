import {format, formatDistance, subDays} from 'date-fns'
import { dateType } from 'lib/types/date.types'

export function formatDate(date: Date, type: dateType){
    if(type === dateType.ago) return formatDistance(date, new Date(), { addSuffix: true });
    else return format(date, type)
}