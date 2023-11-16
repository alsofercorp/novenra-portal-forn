export interface IAnswerRequest {
    disponibility: boolean,
    requestedItem: string,
    manufacturer: string,
    equivalence: string | null,
    requestedQtty: number,
    unityValue: number,
    discount: number,
    hasIPI: boolean,
    ipiPercent: number,
    ipiValue: number,
    icmsPercent: number,
    deliveryDue: string | Date,
    brand: string
}