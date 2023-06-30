import React, {useEffect, useState} from 'react'
import FieldContainer from './../../Components/FieldContainer/FieldContainer'
import Button from './../../Components/Buttons/BtnAddRemove'
import Table from './../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from './../../Components/Spinner/SmallLoader'
import NotFind from './../../Components/NotFind/NotFind'
import {checkEmptyString} from '../../App/globalFunctions.js'
import {motion} from 'framer-motion'
import {
    successAddSellerMessage,
    successUpdateSellerMessage,
    universalToast,
    warningEmptyInput,
} from './../../Components/ToastMessages/ToastMessages'
import {useTranslation} from 'react-i18next'
import {
    addSeller,
    clearErrorSellers,
    clearSuccessAddSeller,
    clearSuccessUpdateSeller,
    getSellers,
    updateSeller,
} from './sellerSlice'
import {useNavigate} from 'react-router-dom'
import SearchForm from '../../Components/SearchForm/SearchForm'

function Sellers() {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        errorSellings,
        sellers,
        loading,
        successAddSelling,
        successUpdateSelling,
    } = useSelector((state) => state.sellers)
    const {currencyType} = useSelector((state) => state.currency)

    const {user} = useSelector((state) => state.login)

    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        {title: t('Ismi'), styles: 'w-[21%]'},
        {title: t('Familiyasi'), styles: 'w-[21%]'},
        {title: t('Telefon raqami'), styles: 'w-[21%]'},
        {title: 'Sotuvlar'},
        {title: 'Summa'},
        {title: 'Sof foyda'},
        {title: '', styles: 'w-[8%]'},
    ]

    const [stickyForm, setStickForm] = useState(false)
    const [data, setData] = useState([])
    const [sellerName, setSellerName] = useState('')
    const [sellerSurname, setSellerSurname] = useState('')
    const [sellerNumber, setSellerNumber] = useState('')
    const [sellerLogin, setSellerLogin] = useState('')
    const [sellerPassword, setSellerPassword] = useState('')
    const [sellerAgainPassword, setSellerAgainPassword] = useState('')
    const [currentSeller, setCurrentSeller] = useState('')

    const [startDate, setStartDate] = useState(
        new Date(new Date().setDate(new Date().getDate() - 10))
    )
    const [endDate, setEndDate] = useState(new Date())

    // handle Changed inputs
    const addNewSeller = (e) => {
        e && e.preventDefault()
        const {failed, message} = checkEmptyString([
            {
                value: sellerName,
                message: t('Sotuvchi ismi'),
            },
            {
                value: sellerSurname,
                message: t('Sotuvchi familiyasi'),
            },
            {
                value: sellerNumber,
                message: t('Sotuvchi telefon raqami'),
            },
            {
                value: sellerLogin,
                message: t('Sotuvchi logini'),
            },
            {
                value: sellerPassword,
                message: t('Sotuvchi paroli'),
            },
            {
                value: sellerAgainPassword,
                message: t('Sotuvchi parolini tasdiqlash'),
            },
        ])
        if (failed) {
            warningEmptyInput(message)
        } else {
            if (sellerPassword !== sellerAgainPassword) {
                universalToast(
                    t(
                        'Sotuvchining paroli bilan tasdiqlash paroli mos kelmadi'
                    ),
                    'warning'
                )
            } else {
                const body = {
                    login: sellerLogin,
                    firstname: sellerName,
                    lastname: sellerSurname,
                    fathername: user.lastname,
                    phone: sellerNumber,
                    password: sellerPassword,
                    type: 'Seller',
                    user: user._id,
                }
                dispatch(addSeller(body))
            }
        }
    }

    const handleEdit = (e) => {
        e && e.preventDefault()
        const {failed, message} = checkEmptyString([
            {
                value: sellerName,
                message: t('Sotuvchi ismi'),
            },
            {
                value: sellerSurname,
                message: t('Sotuvchi familiyasi'),
            },
            {
                value: sellerNumber,
                message: t('Sotuvchi telefon raqami'),
            },
            {
                value: sellerLogin,
                message: t('Sotuvchi logini'),
            },
            {
                value: sellerPassword,
                message: t('Sotuvchi paroli'),
            },
            {
                value: sellerAgainPassword,
                message: t('Sotuvchi parolini tasdiqlash'),
            },
        ])
        if (failed) {
            warningEmptyInput(message)
        } else {
            if (sellerPassword !== sellerAgainPassword) {
                universalToast(
                    t(
                        'Sotuvchining paroli bilan tasdiqlash paroli mos kelmadi'
                    ),
                    'warning'
                )
            } else {
                const body = {
                    _id: currentSeller._id,
                    login: sellerLogin,
                    firstname: sellerName,
                    lastname: sellerSurname,
                    fathername: user.lastname,
                    phone: sellerNumber,
                    password: sellerPassword,
                    type: 'Seller',
                    user: user._id,
                }
                dispatch(updateSeller(body))
            }
        }
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setSellerName('')
        setSellerSurname('')
        setSellerNumber('')
        setSellerLogin('')
        setSellerPassword('')
        setSellerAgainPassword('')
    }

    const handleEditSeller = (seller) => {
        clearForm()
        setCurrentSeller(seller)
        setStickForm(true)
        setSellerName(seller.firstname)
        setSellerSurname(seller.lastname)
        setSellerNumber(seller.phone)
        setSellerLogin(seller.login)
    }

    const linkToSellerReports = (id) => {
        navigate(`/hamkorlar/sotuvchilar/${id}`)
    }

    useEffect(() => {
        if (errorSellings) {
            universalToast(errorSellings, 'error')
            dispatch(clearErrorSellers())
        }
        if (successAddSelling) {
            successAddSellerMessage()
            dispatch(clearSuccessAddSeller())
            clearForm()
        }
        if (successUpdateSelling) {
            successUpdateSellerMessage()
            dispatch(clearSuccessUpdateSeller())
            setStickForm(false)
            clearForm()
            setCurrentSeller('')
        }
    }, [dispatch, errorSellings, successAddSelling, successUpdateSelling])

    useEffect(() => {
        dispatch(
            getSellers({
                startDate,
                endDate,
            })
        )
    }, [dispatch, startDate, endDate])

    useEffect(() => {
        setData(sellers)
    }, [sellers])

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
            <form
                className={`unitFormStyle  ${
                    stickyForm && 'stickyForm'
                } flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200`}
            >
                <div className='exchangerate-style w-full'>
                    <FieldContainer
                        value={sellerName}
                        onChange={(e) => {
                            setSellerName(e.target.value)
                        }}
                        label={t('Ismi')}
                        placeholder={t('misol: Jasurbek')}
                        maxWidth={'w-[21.75rem]'}
                        type={'text'}
                        border={true}
                        onKeyPress={``}
                    />
                    <FieldContainer
                        value={sellerSurname}
                        onChange={(e) => {
                            setSellerSurname(e.target.value)
                        }}
                        label={t('Familiyasi')}
                        placeholder={t('Toshev')}
                        maxWidth={'w-[21.75rem]'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => {}}
                    />
                    <FieldContainer
                        value={sellerNumber}
                        onChange={(e) => {
                            setSellerNumber(e.target.value)
                        }}
                        label={t('Telefon raqami')}
                        placeholder={'+998 99 123 45 67'}
                        type={'number'}
                        border={false}
                        onKeyPress={() => {}}
                    />
                </div>

                <div className='exchangerate-style mt-[1.25rem]'>
                    <FieldContainer
                        value={sellerLogin}
                        onChange={(e) => {
                            setSellerLogin(e.target.value)
                        }}
                        label={t('Login')}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => {}}
                    />
                    <FieldContainer
                        value={sellerPassword}
                        onChange={(e) => {
                            setSellerPassword(e.target.value)
                        }}
                        label={t('Parol')}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={true}
                        onKeyPress={() => {}}
                    />
                    <FieldContainer
                        value={sellerAgainPassword}
                        onChange={(e) => {
                            setSellerAgainPassword(e.target.value)
                        }}
                        label={t('Parolni tasdiqlash')}
                        placeholder={'123456'}
                        maxWidth={'12.75rem'}
                        type={'text'}
                        border={false}
                        onKeyPress={() => {}}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[19.5rem]'}>
                        <Button
                            onClick={stickyForm ? handleEdit : addNewSeller}
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? t(`Saqlash`)
                                    : t('Yangi sotuvchi qo`shish')
                            }
                        />
                        <Button onClick={clearForm} text={t('Tozalash')} />
                    </div>
                </div>
            </form>
            <div className='font-normal text-[1.25rem] leading-[1.875rem] text-blue-900 mainPadding'>
                <p>{t('Sotuvchilar')}</p>
            </div>
            <div className='flex w-full'>
                <SearchForm
                    filterBy={['startDate', 'endDate']}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : sellers.length === 0 ? (
                    <NotFind text={'Sotuvchilar mavjud emas'} />
                ) : (
                    <Table
                        page={'seller'}
                        data={data}
                        currentPage={0}
                        countPage={10}
                        headers={headers}
                        Edit={handleEditSeller}
                        linkToSellerReports={linkToSellerReports}
                        currency={currencyType}
                    />
                )}
            </div>
        </motion.section>
    )
}

export default Sellers
