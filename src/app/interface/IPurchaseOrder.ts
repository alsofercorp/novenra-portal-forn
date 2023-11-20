export interface IPurchaseOrder {
    PurcahseOrderCode: string,
    requester: string,
    destination: string,
    deliveryDate: Date | string,
    totalValue: number,
    attachments: number,
    status: any
}