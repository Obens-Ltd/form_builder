import { __rest } from "tslib";
import cn from 'classnames';
import { IoCloseCircleOutline } from 'react-icons/io5';
import CustomSelect from 'react-select';
import { selectStylesWithError, supplySelectStylesWithError, } from '@utils/select.helper';
export default function SelectInput(_a) {
    var id = _a.id, fieldName = _a.fieldName, labelClassName = _a.labelClassName, required = _a.required, _b = _a.variant, variant = _b === void 0 ? 'full' : _b, defaultValue = _a.defaultValue, _c = _a.isSearchable, isSearchable = _c === void 0 ? false : _c, isMulti = _a.isMulti, register = _a.register, _d = _a.isEditable, isEditable = _d === void 0 ? true : _d, onInputChange = _a.onInputChange, error = _a.error, SupplyMapping = _a.SupplyMapping, attributes = __rest(_a, ["id", "fieldName", "labelClassName", "required", "variant", "defaultValue", "isSearchable", "isMulti", "register", "isEditable", "onInputChange", "error", "SupplyMapping"]);
    var stylesHelper;
    if (SupplyMapping) {
        stylesHelper = supplySelectStylesWithError(error);
    }
    else {
        stylesHelper = selectStylesWithError(error);
    }
    return (<div className={cn(variant === 'full' ? 'col-span-2' : 'col-span-1', 'w-full flex flex-col')}>
      {fieldName &&
            (fieldName.split('\n').length == 1 ? (<label htmlFor={id} className={cn('block pb-2 font-semibold text-gray-800 text-xs', labelClassName)}>
            {fieldName} {required && <span className="text-red-500">*</span>}
          </label>) : (<label htmlFor={id} className={cn('flex justify-between pb-2 text-xs font-semibold text-gray-800', labelClassName)}>
            <p>{fieldName.split('\n')[0]}</p>
            <p> {fieldName.split('\n')[1]} </p>
          </label>))}
      <CustomSelect id={id} isDisabled={!isEditable} isSearchable={isSearchable} defaultValue={defaultValue} onInputChange={onInputChange
            ? function (value) {
                onInputChange(value);
            }
            : undefined} {...attributes} classNamePrefix="obens-select" onChange={function (tags) {
            var _a, _b, _c;
            var event = { target: { name: register === null || register === void 0 ? void 0 : register.name, value: '' } };
            if (Array.isArray(tags))
                event.target.value = ((_a = tags === null || tags === void 0 ? void 0 : tags.map(function (e) { return e.value; })) === null || _a === void 0 ? void 0 : _a.join(',')) || '';
            else
                event.target.value = tags === null || tags === void 0 ? void 0 : tags.value;
            (_b = register === null || register === void 0 ? void 0 : register.onChange) === null || _b === void 0 ? void 0 : _b.call(register, event);
            (_c = attributes === null || attributes === void 0 ? void 0 : attributes.onChange) === null || _c === void 0 ? void 0 : _c.call(attributes, event);
        }} styles={stylesHelper} isMulti={isMulti}/>
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error?.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
}
//# sourceMappingURL=SelectInput.jsx.map