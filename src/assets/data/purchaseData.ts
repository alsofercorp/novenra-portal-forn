import { cotationStatusEnum } from '../Enum/cotationStatusEnum';
import { IPurchaseOrder } from './../../app/interface/IPurchaseOrder';

export const PurchaseData: IPurchaseOrder[] = [
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 2,
        status: getStatus(cotationStatusEnum.inSeparetion)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 3,
        status: getStatus(cotationStatusEnum.sented)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 0,
        status: getStatus(cotationStatusEnum.sented)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 1,
        status: getStatus(cotationStatusEnum.recived)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 0,
        status: getStatus(cotationStatusEnum.recived)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 0,
        status: getStatus(cotationStatusEnum.recived)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 0,
        status: getStatus(cotationStatusEnum.sented)
    },
    {
        PurcahseOrderCode: 'OC 1251',
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        deliveryDate: '2023-10-23',
        totalValue: 2800,
        attachments: 0,
        status: getStatus(cotationStatusEnum.sented)
    },
]

function getStatus(status: cotationStatusEnum): any {
    switch (status) {
        case cotationStatusEnum.approved:
            return {
                status: 0,
                name: 'Aprovado',
                tag: 'orange'
            }
        case cotationStatusEnum.sented:
            return {
                status: 1,
                name: 'Enviado',
                tag: 'blue'
            }
        case cotationStatusEnum.pending:
            return {
                status: 2,
                name: 'Pendente',
                tag: 'green'
            }
        case cotationStatusEnum.notApproved:
            return {
                status: 3,
                name: 'Não Aprovado',
                tag: 'red'
            }
        case cotationStatusEnum.inSeparetion:
            return {
                status: 4,
                name: 'Em Separação',
                tag: 'orange'
            }
        case cotationStatusEnum.recived:
            return {
                status: 5,
                name: 'Recebida',
                tag: 'green'
            }
    }
}