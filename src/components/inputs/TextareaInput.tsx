import cn from 'classnames';
import { FieldErrorsImpl, FieldError } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
interface TextareaInputProps {
  id: string;
  fieldName: string;
  required?: boolean;
  variant?: 'small' | 'full';
  register?: any;
  error?: FieldErrorsImpl | FieldError;

  [x: string]: any;
}

export default function TextareaInput({
  id,
  fieldName,
  required,
  variant = 'full',

  register,
  error,
  ...attributes
}: TextareaInputProps) {
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
      <textarea
        id={id}
        rows={4}
        className={cn(
          error
            ? 'placeholder-red-300 text-red-400 border-red-300'
            : 'placeholder-gray-500 text-gray-800 border-gray-300',
          'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500 min-h-[8rem]',
          {
            'cursor-default': attributes.disabled || attributes.readOnly,
          },
        )}
        {...attributes}
        {...register}
      />
      {error && (
        <div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error?.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0" />
        </div>
      )}
    </div>
  );
}
