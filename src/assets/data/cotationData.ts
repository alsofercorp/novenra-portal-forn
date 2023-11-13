import { cotationStatusEnum } from '../Enum/cotationStatusEnum';
import { ICotationModel } from './../../app/interface/ICotation';


export const cotationData: ICotationModel[] = [
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Estoque',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.pending)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Utilização imediada',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.sented)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Estoque',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.sented)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Utilização imediada',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.approved)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Estoque',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.NotApproved)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Utilização imediada',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.pending)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Estoque',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.pending)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Utilização imediada',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.approved)
    },
    {
        requester: 'LB Serviços Mecânicos e Comércios de Peças',
        destination: 'São Carlos (SP)',
        requestDate: '01/10/23 às 14h00',
        wishedDelivery: '23/10/23',
        reason: 'Estoque',
        contact: '(16) 98765-4321',
        status: getStatus(cotationStatusEnum.NotApproved)
    },
];

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
        case cotationStatusEnum.NotApproved:
            return {
                status: 3,
                name: 'Não Aprovado',
                tag: 'red'
            }
    }
}