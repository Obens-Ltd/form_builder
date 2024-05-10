import cn from 'classnames';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
import CustomSelect from 'react-select/creatable';

import { selectStylesWithError } from '@utils/select.helper';

interface CreatableSelectInputProps {
  id: string;
  fieldName: string;
  required?: boolean;
  variant?: 'small' | 'full';
  isHarvets?: boolean;
  isMulti?: boolean;
  register?: any;
  error?: FieldError | FieldErrorsImpl;

  [x: string]: any;
}

export default function CreatableSelectInput({
  id,
  fieldName,
  required,
  variant = 'full',

  isMulti,
  isHarvets = false,
  register,
  error,
  ...attributes
}: CreatableSelectInputProps) {
  return (
    <div
      className={cn(
        variant === 'full' ? 'col-span-2' : 'col-span-1',
        'w-full flex flex-col',
      )}
    >
      <label
        htmlFor={id}
        className="block pb-2 text-xs font-semibold text-gray-800"
      >
        {fieldName} {required && <span className="text-red-500">*</span>}
      </label>
      <CustomSelect
        id={id}
        {...attributes}
        classNamePrefix="obens-select"
        onChange={(tags: any) => {
          const event = { target: { name: register.name, value: '' } };

          event.target.value = Array.isArray(tags)
            ? JSON.stringify(tags || [])
            : isHarvets
              ? tags
              : tags?.value ?? '';

          register.onChange(event);
        }}
        styles={selectStylesWithError(error)}
        isMulti={isMulti}
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
