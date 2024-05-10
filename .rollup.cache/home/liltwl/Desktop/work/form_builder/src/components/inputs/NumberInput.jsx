import { __rest } from "tslib";
import cn from 'classnames';
import { IoCloseCircleOutline } from 'react-icons/io5';
export default function NumberInput(_a) {
    var id = _a.id, fieldName = _a.fieldName, required = _a.required, _b = _a.variant, variant = _b === void 0 ? 'full' : _b, register = _a.register, _c = _a.value, value = _c === void 0 ? 0 : _c, error = _a.error, attributes = __rest(_a, ["id", "fieldName", "required", "variant", "register", "value", "error"]);
    return (<div className={cn(variant === 'full' ? 'col-span-2' : 'col-span-1', 'w-full flex flex-col')}>
      <label htmlFor={id} className="block pb-2 text-xs font-semibold text-gray-800">
        {fieldName} {required && <span className="text-red-500">*</span>}
      </label>
      <input type="number" id={id} 
    // value={value}
    {...attributes} className={cn(error
            ? 'placeholder-red-300 text-red-400 border-red-300'
            : 'placeholder-gray-500 text-gray-800 border-gray-300', 'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500', attributes.className)} {...register}/>
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
}
//# sourceMappingURL=NumberInput.jsx.map