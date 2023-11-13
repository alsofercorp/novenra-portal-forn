export const headerInfoData = {
    pending: 5,
    sented: 20,
    approved: 15,
    finished: 10
};

export const peddingCotation = [
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
    {
        name: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        location: 'São Carlos (SP)',
        solicitation: '01/10/23 ás 14:00',
        deliveryDate: '23/10/23'
    },
];

export const recentlyAct = [
    {
        status: 0,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
    {
        status: 1,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
    {
        status: 2,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
    {
        status: 2,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
    {
        status: 1,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
    {
        status: 0,
        statusName: getStatus(0),
        requester: 'LB Serviços Mecânicos e Comércios de Peças LTDA',
        destiny: 'São Carlos (SP)',
        date: '01/10/2023 às 14:00'
    },
];

function getStatus(status: number): string {
    switch (status) {
        case 0:
            return 'Cotação enviada'
        case 1:
            return 'Ordem de compra aprovada'
        case 2:
            return 'Ordem de compra finalizada'
        default:
            return 'Sem Status'
    }
}