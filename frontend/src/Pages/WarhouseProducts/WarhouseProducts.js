import React, {useEffect, useState} from 'react'
import Api from '../../Config/Api'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
import Pagination from '../../Components/Pagination/Pagination'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import Dates from '../../Components/Dates/Dates'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import SelectForm from '../../Components/Select/SelectForm'
import {roundUsd, roundUzs} from '../../App/globalFunctions'

const WarhouseProducts = () => {
    const {currencyType} = useSelector((state) => state.currency)

    //================================================
    //================================================

    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(new Date())

    const [currentPage, setCurrentPage] = useState(0)
    const [countPage, setCountPage] = useState(10)

    const [type, setType] = useState({
        label: 'Kelgan',
        value: 'income',
    })

    // ==========================================================
    // ==========================================================

    const [warhousePorducts, setWarhouseProducts] = useState([])
    const [totalDatas, setTotalDatas] = useState(0)

    useEffect(() => {
        const getWarhouseProduct = async () => {
            try {
                const {data} = await Api.post('/filials/warhouseproducts/get', {
                    type: type?.value,
                    startDate,
                    endDate,
                    currentPage,
                    countPage,
                })
                setWarhouseProducts(data.warhouseproducts)
                setTotalDatas(data.count)
            } catch (error) {
                universalToast(error, 'error')
            }
        }
        getWarhouseProduct()
    }, [type, startDate, endDate, currentPage, countPage])

    // ==========================================================
    // ==========================================================

    // useEffect(() => {
    //     dispatch(getFilials({ market }))
    // }, [dispatch])

    // ==========================================================
    // ==========================================================

    return (
        <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
                open: {opacity: 1, height: 'auto'},
                collapsed: {opacity: 0, height: 0},
            }}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
        >
            <div className='pagination mainPadding'>
                <Pagination
                    countPage={Number(countPage)}
                    currentPage={currentPage}
                    totalDatas={totalDatas}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className='mainPadding flex justify-between items-center'>
                <div className='flex items-center gap-[20px]'>
                    <SelectForm
                        key={'total_1'}
                        onSelect={(e) => setCountPage(e)}
                    />
                    <Dates
                        value={startDate}
                        onChange={setStartDate}
                        placeholder={'01.01.2021'}
                        maxWidth={'w-[6.625rem]'}
                    />
                    <Dates
                        value={endDate}
                        onChange={setEndDate}
                        placeholder={'01.01.2021'}
                        maxWidth={'w-[6.625rem]'}
                    />
                </div>
                {/* <FieldContainer
                    placeholder={'Filialni tanlang'}
                    select={true}
                    value={filial}
                    options={filials}
                    onChange={setFilial}
                    maxWidth={'w-[200px]'}
                /> */}
                <FieldContainer
                    placeholder={'Filialni'}
                    select={true}
                    value={type}
                    options={[
                        {
                            label: 'Kelgan',
                            value: 'income',
                        },
                        {
                            label: 'Chiqqan',
                            value: 'outcome',
                        },
                    ]}
                    onChange={setType}
                    maxWidth={'w-[200px]'}
                />
            </div>
            <div className='tableContainerPadding'>
                <table className='overflow-x-auto w-full'>
                    <thead className='rounded-t-lg sticky top-0'>
                        <tr className='bg-primary-900 rounded-t-lg'>
                            <th className='th rounded-tl-lg border-r-2 border-primary-700'>
                                №
                            </th>
                            <th className='th border-r-2 border-primary-700'>
                                Sana
                            </th>
                            <th className='th border-r-2 border-primary-700'>
                                Omborxona
                            </th>
                            <th className='th border-r-2 border-primary-700'>
                                Nomi
                            </th>
                            <th className='th border-r-2 border-primary-700'>
                                Kodi
                            </th>
                            <th className='th border-r-2 border-primary-700'>
                                Soni
                            </th>
                            <th className='th rounded-tr-lg'>Jami narxi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warhousePorducts &&
                            warhousePorducts.length > 0 &&
                            warhousePorducts.map((product, ind) => (
                                <tr className='tr' key={ind}>
                                    <td className='td py-2'>
                                        {ind + 1 + currentPage * countPage}
                                    </td>
                                    <td className='td'>
                                        <div className='flex justify-between w-full'>
                                            <span>
                                                {new Date(
                                                    product.createdAt
                                                ).toLocaleDateString()}
                                            </span>{' '}
                                            <span>
                                                {new Date(
                                                    product.createdAt
                                                ).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='td'>
                                        {product?.filial?.name}
                                    </td>
                                    <td className='td'>
                                        {product?.product?.product.code}
                                    </td>
                                    <td className='td'>
                                        {product?.product?.product?.name}
                                    </td>
                                    <td className='td'>
                                        {product?.product?.fromFilial}
                                    </td>
                                    <td className='td'>
                                        {currencyType === 'USD'
                                            ? roundUsd(
                                                  product?.product?.unitprice *
                                                      product?.product
                                                          ?.fromFilial
                                              ).toLocaleString('ru-RU')
                                            : roundUzs(
                                                  product?.product
                                                      ?.totalpriceuzs *
                                                      product?.product
                                                          ?.fromFilial
                                              ).toLocaleString('ru-RU')}{' '}
                                        {currencyType}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    )
}

export default WarhouseProducts
