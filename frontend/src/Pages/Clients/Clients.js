import React, {useEffect, useState} from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'
import SearchForm from '../../Components/SearchForm/SearchForm'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import {motion} from 'framer-motion'
import {filter, map} from 'lodash'
import {
    successAddSupplierMessage,
    successDeleteSupplierMessage,
    successUpdateSupplierMessage,
    warningEmptyInput,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    addClients,
    clearSearchedClients,
    deleteClients,
    getAllPackmans,
    getClients,
    getClientsByFilter,
    updateClients,
} from './clientsSlice'
import {checkEmptyString} from '../../App/globalFunctions.js'
import {useTranslation} from 'react-i18next'

const ClientsPage = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()

    const {packmans, clients, loading, searchedClients, total, totalSearched} =
        useSelector((state) => state.clients)

    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        // {title: t('Agent'), styles: 'w-[41%] text-left'},
        {title: t('Mijoz'), styles: 'w-[41%] text-left'},
        {title: 'Savdo', styles: 'w-[41%] text-left'},
        {title: 'Sof foyda', styles: 'w-[41%] text-left'},
        {title: '', styles: 'w-[8%] text-left'},
    ]

    const [startDate, setStartDate] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        )
    )
    const [endDate, setEndDate] = useState(
        new Date(new Date().setHours(23, 59, 59, 0)).toISOString()
    )

    // states
    const [packmanOptions, setPackmanOptions] = useState([])
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [clientName, setClientName] = useState('')
    const [packman, setPackman] = useState(null)
    const [packmanId, setPackmanId] = useState(null)
    const [currentClient, setCurrentClient] = useState('')
    const [deletedCLients, setDeletedClients] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [stickyForm, setStickyForm] = useState(false)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchByName, setSearchByName] = useState('')
    const [printedSelling, setPrintedSelling] = useState(null)
    const [modalBody, setModalBody] = useState(null)
    // modal toggle
    const toggleModal = () => {
        setModalVisible(!modalVisible)
        setTimeout(() => {
            setDeletedClients(null)
        }, 500)
    }

    // handle change of input
    const handleChangeClientName = (e) => {
        setClientName(e.target.value)
    }
    // table edit and delete
    const handleEditClients = (client) => {
        setPackman(
            client.packman
                ? {label: client.packman.name, value: client.packman._id}
                : ''
        )
        setClientName(client.name || '')
        setCurrentClient(client)
        setStickyForm(true)
    }

    const handleDeleteClient = (client) => {
        setDeletedClients(client)
        setModalBody('approve')
        setModalVisible(true)
    }

    const handlePrint = (sale) => {
        setModalBody('allChecks')
        setPrintedSelling(sale)
        setModalVisible(true)
    }

    const handleClickApproveToDelete = () => {
        const body = {
            name: deletedCLients.name,
            _id: deletedCLients._id,
            packman: deletedCLients.packman,
            currentPage,
            countPage: showByTotal,
            search: {
                client: searchByName.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(deleteClients(body)).then(({error}) => {
            if (!error) {
                clearForm()
                successDeleteSupplierMessage()
            }
        })
        toggleModal()
    }
    // handle submit of inputs
    const addNewClients = (e) => {
        e.preventDefault()
        const {failed, message} = checkEmptyString([
            {
                value: clientName,
                message: t('Mijoz ismi'),
            },
        ])
        if (failed) {
            warningEmptyInput(message)
        } else {
            const body = {
                name: clientName,
                packman: (packman && packman.value) || null,
                currentPage,
                countPage: showByTotal,
                search: {
                    client: searchByName.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(addClients(body)).then(({error}) => {
                if (!error) {
                    clearForm()
                    successAddSupplierMessage()
                }
            })
        }
    }

    const handleEdit = (e) => {
        e.preventDefault()
        const {failed, message} = checkEmptyString([
            {
                value: clientName,
                message: t('Mijoz ismi'),
            },
        ])
        if (failed) {
            warningEmptyInput(message)
        } else {
            const body = {
                name: clientName,
                _id: currentClient._id,
                packman: (packman && packman.value) || null,
                currentPage,
                countPage: showByTotal,
                search: {
                    client: searchByName.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(updateClients(body)).then(({error}) => {
                if (!error) {
                    clearForm()
                    successUpdateSupplierMessage()
                }
            })
        }
    }

    const clearForm = (e) => {
        e && e.preventDefault()
        setClientName('')
        setPackman(null)
        setStickyForm(false)
    }

    // filter by packman
    const filterByPackman = ({value}) => {
        setPackmanId(value)
    }

    // filter by total
    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }

    // handle change of search inputs
    const filterByClientName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setSearchByName(val)
        if (searchedData.length > 0 || totalSearched > 0)
            dispatch(clearSearchedClients())
        if (valForSearch === '') {
            setData(clients)
            setFilteredDataTotal(total)
        } else {
            const filteredClients = filter(clients, (client) => {
                return client.name.toLowerCase().includes(valForSearch)
            })
            setData(filteredClients)
            setFilteredDataTotal(filteredClients.length)
        }
    }

    const filterByNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            const body = {
                currentPage,
                countPage: showByTotal,
                search: {
                    client: searchByName.replace(/\s+/g, ' ').trim(),
                },
            }
            dispatch(getClientsByFilter(body))
        }
    }

    const handleChangeOptions = (e) => {
        setPackman(e)
    }

    useEffect(() => {
        dispatch(getAllPackmans())
    }, [dispatch])

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            startDate,
            endDate,
            search: {
                client: searchByName.replace(/\s+/g, ' ').trim(),
                packman: packmanId,
            },
        }
        dispatch(getClients(body))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, showByTotal, currentPage, startDate, endDate, packmanId])
    useEffect(() => {
        setData(clients)
    }, [clients])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    useEffect(() => {
        setSearchedData(searchedClients)
    }, [searchedClients])
    useEffect(() => {
        const options = map(packmans, (packman) => {
            return {label: packman.name, value: packman._id}
        })
        setPackmanOptions(options)
    }, [packmans])

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
            <UniversalModal
                headerText={`${deletedCLients && deletedCLients.name} ${t(
                    'ismli mijozni o`chirishni tasdiqlaysizmi?'
                )}`}
                title={t('O`chirilgan mijozni tiklashning imkoni mavjud emas!')}
                toggleModal={toggleModal}
                body={modalBody}
                approveFunction={handleClickApproveToDelete}
                isOpen={modalVisible}
                printedSelling={printedSelling}
            />
            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                    stickyForm && 'stickyForm'
                }`}
            >
                <div className='supplier-style'>
                    <FieldContainer
                        value={packman}
                        onChange={handleChangeOptions}
                        label={t('Agentni tanlang')}
                        placeholder={t('misol: Dilso`z')}
                        select={true}
                        options={packmanOptions}
                        maxWidth={'w-[21rem]'}
                        border={true}
                    />

                    <FieldContainer
                        value={clientName}
                        label={t('Mijoz ismi')}
                        placeholder={t('misol: Navro`z')}
                        maxWidth={'w-[21rem]'}
                        type={'string'}
                        onChange={handleChangeClientName}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[18.3125rem]'}>
                        <Button
                            add={!stickyForm}
                            edit={stickyForm}
                            text={
                                stickyForm
                                    ? t(`Saqlash`)
                                    : t('Yangi agent qo`shish')
                            }
                            onClick={stickyForm ? handleEdit : addNewClients}
                        />
                        <Button onClick={clearForm} text={t('Tozalash')} />
                    </div>
                </div>
            </form>

            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>{t('Mijozlar')}</p>
                {(filteredDataTotal !== 0 || totalSearched !== 0) && (
                    <Pagination
                        countPage={Number(showByTotal)}
                        totalDatas={totalSearched || filteredDataTotal}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
            <SearchForm
                filterBy={[
                    'total',
                    'startDate',
                    'endDate',
                    'clientName',
                    'select',
                ]}
                filterByPackman={filterByPackman}
                filterByTotal={filterByTotal}
                filterByClientNameWhenPressEnter={filterByNameWhenPressEnter}
                filterByDelivererNameWhenPressEnter={filterByNameWhenPressEnter}
                searchByClientName={searchByName}
                filterByClientName={filterByClientName}
                startDate={startDate}
                endDate={new Date(endDate)}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                searchByPackmans={[
                    {
                        label: 'Barchasi',
                        value: null,
                    },
                    ...packmanOptions,
                ]}
            />

            <div className='tableContainerPadding'>
                {loading ? (
                    <Spinner />
                ) : data.length === 0 && searchedData.length === 0 ? (
                    <NotFind text={t('Mijozlar mavjud emas')} />
                ) : (
                    <Table
                        data={searchedData.length > 0 ? searchedData : data}
                        page={'client'}
                        currentPage={currentPage}
                        countPage={showByTotal}
                        headers={headers}
                        Edit={handleEditClients}
                        Delete={handleDeleteClient}
                        Print={handlePrint}
                    />
                )}
            </div>
        </motion.section>
    )
}

export default ClientsPage
