export interface Event  {
    _id: string,
    flyerFront: string,
    startTime: string,
    endTime: string,
    title: string,
    date: string,
    venue : {
        direction: string,
        name: string
    }
}
