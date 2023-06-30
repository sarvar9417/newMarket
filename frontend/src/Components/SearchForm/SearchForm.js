import SearchInput from '../Inputs/SearchInput.js'
import SelectForm from '../Select/SelectForm.js'
import FilterButtons from '../FilterButtons/FilterButtons.js'
import FieldContainer from '../FieldContainer/FieldContainer.js'
import PrintBtn from '../Buttons/PrintBtn.js'
import {ConfirmBtn} from '../Buttons/SaveConfirmBtn.js'
import Dates from '../Dates/Dates.js'
import {useTranslation} from 'react-i18next'
import {map} from 'lodash'
import SelectInput from '../SelectInput/SelectInput.js'

function SearchForm({
    filterByPackman,
    searchByPackmans,
    filterByTotal,
    searchByCode,
    searchById,
    searchByDelivererName,
    filterByDelivererName,
    filterByDelivererNameWhenPressEnter,
    searchByClientName,
    filterByClientName,
    filterByClientNameWhenPressEnter,
    filterById,
    filterByIdWhenPressEnter,
    filterByCode,
    filterByCodeAndNameAndCategoryWhenPressEnter,
    searchByName,
    filterByName,
    filterBy,
    searchByCategory,
    filterByCategory,
    numberOfChecks,
    setNumberOfChecks,
    clickPrintBtn,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    date,
    setDate,
    clickConfirmBtn,
    barcode,
    filterByBarcode,
    filterByBarcodeWhenPressEnter,
    searchByDirectorName,
    filterByDirectorName,
    filterByDirectorNameWhenPressEnter,
    searchByMarketName,
    filterByMarketName,
    searchBySellerName,
    filterBySellerName,
    filterBySellerNameWhenPressEnter,
    searchByMarketInn,
    filterByMarketInn,
    filterByMarketInnWhenPressEnter,
    filterByMarketNameWhenPressEnter,
}) {
    const {t} = useTranslation(['common'])
    const chooseComponent = (key) => {
        switch (key) {
            case 'total':
                return <SelectForm key={'total_1'} onSelect={filterByTotal} />
            case 'category':
                return (
                    <FilterButtons
                        key={'category_1'}
                        label={t('Kategoriya')}
                        element={
                            <FieldContainer
                                placeholder={`${t('misol')}: 000000`}
                                type={'text'}
                                value={searchByCategory}
                                onChange={filterByCategory}
                                maxWidth={'w-[6.8125rem]'}
                                onKeyUp={
                                    filterByCodeAndNameAndCategoryWhenPressEnter
                                }
                            />
                        }
                    />
                )
            case 'code':
                return (
                    <FilterButtons
                        key={'code_1'}
                        label={t('Maxsulot kodi')}
                        element={
                            <FieldContainer
                                placeholder={`${t('misol')}: 000000`}
                                type={'text'}
                                maxWidth={'flex-1'}
                                value={searchByCode}
                                onChange={filterByCode}
                                onKeyUp={
                                    filterByCodeAndNameAndCategoryWhenPressEnter
                                }
                            />
                        }
                    />
                )
            case 'id':
                return (
                    <FilterButtons
                        key={'id_1'}
                        label={t('ID')}
                        element={
                            <FieldContainer
                                placeholder={t('misol: 101')}
                                type={'text'}
                                maxWidth={'w-[6.8125rem]'}
                                value={searchById}
                                onChange={filterById}
                                onKeyUp={filterByIdWhenPressEnter}
                            />
                        }
                    />
                )
            case 'name':
                return (
                    <SearchInput
                        key={'search_1'}
                        placeholder={t('qidirish...')}
                        someClasses={'grow'}
                        value={searchByName}
                        onChange={filterByName}
                        onKeyUp={filterByCodeAndNameAndCategoryWhenPressEnter}
                    />
                )
            case 'delivererName':
                return (
                    <SearchInput
                        key={'yetkazuvchi_ismi_1'}
                        placeholder={t('yetkazuvchi ismi...')}
                        someClasses={'grow'}
                        value={searchByDelivererName}
                        onChange={filterByDelivererName}
                        onKeyUp={filterByDelivererNameWhenPressEnter}
                    />
                )
            case 'clientName':
                return (
                    <SearchInput
                        key={'mijoz_ismi_1'}
                        placeholder={t('mijoz ismi...')}
                        someClasses={'grow basis-1/6'}
                        value={searchByClientName}
                        onChange={filterByClientName}
                        onKeyUp={filterByClientNameWhenPressEnter}
                    />
                )
            case 'sellerName':
                return (
                    <SearchInput
                        key={'sotuvchi_ismi_1'}
                        placeholder={t('sotuvchi ismi...')}
                        someClasses={'grow basis-1/6'}
                        value={searchBySellerName}
                        onChange={filterBySellerName}
                        onKeyUp={filterBySellerNameWhenPressEnter}
                    />
                )
            case 'checks':
                return (
                    <FilterButtons
                        key={'cheklar_soni_1'}
                        label={t('Cheklar soni')}
                        element={
                            <FieldContainer
                                placeholder={t('misol: 101')}
                                type={'text'}
                                maxWidth={'flex-1'}
                                value={numberOfChecks}
                                onChange={setNumberOfChecks}
                            />
                        }
                    />
                )
            case 'printBtn':
                return <PrintBtn key={'print_btn_1'} onClick={clickPrintBtn} />
            case 'startDate':
                return (
                    <FilterButtons
                        key={'start_date_1'}
                        label={t('Boshlang`ich sana')}
                        element={
                            <Dates
                                value={startDate}
                                onChange={setStartDate}
                                placeholder={'01.01.2021'}
                                maxWidth={'w-[6.625rem]'}
                            />
                        }
                    />
                )
            case 'endDate':
                return (
                    <FilterButtons
                        key={'end_date_1'}
                        label={t('Tugash sana')}
                        element={
                            <Dates
                                value={endDate}
                                onChange={setEndDate}
                                placeholder={'05.06.2022'}
                                maxWidth={'w-[6.625rem]'}
                            />
                        }
                    />
                )
            case 'singleDate':
                return (
                    <FilterButtons
                        key={'single_date_1'}
                        label={t('Sanani tanlang')}
                        element={
                            <Dates
                                value={date}
                                onChange={setDate}
                                placeholder={t('misol: 02.02.2022')}
                                maxWidth={'w-[9.6875rem]'}
                            />
                        }
                    />
                )
            case 'confirmBtn':
                return (
                    <ConfirmBtn
                        key={'confirm_btn_1'}
                        text={t('Yakunlash')}
                        onClick={clickConfirmBtn}
                    />
                )
            case 'barcode':
                return (
                    <FilterButtons
                        key={'barcode_1'}
                        label={t('Shtrix kodi')}
                        element={
                            <FieldContainer
                                placeholder={t('misol: 101')}
                                type={'text'}
                                value={barcode}
                                onChange={filterByBarcode}
                                maxWidth={'flex-1'}
                                onKeyUp={filterByBarcodeWhenPressEnter}
                            />
                        }
                    />
                )
            case 'directorName':
                return (
                    <SearchInput
                        key={'director_name_1'}
                        value={searchByDirectorName}
                        onChange={filterByDirectorName}
                        placeholder={'Direktor ismi yoki familyasi...'}
                        someClasses={'grow'}
                        onKeyUp={filterByDirectorNameWhenPressEnter}
                    />
                )
            case 'marketName':
                return (
                    <SearchInput
                        key={'market_name_1'}
                        value={searchByMarketName}
                        onChange={filterByMarketName}
                        placeholder={"Do'kon nomi..."}
                        someClasses={'grow'}
                        onKeyUp={filterByMarketNameWhenPressEnter}
                    />
                )
            case 'inn':
                return (
                    <SearchInput
                        key={'market_inn_1'}
                        value={searchByMarketInn}
                        onChange={filterByMarketInn}
                        placeholder={"Do'kon INN si..."}
                        someClasses={'grow'}
                        onKeyUp={filterByMarketInnWhenPressEnter}
                    />
                )
            case 'select':
                return (
                    <SelectInput
                        placeholder={'Yetkazib beruvchi'}
                        onSelect={filterByPackman}
                        options={searchByPackmans}
                    />
                )
            default:
                return null
        }
    }
    return (
        <div className='flex items-end gap-[1.5rem] mainPadding grow'>
            {map(filterBy, (key) => chooseComponent(key))}
        </div>
    )
}

export default SearchForm
