import cx from 'classnames';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  id: string;
  type: string;
  register?: any;
  error?: FieldError | FieldErrorsImpl;
  horizontal?: boolean;
  labelClassNames?: string;
  inputClassNames?: string;
  isEditable?: boolean;
  attributes?: any;
  required?: boolean;
  dateFormat?: string;
}

const InputField = ({
  label,
  hideLabel,
  id,
  type,
  register,
  error,
  horizontal,
  isEditable = true,
  labelClassNames,
  inputClassNames,
  required,
  dateFormat,
  ...attributes
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label
        className={cx(
          'py-1 text-gray-800 text-sm font-semibold min-w-max',
          labelClassNames,
          hideLabel === true ? 'h-0 py-0' : '', // this a hack that allows you to hide labels while maintaining the same width of the input
        )}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        className={cx(
          cx(
            'w-full  max-w-md p-2 border text-gray-800 border-gray-300 rounded-sm focus:border-primary-500',
            inputClassNames,
          ),
          !isEditable ? 'bg-gray-100' : '',
        )}
        id={id}
        type={type}
        dateFormat={dateFormat}
        disabled={!isEditable}
        min={0}
        {...attributes}
        {...register}
      />
      {error && (
        <div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{error.message}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0" />
        </div>
      )}
    </div>
  );
};

export default InputField;
