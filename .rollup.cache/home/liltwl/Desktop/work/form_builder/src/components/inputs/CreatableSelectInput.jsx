import { __rest } from "tslib";
import cn from 'classnames';
import { IoCloseCircleOutline } from 'react-icons/io5';
import CustomSelect from 'react-select/creatable';
import { selectStylesWithError } from '@utils/select.helper';
export default function CreatableSelectInput(_a) {
    var id = _a.id, fieldName = _a.fieldName, required = _a.required, _b = _a.variant, variant = _b === void 0 ? 'full' : _b, isMulti = _a.isMulti, _c = _a.isHarvets, isHarvets = _c === void 0 ? false : _c, register = _a.register, error = _a.error, attributes = __rest(_a, ["id", "fieldName", "required", "variant", "isMulti", "isHarvets", "register", "error"]);
    return (<div className={cn(variant === 'full' ? 'col-span-2' : 'col-span-1', 'w-full flex flex-col')}>
      <label htmlFor={id} className="block pb-2 text-xs font-semibold text-gray-800">
        {fieldName} {required && <span className="text-red-500">*</span>}
      </label>
      <CustomSelect id={id} {...attributes} classNamePrefix="obens-select" onChange={function (tags) {
            var _a;
            var event = { target: { name: register.name, value: '' } };
            event.target.value = Array.isArray(tags)
                ? JSON.stringify(tags || [])
                : isHarvets
                    ? tags
                    : (_a = tags === null || tags === void 0 ? void 0 : tags.value) !== null && _a !== void 0 ? _a : '';
            register.onChange(event);
        }} styles={selectStylesWithError(error)} isMulti={isMulti}/>
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error?.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
}
//# sourceMappingURL=CreatableSelectInput.jsx.map