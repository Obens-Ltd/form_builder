import { useState } from 'react';

import cn from 'classnames';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import { IoAttachOutline, IoCloseCircleOutline } from 'react-icons/io5';

interface FileInputProps {
  id: string;
  fieldName?: string;
  required?: boolean;
  variant?: 'small' | 'full';
  isEditable?: boolean;
  register?: any;
  error?: FieldError | FieldErrorsImpl;

  [x: string]: any;
}

export default function FileInput({
  id,
  fieldName,
  required,
  variant = 'full',
  isEditable = true,

  register,
  error,
  ...attributes
}: FileInputProps) {
  const [isEditMode, setIsEditMode] = useState(false);
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
            className={'block pb-2 text-sm font-semibold text-gray-800'}
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
      {attributes.defaultFile ? (
        <>
          {isEditMode ? (
            <input
              type="file"
              id={id}
              className={cn(
                error
                  ? 'placeholder-red-300 text-red-400 border-red-300'
                  : 'placeholder-gray-500 text-gray-800 border-gray-300',
                'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500 h-[46px] w-full flex items-center',
              )}
              {...attributes}
              {...register}
            />
          ) : (
            <div
              className={cn(
                'placeholder-gray-500 text-gray-800 border-gray-300',
                'border w-full px-3 py-3 bg-transparent rounded text-xs focus:outline-none focus:border-primary-500 flex flex-row items-center',
              )}
            >
              <IoAttachOutline className="inline-block w-5 h-5 mr-2" />
              {attributes.defaultFile?.name || attributes.defaultFile?.url ? (
                <span
                  className="pr-2 truncate cursor-pointer line-clamp-1 hover:underline"
                  onClick={() =>
                    window.open(attributes.defaultFile?.url, '_blank')
                  }
                >
                  <p className="truncate">
                    {attributes.defaultFile?.name ||
                      attributes.defaultFile?.url}
                  </p>
                </span>
              ) : (
                <span className="cursor-pointer text-primary-400 hover:text-primary-600 line-clamp-1">
                  Document à joindre
                </span>
              )}
              {isEditable && (
                <div
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="flex items-center self-end justify-center px-4 py-1 ml-auto text-xs leading-none border cursor-pointer text-primary-500 rounded-md border-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                >
                  Edit
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <input
          type="file"
          id={id}
          className={cn(
            error
              ? 'placeholder-red-300 text-red-400 border-red-300'
              : 'placeholder-gray-500 text-gray-800 border-gray-300',
            'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500',
          )}
          {...attributes}
          {...register}
        />
      )}
      {error && (
        <div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{error.message}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0" />
        </div>
      )}
    </div>
  );
}
