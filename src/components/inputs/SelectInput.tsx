import cn from 'classnames';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
import CustomSelect from 'react-select';

import {
  selectStylesWithError,
  supplySelectStylesWithError,
} from '@utils/select.helper';

interface SelectInputProps {
  id: string;
  fieldName?: string;
  labelClassName?: string;
  required?: boolean;
  variant?: 'small' | 'full';
  isMulti?: boolean;
  defaultValue?: any;
  isEditable?: boolean;
  isSearchable?: boolean;
  register?: any;
  onInputChange?: (value: string) => void;
  error?: FieldError | FieldErrorsImpl;
  SupplyMapping?: boolean;

  [x: string]: any;
}

export default function SelectInput({
  id,
  fieldName,
  labelClassName,
  required,
  variant = 'full',
  defaultValue,
  isSearchable = false,
  isMulti,
  register,
  isEditable = true,
  onInputChange,
  error,
  SupplyMapping,
  ...attributes
}: SelectInputProps) {
  let stylesHelper;
  if (SupplyMapping) {
    stylesHelper = supplySelectStylesWithError(error);
  } else {
    stylesHelper = selectStylesWithError(error);
  }
  return (
    <div
      className={cn(
        variant === 'full' ? 'col-span-2' : 'col-span-1',
        'w-full flex flex-col',
      )}
    >
      {fieldName &&
        (fieldName.split('\n').length == 1 ? (
          <label
            htmlFor={id}
            className={cn(
              'block pb-2 font-semibold text-gray-800 text-xs',
              labelClassName,
            )}
          >
            {fieldName} {required && <span className="text-red-500">*</span>}
          </label>
        ) : (
          <label
            htmlFor={id}
            className={cn(
              'flex justify-between pb-2 text-xs font-semibold text-gray-800',
              labelClassName,
            )}
          >
            <p>{fieldName.split('\n')[0]}</p>
            <p> {fieldName.split('\n')[1]} </p>
          </label>
        ))}
      <CustomSelect
        id={id}
        isDisabled={!isEditable}
        isSearchable={isSearchable}
        defaultValue={defaultValue}
        onInputChange={
          onInputChange
            ? (value) => {
                onInputChange(value);
              }
            : undefined
        }
        {...attributes}
        classNamePrefix="obens-select"
        onChange={(tags: any) => {
          const event = { target: { name: register?.name, value: '' } };
          if (Array.isArray(tags))
            event.target.value = tags?.map((e) => e.value)?.join(',') || '';
          else event.target.value = tags?.value;

          register?.onChange?.(event);
          attributes?.onChange?.(event);
        }}
        styles={stylesHelper}
        isMulti={isMulti}
      />
      {error && (
        <div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{error?.message}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0" />
        </div>
      )}
    </div>
  );
}
