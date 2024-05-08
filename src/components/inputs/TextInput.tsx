import { useState } from 'react';

import cn from 'classnames';
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface TextInputProps {
  id: string;
  fieldName?: string;
  required?: boolean;
  variant?: 'small' | 'full';
  register?: any;
  error?: Merge<
    FieldError,
    Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>>[]
  >;
  InputBgColor?: string;

  [x: string]: any;
}

export default function TextInput({
  id,
  fieldName,
  required,
  variant = 'full',
  register,
  error,
  defaultValue,
  currency,
  placeholder,
  InputBgColor,
  setValue,
  readonly,
  ...attributes
}: TextInputProps) {
  const [inputvalue, setInputvalue] = useState('');

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
            className={'block pb-2 text-xs font-semibold text-gray-800'}
          >
            {fieldName} {required && <span className="text-red-500">*</span>}
          </label>
        ) : (
          <label
            htmlFor={id}
            className={
              'flex justify-between pb-2 text-xs font-semibold text-gray-800'
            }
          >
            <p>{fieldName.split('\n')[0]}</p>
            <p> {fieldName.split('\n')[1]} </p>
          </label>
        ))}
      <div className={cn(InputBgColor, 'flex flex-row ')}>
        <input
          id={id}
          type="text"
          defaultValue={defaultValue}
          placeholder={placeholder}
          value={setValue}
          readOnly={readonly}
          className={cn(
            error
              ? 'placeholder-red-300 text-red-400 border-red-300'
              : 'placeholder-gray-500 text-gray-800 border-gray-300',
            'w-full border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500 !resize-none disabled:bg-gray-200 disabled:cursor-not-allowed',
            (attributes.disabled || readonly) && 'cursor-default',
          )}
          {...attributes}
          {...register}
        />
        {currency && <p className="px-3 py-3">{currency}</p>}
      </div>
      {error && (
        <div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{error.message}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0" />
        </div>
      )}
    </div>
  );
}
