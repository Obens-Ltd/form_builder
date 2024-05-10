import { __rest } from "tslib";
import cx from 'classnames';
import { IoCloseCircleOutline } from 'react-icons/io5';
var InputField = function (_a) {
    var label = _a.label, hideLabel = _a.hideLabel, id = _a.id, type = _a.type, register = _a.register, error = _a.error, horizontal = _a.horizontal, _b = _a.isEditable, isEditable = _b === void 0 ? true : _b, labelClassNames = _a.labelClassNames, inputClassNames = _a.inputClassNames, required = _a.required, dateFormat = _a.dateFormat, attributes = __rest(_a, ["label", "hideLabel", "id", "type", "register", "error", "horizontal", "isEditable", "labelClassNames", "inputClassNames", "required", "dateFormat"]);
    return (<div className="flex flex-col">
      <label className={cx('py-1 text-gray-800 text-sm font-semibold min-w-max', labelClassNames, hideLabel === true ? 'h-0 py-0' : '')}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input className={cx(cx('w-full  max-w-md p-2 border text-gray-800 border-gray-300 rounded-sm focus:border-primary-500', inputClassNames), !isEditable ? 'bg-gray-100' : '')} id={id} type={type} dateFormat={dateFormat} disabled={!isEditable} min={0} {...attributes} {...register}/>
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
};
export default InputField;
//# sourceMappingURL=InputField.jsx.map