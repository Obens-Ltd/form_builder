import { __assign } from "tslib";
import { useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoAddOutline, IoPlayOutline, IoSaveOutline, IoTrashOutline, } from 'react-icons/io5';
import { FieldChooser } from '@components/formBuilder/formFields';
import { FormOption } from '@components/formBuilder/formOptions';
import { useFormBuilder } from '@contexts/formBuilder-context';
var useOutsideClick = function (callback, exceptionRef, handleClickOut) {
    var wrapperRef = useRef(null);
    useEffect(function () {
        var handleClick = function () {
            callback();
        };
        document.addEventListener('click', handleClick);
        return function () {
            document.removeEventListener('click', handleClick);
        };
    }, [callback]);
    var handleClickListener = useCallback(function (event) {
        var _a, _b, _c;
        var clickedInside;
        if (exceptionRef) {
            clickedInside =
                (wrapperRef && ((_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) ||
                    (exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.current) === (event === null || event === void 0 ? void 0 : event.target) ||
                    ((_b = exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target));
        }
        else {
            clickedInside =
                wrapperRef && ((_c = wrapperRef.current) === null || _c === void 0 ? void 0 : _c.contains(event.target));
        }
        if (!clickedInside)
            return;
        else
            handleClickOut();
    }, [exceptionRef, handleClickOut]);
    useEffect(function () {
        document.addEventListener('mouseup', handleClickListener);
        return function () {
            document.removeEventListener('mouseup', handleClickListener);
        };
    }, [handleClickListener]);
    return wrapperRef;
};
export var FormGenerator = function (_a) {
    var _b;
    var field = _a.field, parentId = _a.parentId, _c = _a.order, order = _c === void 0 ? 0 : _c, _d = _a.isEditable, isEditable = _d === void 0 ? false : _d;
    var _e = useFormBuilder(), allFormFields = _e.allFormFields, selectedField = _e.selectedField, setSelectedField = _e.setSelectedField, isFormEditable = _e.isFormEditable, updateField = _e.updateField;
    var Field = allFormFields === null || allFormFields === void 0 ? void 0 : allFormFields.get(field === null || field === void 0 ? void 0 : field.type);
    return (<>
      <div className="flex flex-row items-start justify-start w-full">
        {Field && (<FieldChooser display={isEditable} order={order} parentId={parentId} field={field}>
            {Field && (<Field isEditable={!isEditable} id={field === null || field === void 0 ? void 0 : field.id} key={field === null || field === void 0 ? void 0 : field.id} field={field} selectedId={selectedField} setSelectedid={setSelectedField} onChange={function (env) {
                    updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
                }}>
                {(_b = field === null || field === void 0 ? void 0 : field.children) === null || _b === void 0 ? void 0 : _b.map(function (child, index) { return (<FormGenerator key={child.id} isEditable={isEditable} order={index} field={child} parentId={field.id}/>); })}
              </Field>)}
          </FieldChooser>)}
      </div>
    </>);
};
export var FormScreen = function () {
    var _a;
    var _b = useFormBuilder(), formList = _b.formList, selectedField = _b.selectedField, setSelectedField = _b.setSelectedField, addField = _b.addField, clearFields = _b.clearFields, isFormEditable = _b.isFormEditable;
    return (<div className={cn('flex flex-col items-center justify-center w-full', !isFormEditable ? 'bg-gray-50 gap-4' : 'bg-white')}>
      {(formList === null || formList === void 0 ? void 0 : formList.type) === 'Screen' &&
            ((_a = formList === null || formList === void 0 ? void 0 : formList.children) === null || _a === void 0 ? void 0 : _a.map(function (form) { return (<FormGenerator key={form === null || form === void 0 ? void 0 : form.id} field={form} parentId={formList === null || formList === void 0 ? void 0 : formList.id} isEditable={isFormEditable}/>); }))}
      <div className="flex justify-center py-8">
        {isFormEditable && (<button className="flex items-center p-0 px-4 py-2 m-0 border transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300" onClick={function (e) {
                var _a;
                e.preventDefault();
                addField(formList === null || formList === void 0 ? void 0 : formList.id, ((_a = formList === null || formList === void 0 ? void 0 : formList.children) === null || _a === void 0 ? void 0 : _a.length) || 0, {
                    type: 'Section',
                    isContainer: true,
                });
            }}>
            <span className="mr-2 text-sm leading-none">
              {'Add a new section'}
            </span>
            <IoAddOutline className="w-5 h-5 !m-0"/>
          </button>)}
      </div>
    </div>);
};
var FormViewer = function (_a) {
    var exceptionRef = _a.exceptionRef, onSave = _a.onSave;
    // const [selectedId, setSelectedId] = useState<number | null>(null);
    var _b = useFormBuilder(), formList = _b.formList, selectedField = _b.selectedField, setSelectedField = _b.setSelectedField, addField = _b.addField, clearFields = _b.clearFields, setIsFormEditable = _b.setIsFormEditable, isFormEditable = _b.isFormEditable;
    var handleClickOut = useCallback(function () {
        // setSelectedField(null);
    }, []);
    var wrapperRef = useOutsideClick(handleClickOut, exceptionRef, handleClickOut);
    return (<div style={{ minHeight: '30rem', marginTop: '0px' }} 
    // onClick={() => setSelectedId(null)}
    className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 lg:rounded-l-none rounded-md col-span-2">
      <div className="flex flex-row items-center justify-between w-full h-12 pr-5 border-b border-gray-200">
        <h3 className="pt-4 pb-4 pl-4 text-sm font-semibold leading-none text-heading">
          {'Form builder'}
        </h3>
        <button className={cn('flex items-center p-0 px-2 py-2 m-0  border  transition-colors duration-150 rounded-md ', isFormEditable
            ? 'text-blue-500 border-blue-400 hover:text-blue-800'
            : 'text-primary-500 border-primary-400 hover:text-primary-600')} onClick={function (e) {
            setIsFormEditable(!isFormEditable);
            e.preventDefault();
        }}>
          {isFormEditable ? (<IoPlayOutline className="w-5 h-5 !m-0"/>) : (<AiOutlineEdit className="w-5 h-5 !m-0"/>)}
          <span className="ml-1 text-sm leading-none">
            {isFormEditable ? 'Preview Form' : 'Edit Form'}
          </span>
        </button>
        <div className="flex flex-row items-center justify-center gap-4">
          <div onClick={function () {
            clearFields();
        }} className="flex flex-row items-center justify-center text-red-500 cursor-pointer hover:text-red-800 duration-150 transition-colors">
            <IoTrashOutline className="w-5 h-5 "/>
          </div>
          <div onClick={function () {
            onSave && onSave('fff');
        }} className="flex flex-row items-center justify-center cursor-pointer text-primary-500 hover:text-primary-800 duration-150 transition-colors">
            <IoSaveOutline className="w-5 h-5 "/>
          </div>
        </div>
      </div>

      <div className=" flex-col items-start justify-start flex-1 gap-4 bg-gray-50">
        <div className="flex flex-col items-center justify-between w-full p-5  bg-white border border-gray-200 rounded-xl">
          <div className="flex flex-col items-start justify-between w-full py-4 gap-2 opacity-70">
            <h3 className="text-xl font-semibold leading-none text-heading">
              {'Form preview'}
            </h3>
            <h1 className="text-xs leading-none text-gray-600 font-base">
              {'Form Name'}
            </h1>
          </div>

          <div className="flex flex-col items-start justify-start w-full">
            <FormScreen />
          </div>

          <div className="px-8 pt-4 opacity-70">
            <div className="flex justify-center gap-x-3">
              <button className="py-2 font-semibold text-white border cursor-default bg-primary-500 border-primary-500 rounded-md w-28" onClick={function () { }}>
                {'Submit'}
              </button>
              <button onClick={function () { }} className="py-3 text-sm font-semibold text-red-500 border border-transparent rounded cursor-default w-28 ">
                {'Cancel'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start flex-1 p-5 gap-4"></div>
      </div>
    </div>);
};
var FormBuilder = function (_a) {
    var onSave = _a.onSave;
    var _b = useFormBuilder(), formList = _b.formList, selectedField = _b.selectedField;
    return (<div className="flex flex-row items-start justify-between w-full mt-3 space-x-1">
      <div className="w-[30%]">
        <FormOption />
      </div>
      <div className="p-0 mt-0 w-[70%]">
        <FormViewer exceptionRef={null} onSave={function () {
            onSave && onSave('fff');
        }}/>
      </div>
    </div>);
};
export default FormBuilder;
//# sourceMappingURL=formBuilder.jsx.map