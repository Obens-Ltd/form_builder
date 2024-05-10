import { __rest } from "tslib";
import { useState } from 'react';
import cn from 'classnames';
import { IoCloseCircleOutline } from 'react-icons/io5';
export default function TextInput(_a) {
    var id = _a.id, fieldName = _a.fieldName, required = _a.required, _b = _a.variant, variant = _b === void 0 ? 'full' : _b, register = _a.register, error = _a.error, defaultValue = _a.defaultValue, currency = _a.currency, placeholder = _a.placeholder, InputBgColor = _a.InputBgColor, setValue = _a.setValue, readonly = _a.readonly, attributes = __rest(_a, ["id", "fieldName", "required", "variant", "register", "error", "defaultValue", "currency", "placeholder", "InputBgColor", "setValue", "readonly"]);
    var _c = useState(''), inputvalue = _c[0], setInputvalue = _c[1];
    return (<div className={cn(variant === 'full' ? 'col-span-2' : 'col-span-1', 'w-full flex flex-col')}>
      {fieldName &&
            (fieldName.split('\n').length == 1 ? (<label htmlFor={id} className={'block pb-2 text-xs font-semibold text-gray-800'}>
            {fieldName} {required && <span className="text-red-500">*</span>}
          </label>) : (<label htmlFor={id} className={'flex justify-between pb-2 text-xs font-semibold text-gray-800'}>
            <p>{fieldName.split('\n')[0]}</p>
            <p> {fieldName.split('\n')[1]} </p>
          </label>))}
      <div className={cn(InputBgColor, 'flex flex-row ')}>
        <input id={id} type="text" defaultValue={defaultValue} placeholder={placeholder} value={setValue} readOnly={readonly} className={cn(error
            ? 'placeholder-red-300 text-red-400 border-red-300'
            : 'placeholder-gray-500 text-gray-800 border-gray-300', 'w-full border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500 !resize-none disabled:bg-gray-200 disabled:cursor-not-allowed', (attributes.disabled || readonly) && 'cursor-default')} {...attributes} {...register}/>
        {currency && <p className="px-3 py-3">{currency}</p>}
      </div>
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
}
//# sourceMappingURL=TextInput.jsx.map