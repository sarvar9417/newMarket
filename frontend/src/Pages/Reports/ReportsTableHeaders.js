import { t } from "i18next"

export const ReportsTableHeaders = (header) => {
    let paymenttype =
        (header === 'cash' && 'Naqt') ||
        (header === 'card' && 'Plastik') ||
        (header === 'transfer' && "O'tkazma")

    const headers = {
        sale: [
            {
                title: '№',
            },
            {
                title: t('Sana'),
                filter: 'createdAt',
            },
            {
                title: t('ID'),
                filter: 'id',
            },
            {
                title: t('Mijoz'),
            },
            {
                title: t('Jami'),
            },
            {
                title: "To'langan",
            },
            {
                title: t('Qarz'),
            },
            {
                title: t('Izoh'),
            },
            {
                title: '',
                styles: 'w-[7rem]',
            },
        ],
        income: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'ID',
                filter: 'saleconnector.id',
            },
            {
                title: 'Kelgan narxi',
            },
            {
                title: 'Sotilgan narxi',
            },
            {
                title: 'Chegirma',
            },
            {
                title: 'Foyda',
            },
            {
                title: '',
            }
        ],
        debts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'ID',
                filter: 'saleconnector.id',
            },
            {
                title: 'Mijoz',
                filter: 'client',
            },
            {
                title: 'Qarz izoh',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Qarz',
            },
            {
                title: '',
            },
        ],
        expenses: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'Summa',
            },
            {
                title: 'Izoh',
            },
            {
                title: 'Turi',
            },
        ],
        discounts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'ID',
                filter: 'saleconnector.id',
            },
            {
                title: 'Mijoz',
                filter: 'client',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Chegirma',
            },
            {
                title: 'Foiz',
            },
        ],
        backproducts: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'ID',
                filter: 'saleconnector.id',
            },
            {
                title: 'Mijoz',
                filter: 'client',
            },
            {
                title: 'Soni',
            },
            {
                title: 'Jami',
            },
            {
                title: 'Qaytarilgan',
            },
            {
                title: '',
            },
        ],
        payments: [
            {
                title: '№',
            },
            {
                title: 'Sana',
                filter: 'createdAt',
            },
            {
                title: 'ID',
                filter: 'saleconnector.id',
            },
            {
                title: 'Mijoz'
            },
            {
                title: 'Naqt',
            },
            {
                title: 'Plastik',
            },
            {
                title: "O'tkazma",
            },
            {
                title: "Qarzdan to'lov",
            },
            {
                title: "Qaytarilgan",
            },
            {
                title: "",
            },
        ],
    }

    // return header === 'cash' || header === 'card' || header === 'transfer'
    //     ? headers.payments
    //     : headers[`${header}`]

    return headers[`${header}`]
}
