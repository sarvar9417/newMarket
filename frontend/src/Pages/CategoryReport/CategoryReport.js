import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import LinkToBack from '../../Components/LinkToBack/LinkToBack.js'
import { useDispatch, useSelector } from 'react-redux'
import { getReportOfCategory } from './CategoryReportSlice.js'
import Table from '../../Components/Table/Table.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import { reduce } from 'lodash'
import { roundUsd, roundUzs } from '../../App/globalFunctions.js'

const calculateTotal = (data) => {
    return reduce(data, (sum, item) => {
        return sum + item.total
    }, 0)
}
const calculateIncomings = (data, currency) => {
    if (currency === 'UZS') {
        return reduce(data, (sum, item) => {
            return sum + roundUzs(Number(item.price.incomingpriceuzs) * item.total)
        }, 0).toLocaleString('ru-RU')
    } else {
        return reduce(data, (sum, item) => {
            return sum + roundUsd(item.price.incomingprice * item.total)
        }, 0).toLocaleString('ru-RU')
    }
}
const calculateSellings = (data, currency) => {
    if (currency === 'UZS') {
        return reduce(data, (sum, item) => {
            return sum + roundUzs(item.price.sellingpriceuzs * item.total)
        }, 0).toLocaleString('ru-RU')
    } else {
        return reduce(data, (sum, item) => {
            return sum + roundUsd(item.price.sellingprice * item.total)
        }, 0).toLocaleString('ru-RU')
    }
}

function CategoryReport() {
    const headers = [
        { title: '№' }, 
        { title: 'Kodi' }, 
        { title: 'Nomi' }, 
        { title: 'Soni' }, 
        { title: 'Olish ' }, 
        { title: 'Sotish' }, 
        { title: 'Sotilganlar soni' }, 
        { title: 'Sotilganlar jami' }]
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { code } = useParams()
    const { products, loading } = useSelector(state => state.categoryReport)
    useEffect(() => {
        if (location.state) {
            dispatch(getReportOfCategory({ categoryId: location.state.id, startDate: location.state.startDate, endDate: location.state.endDate  }))
        } else {
            navigate(-1)
        }
    }, [dispatch, location.state, navigate])
    return (
        <section>
            <div className={'mainPadding flex items-center justify-between pt-12'}>
                <LinkToBack link={-1} />
                <h2 className={'text-base text-black-700'}><span
                    className={'font-medium text-xl text-blue-400'}>{code} {location?.state?.name && `- ${location?.state?.name}`}</span> -
                    kategoriya
                    bo'yicha hisobot</h2>
            </div>
            <div className={'tableContainerPadding'}>
                {
                    loading ? <Spinner /> : products.length > 0 ? <Table
                        page={'categoryreport'}
                        headers={headers}
                        data={products}
                    /> : <NotFind text={'Maxsulot topilmadi d...'} />
                }
            </div>
            <div className={'pl-[2.5rem] pr-[1.25rem] flex items-center justify-end gap-[1rem]'}>
                <p className={'font-medium'}>Jami :</p>
                <ul className={'flex justify-end gap-[1rem]'}>
                    <li className={'text-sm flex items-center gap-[0.5rem]'}>
                        <div className={'w-[0.5rem] h-[0.5rem] rounded-full bg-primary-700'}></div>
                        <span className={'font-medium'}>{products.length} ta maxsulot</span>
                    </li>
                    <li className={'text-sm flex items-center gap-[0.5rem]'}>
                        <div className={'w-[0.5rem] h-[0.5rem] rounded-full bg-warning-400'}></div>
                        <span className={'font-medium'}>Soni: {calculateTotal(products)}</span>
                    </li>
                    <li className={'text-sm flex items-center gap-[0.5rem]'}>
                        <div className={'w-[0.5rem] h-[0.5rem] rounded-full bg-blue-400'}></div>
                        <span className={'font-medium'}>Olish : {calculateIncomings(products, 'UZS')} UZS {' / '} {calculateIncomings(products, 'USD')} USD</span>
                    </li>
                    <li className={'text-sm flex items-center gap-[0.5rem]'}>
                        <div className={'w-[0.5rem] h-[0.5rem] rounded-full bg-success-400'}></div>
                        <span className={'font-medium'}>Sotish : {calculateSellings(products, 'UZS')} UZS {' / '} {calculateSellings(products, 'USD')} USD</span>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default CategoryReport