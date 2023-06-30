import Input from '../Inputs/Input'
import SelectInput from '../SelectInput/SelectInput'

function FieldContainer({
    star,
    maxWidth,
    value,
    onChange,
    label,
    placeholder,
    type,
    select,
    disabled,
    options,
    border,
    onKeyUp,
    autoComplete,
}) {
    return (
        <div
            className={
                maxWidth
                    ? `${maxWidth} ${
                          border
                              ? 'border-r-[1px] border-r-blue-100 pr-[1.25rem]'
                              : ''
                      }`
                    : 'grow'
            }
        >
            {select ? (
                <SelectInput
                    placeholder={placeholder}
                    onSelect={onChange}
                    label={label}
                    isDisabled={disabled}
                    options={options}
                    value={value}
                />
            ) : (
                <Input
                    star={star}
                    type={type || 'text'}
                    value={value}
                    onChange={onChange}
                    label={label}
                    placeholder={placeholder}
                    onKeyUp={onKeyUp}
                    disabled={disabled}
                    autoComplete={autoComplete}
                />
            )}
        </div>
    )
}

export default FieldContainer
