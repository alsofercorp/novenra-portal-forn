import { endOfMonth, addMonths, addDays, startOfYear, endOfYear, subYears } from 'date-fns';

export const ranges = { 
    'Últimos 15 dias': [new Date(), addDays(new Date(), 15)], 
    'Último mês': [new Date(), addDays(new Date(), 30)],
    'Últimos 3 meses': [new Date(), addMonths(new Date(), 3)],
    '2023': [startOfYear(new Date()), endOfYear(new Date())],
    '2022': [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))],
};