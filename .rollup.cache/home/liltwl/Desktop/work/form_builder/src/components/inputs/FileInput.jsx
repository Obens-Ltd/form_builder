import { __rest } from "tslib";
import { useState } from 'react';
import cn from 'classnames';
import { IoAttachOutline, IoCloseCircleOutline } from 'react-icons/io5';
export default function FileInput(_a) {
    var _b, _c, _d, _e;
    var id = _a.id, fieldName = _a.fieldName, required = _a.required, _f = _a.variant, variant = _f === void 0 ? 'full' : _f, _g = _a.isEditable, isEditable = _g === void 0 ? true : _g, register = _a.register, error = _a.error, attributes = __rest(_a, ["id", "fieldName", "required", "variant", "isEditable", "register", "error"]);
    var _h = useState(false), isEditMode = _h[0], setIsEditMode = _h[1];
    return (<div className={cn(variant === 'full' ? 'col-span-2' : 'col-span-1', 'w-full flex flex-col')}>
      {fieldName &&
            (fieldName.split('\n').length == 1 ? (<label htmlFor={id} className={'block pb-2 text-sm font-semibold text-gray-800'}>
            {fieldName} {required && <span className="text-red-500">*</span>}
          </label>) : (<label htmlFor={id} className={'flex justify-between pb-2 text-xs font-semibold text-gray-800'}>
            <p>{fieldName.split('\n')[0]}</p>
            <p> {fieldName.split('\n')[1]} </p>
          </label>))}
      {attributes.defaultFile ? (<>
          {isEditMode ? (<input type="file" id={id} className={cn(error
                    ? 'placeholder-red-300 text-red-400 border-red-300'
                    : 'placeholder-gray-500 text-gray-800 border-gray-300', 'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500 h-[46px] w-full flex items-center')} {...attributes} {...register}/>) : (<div className={cn('placeholder-gray-500 text-gray-800 border-gray-300', 'border w-full px-3 py-3 bg-transparent rounded text-xs focus:outline-none focus:border-primary-500 flex flex-row items-center')}>
              <IoAttachOutline className="inline-block w-5 h-5 mr-2"/>
              {((_b = attributes.defaultFile) === null || _b === void 0 ? void 0 : _b.name) || ((_c = attributes.defaultFile) === null || _c === void 0 ? void 0 : _c.url) ? (<span className="pr-2 truncate cursor-pointer line-clamp-1 hover:underline" onClick={function () { var _a; return window.open((_a = attributes.defaultFile) === null || _a === void 0 ? void 0 : _a.url, '_blank'); }}>
                  <p className="truncate">
                    {((_d = attributes.defaultFile) === null || _d === void 0 ? void 0 : _d.name) ||
                        ((_e = attributes.defaultFile) === null || _e === void 0 ? void 0 : _e.url)}
                  </p>
                </span>) : (<span className="cursor-pointer text-primary-400 hover:text-primary-600 line-clamp-1">
                  Document à joindre
                </span>)}
              {isEditable && (<div onClick={function () { return setIsEditMode(!isEditMode); }} className="flex items-center self-end justify-center px-4 py-1 ml-auto text-xs leading-none border cursor-pointer text-primary-500 rounded-md border-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-300">
                  Edit
                </div>)}
            </div>)}
        </>) : (<input type="file" id={id} className={cn(error
                ? 'placeholder-red-300 text-red-400 border-red-300'
                : 'placeholder-gray-500 text-gray-800 border-gray-300', 'border px-3 py-3 bg-transparent rounded text-sm focus:outline-none focus:border-primary-500')} {...attributes} {...register}/>)}
      {error && (<div className="flex items-center justify-between pt-1 text-red-400">
          <p className="text-xs">{'error.message'}</p>
          <IoCloseCircleOutline className="w-4 h-4 m-0"/>
        </div>)}
    </div>);
}
//# sourceMappingURL=FileInput.jsx.map