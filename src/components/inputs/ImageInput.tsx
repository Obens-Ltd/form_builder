import { useState } from 'react';

import cn from 'classnames';
import { FieldError } from 'react-hook-form';
import { IoAttachOutline, IoCloseCircleOutline } from 'react-icons/io5';

interface ImageInputProps {
  id: string;
  fieldName: string;
  required?: boolean;
  variant?: 'small' | 'full';
  register?: any;
  error?: FieldError;

  [x: string]: any;
}

export default function ImageInput({
  id,
  fieldName,
  required,
  variant = 'full',

  register,
  error,
  ...attributes
}: ImageInputProps) {
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
      {attributes.defaultFile ? (
        <>
          {isEditMode ? (
            <input
              type="file"
              accept="image/*"
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
          ) : (
            <div
              className={cn(
                'placeholder-gray-500 text-gray-800 border-gray-300',
                'border w-full px-3 py-3 bg-transparent rounded text-xs focus:outline-none focus:border-primary-500 flex flex-row items-center',
              )}
            >
              <IoAttachOutline className="inline-block w-5 h-5 mr-2" />
              {attributes.defaultFile?.url ? (
                <span
                  className="cursor-pointer line-clamp-1 hover:underline"
                  onClick={() =>
                    window.open(attributes.defaultFile?.url, '_blank')
                  }
                >
                  {attributes.defaultFile?.url}
                </span>
              ) : (
                <span className="cursor-pointer text-primary-400 hover:text-primary-600 line-clamp-1">
                  Document à joindre
                </span>
              )}
              <div
                onClick={() => setIsEditMode(!isEditMode)}
                className="flex items-center self-end justify-center px-4 py-1 ml-auto text-xs leading-none border cursor-pointer text-primary-500 rounded-md border-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300"
              >
                Edit
              </div>
            </div>
          )}
        </>
      ) : (
        <input
          type="file"
          accept="image/*"
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
