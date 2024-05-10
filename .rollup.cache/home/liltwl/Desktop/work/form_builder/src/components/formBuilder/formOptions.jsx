import { __assign, __spreadArray } from "tslib";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Switch } from '@mui/material';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { CiCalendarDate } from 'react-icons/ci';
import { GoMultiSelect } from 'react-icons/go';
import { IoIosArrowDropdown } from 'react-icons/io';
import { IoAddOutline, IoReloadOutline, IoTabletLandscapeOutline, IoTrashOutline, } from 'react-icons/io5';
import { LuText } from 'react-icons/lu';
import { RiInputCursorMove } from 'react-icons/ri';
import { TbNewSection, TbNumbers } from 'react-icons/tb';
import SelectInput from '@components/inputs/SelectInput';
import TextareaInput from '@components/inputs/TextareaInput';
import TextInput from '@components/inputs/TextInput';
import { useFormBuilder } from '@contexts/formBuilder-context';
export var fields = [
    {
        title: 'Fields',
        children: [
            {
                type: 'TextInput',
                name: 'Text Input',
                icon: RiInputCursorMove,
            },
            {
                type: 'LongTextInput',
                name: 'Long text Input',
                icon: LuText,
            },
            {
                type: 'FormNumberInput',
                name: 'Number Input',
                icon: TbNumbers,
            },
            {
                type: 'DateInput',
                name: 'Date Input',
                icon: CiCalendarDate,
            },
            {
                type: 'dropDown',
                name: 'Dropdown',
                icon: IoIosArrowDropdown,
            },
            {
                type: 'MultipleChoiceListInput',
                name: 'Multi Dropdown',
                icon: GoMultiSelect,
            },
        ],
    },
    {
        title: 'Layouts',
        children: [
            {
                type: 'Container',
                name: 'Container',
                icon: IoTabletLandscapeOutline,
            },
            {
                type: 'Section',
                name: 'Section',
                icon: TbNewSection,
            },
        ],
    },
];
/* ************************** Field component ************************** */
var FielComponentOpetion = function (_a) {
    var fieldType = _a.fieldType, title = _a.title, icon = _a.icon, isContainer = _a.isContainer;
    var _b = useFormBuilder(), replaceDropEreatoField = _b.replaceDropEreatoField, formList = _b.formList;
    var ref = useRef(null);
    var _c = useDrag(function () { return ({
        type: 'addField',
        item: function () {
            return { type: fieldType, isContainer: isContainer };
        },
        end: function (item, monitor) {
            replaceDropEreatoField(formList, formList, item.type, (item === null || item === void 0 ? void 0 : item.isContainer) || false);
        },
    }); }), drag = _c[1];
    drag(ref);
    var Icone = icon || RiInputCursorMove;
    return (<div ref={ref} className="flex flex-row items-center justify-start w-full h-12 p-4 border border-gray-200 rounded cursor-move hover:border-primary-400 bg-primary-50 bg-opacity-30 gap-4 hover:bg-primary-100 hover:bg-opacity-70">
      <Icone className="w-4 h-4 text-gray-500"/>
      <p className="text-sm font-medium leading-none cursor-move text-heading">
        {title}
      </p>
    </div>);
};
export var AddField = function () {
    return (<div className="flex flex-col flex-wrap items-start justify-start h-full p-5 flex-2 gap-4">
      {fields.map(function (field) { return (<div key={field.title} className="flex flex-col items-start justify-start w-full gap-4">
          <p className=" text-base font-medium leading-none cursor-default text-heading">
            {field.title}
          </p>
          <div className="flex flex-col items-start justify-start w-full flex-2 gap-4">
            {field.children.map(function (child, index) { return (<FielComponentOpetion key={(child === null || child === void 0 ? void 0 : child.type) + index} fieldType={child.type} title={child.name} isContainer={field.title === 'Layouts'} icon={child === null || child === void 0 ? void 0 : child.icon}/>); })}
          </div>
        </div>); })}
    </div>);
};
/* ************************** options component start ************************** */
export var InputFieldOptions = function (_a) {
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>

      <TextInput id="Default" fieldName="Default value" placeholder="Default value" value={field === null || field === void 0 ? void 0 : field.defaultValue} onChange={function (env) {
            updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
        }} name="default"/>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var LongTextInputFieldOptions = function (_a) {
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>

      <TextareaInput id="Default" fieldName="Default value" placeholder="Default value" value={field === null || field === void 0 ? void 0 : field.defaultValue} type={field === null || field === void 0 ? void 0 : field.inputType} onChange={function (env) {
            updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
        }} name="default"/>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var DateFieldOptions = function (_a) {
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>

      <TextInput id="Default" fieldName="Default value" placeholder="Default value" value={field === null || field === void 0 ? void 0 : field.defaultValue} type={'date'} onChange={function (env) {
            updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
        }} name="default"/>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var NumberInputFieldOptions = function (_a) {
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>

      <TextInput id="Default" fieldName="Default value" placeholder="Default value" value={field === null || field === void 0 ? void 0 : field.defaultValue} type={'number'} onChange={function (env) {
            updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
        }} name="default"/>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var DropDownOptionsInput = function (_a) {
    var _b;
    var field = _a.field;
    var _c = useFormBuilder(), updateField = _c.updateField, formList = _c.formList;
    var addOption = useCallback(function () {
        var newField = {
            label: '',
            value: '',
        };
        updateField(__assign(__assign({}, field), { options: (field === null || field === void 0 ? void 0 : field.options) ? __spreadArray(__spreadArray([], field === null || field === void 0 ? void 0 : field.options, true), [newField], false) : [newField] }));
    }, [field, updateField]);
    var deleteOption = useCallback(function (index) {
        updateField(__assign(__assign({}, field), { options: field === null || field === void 0 ? void 0 : field.options.filter(function (item, i) { return i !== index; }) }));
    }, [field, updateField]);
    var updateOption = useCallback(function (index, key, value) {
        updateField(__assign(__assign({}, field), { options: field === null || field === void 0 ? void 0 : field.options.map(function (option, i) {
                var _a;
                return i === index ? __assign(__assign({}, option), (_a = {}, _a[key] = value, _a)) : option;
            }) }));
    }, [field, updateField]);
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <label htmlFor={'data'} className={'block pb-2 text-xs font-semibold text-gray-800'}>
        {'Options'} {<span className="text-red-500">*</span>}
      </label>
      {(_b = field === null || field === void 0 ? void 0 : field.options) === null || _b === void 0 ? void 0 : _b.map(function (option, i) { return (<div key={i} className="flex flex-row items-center justify-start w-full gap-4">
          <TextInput id="label" fieldName={i === 0 ? 'Label' : ''} placeholder="Label" value={option === null || option === void 0 ? void 0 : option.label} name="label" onChange={function (env) {
                updateOption(i, 'label', env.target.value);
            }}/>
          <TextInput id="value" fieldName={i === 0 ? 'Value' : ''} placeholder="Value" value={option === null || option === void 0 ? void 0 : option.value} name="value" onChange={function (env) {
                updateOption(i, 'value', env.target.value);
            }}/>
          <div onClick={function () {
                deleteOption(i);
            }} className={cn('flex flex-row items-center self-center justify-center h-full  text-red-500 cursor-pointer justify-self-center hover:text-red-800 duration-150 transition-colors', i === 0 ? 'mt-5' : '')}>
            <IoTrashOutline className="w-5 h-5 "/>
          </div>
        </div>); })}
      <button className="flex items-center self-center p-0 px-4 py-2 m-0 border justify-self-center transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300" onClick={function (e) {
            e.preventDefault();
            // addField(id, field?.children?.length, 'container');
            addOption();
        }}>
        <span className="mr-2 text-sm leading-none">{'Add new option'}</span>
        <IoAddOutline className="w-5 h-5 !m-0"/>
      </button>
    </div>);
};
export var DropDownFieldOptions = function (_a) {
    var _b;
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'singleSelect', label: 'singleSelect' },
        { value: 'multiSelect', label: 'multiSelect' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>
      <DropDownOptionsInput field={field}/>
      <SelectInput id="label" fieldName="Type" placeholder="Label" 
    // value={{ value: field?.name, label: field?.name }}
    value={{
            value: (field === null || field === void 0 ? void 0 : field.inputType) || 'text',
            label: ((_b = inputTypes.find(function (val) { return val.value === (field === null || field === void 0 ? void 0 : field.inputType); })) === null || _b === void 0 ? void 0 : _b.label) ||
                'Text',
        }} name="label" options={inputTypes} onChange={function (env) {
            updateField(__assign(__assign({}, field), { inputType: env.target.value }));
        }}/>

      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var MultiDropDownFieldOptions = function (_a) {
    var _b, _c;
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    var inputTypes = [
        { value: 'singleSelect', label: 'singleSelect' },
        { value: 'multiSelect', label: 'multiSelect' },
    ];
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.name} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <TextInput id="Placeholder" fieldName="Place holder" placeholder="Place holder" value={field === null || field === void 0 ? void 0 : field.placeholder} name="placeholder" onChange={function (env) {
            updateField(__assign(__assign({}, field), { placeholder: env.target.value }));
        }}/>
      <DropDownOptionsInput field={field}/>

      <SelectInput id={'form-name' + (field === null || field === void 0 ? void 0 : field.name)} fieldName={'Default value'} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} readonly options={field === null || field === void 0 ? void 0 : field.options} isMulti value={{
            value: (field === null || field === void 0 ? void 0 : field.defaultValue) || '',
            label: ((_c = (_b = field === null || field === void 0 ? void 0 : field.options) === null || _b === void 0 ? void 0 : _b.find(function (val) { return val.value === (field === null || field === void 0 ? void 0 : field.defaultValue); })) === null || _c === void 0 ? void 0 : _c.label) || '',
        }} onChange={function (env) {
            updateField(__assign(__assign({}, field), { defaultValue: env.target.value }));
        }} InputBgColor="bg-gray-100 curser-move" style={{ cursor: 'move' }}/>
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success"/>
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>);
};
export var ContainerOptions = function (_a) {
    var field = _a.field;
    var updateField = useFormBuilder().updateField;
    return (<div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput id="label" fieldName="Label" placeholder="Label" value={field === null || field === void 0 ? void 0 : field.lable} name="label" onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
      <SelectInput id="label" fieldName="type" placeholder="Label" 
    // value={{ value: field?.name, label: field?.name }}
    defaultValue={{ value: field === null || field === void 0 ? void 0 : field.name, label: field === null || field === void 0 ? void 0 : field.name }} name="label" options={[
            { value: 'Hstack', label: 'Hstack' },
            { value: 'Vstack', label: 'Vstack' },
        ]} onChange={function (env) {
            updateField(__assign(__assign({}, field), { name: env.target.value }));
        }}/>
    </div>);
};
/* ************************** options component end ************************** */
var FiledOptionName = function (_a) {
    var value = _a.value, updateField = _a.updateField;
    <TextInput id="label" fieldName="Label" placeholder="Label" value={value} name="label" onChange={function (env) {
            updateField();
        }}/>;
};
export var FieldOption = function () {
    var _a = useState(false), value = _a[0], setValue = _a[1];
    var _b = useState(null), field = _b[0], setField = _b[1];
    var _c = useFormBuilder(), selectedField = _c.selectedField, findField = _c.findField, formList = _c.formList, updateField = _c.updateField, allFormOptions = _c.allFormOptions;
    useEffect(function () {
        if (selectedField) {
            var field_1 = findField(selectedField, formList);
            setField(field_1);
        }
    }, [selectedField, formList, findField]);
    var Component = allFormOptions === null || allFormOptions === void 0 ? void 0 : allFormOptions.get(field === null || field === void 0 ? void 0 : field.type);
    return (<div className="flex flex-col items-start justify-start flex-1 h-full p-5 gap-4">
      {field ? (<>
          <div className="flex flex-row items-center justify-start w-full h-12 p-4 border-b bg-opacity-30 gap-4 ">
            <RiInputCursorMove className="w-4 h-4"/>
            <div className="flex flex-row items-center justify-start w-full gap-1">
              <p className="text-sm font-medium leading-none cursor-default text-heading">
                {fields === null || fields === void 0 ? void 0 : fields.map(function (fld) {
                var _a;
                return (_a = fld === null || fld === void 0 ? void 0 : fld.children.find(function (item) { return (item === null || item === void 0 ? void 0 : item.type) === (field === null || field === void 0 ? void 0 : field.type); })) === null || _a === void 0 ? void 0 : _a.name;
            })}
              </p>
              <p className="text-xs font-normal leading-none text-gray-600 cursor-default">
                {"(key# ".concat(selectedField, ")")}
              </p>
            </div>
          </div>
          {Component ? (<Component field={field}/>) : (<div className="flex flex-col items-center justify-center w-full h-40 gap-4">
              <p>{' No options available'}</p>
            </div>)}
        </>) : (<div className="flex flex-col items-center justify-center w-full h-40 gap-4">
          <p>{'No field selected'}</p>
        </div>)}
    </div>);
};
export var FormOption = function () {
    var availableTabs = [
        { id: 1, name: 'Add Fields' },
        { id: 2, name: 'Field Options' },
    ];
    var _a = useState(availableTabs[0]), selectedTab = _a[0], setSelectedTab = _a[1];
    var ref = useRef(null);
    var selectedField = useFormBuilder().selectedField;
    useEffect(function () {
        if (selectedField) {
            setSelectedTab({ id: 2, name: 'Field Options' });
        }
    }, [selectedField]);
    return (<div style={{ minHeight: '30rem' }} className="relative flex flex-col w-full h-full text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none">
      <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
        <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
          {'Form options'}
        </h3>
        <div onClick={function () { }} className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800">
          <IoReloadOutline className={cn('w-5 h-5')}/>
        </div>
      </div>
      <ul className="flex flex-row items-center w-full h-12 overflow-auto  overflow-y-hidden border-b">
        {availableTabs.map(function (tab, i) { return (<div key={i} ref={ref} id={"coop-".concat(i)} onClick={function () {
                // to avoid re-selecting same tab
                if (tab.id && selectedTab.id && tab.id === selectedTab.id)
                    return;
                setSelectedTab(tab);
            }} className={cn('text-gray-600 px-7 flex flex-row h-full hover:text-primary-500 focus:outline-none w-full justify-center items-center transition-colors duration-300 border-b-2 text-sm', (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.name) === (tab === null || tab === void 0 ? void 0 : tab.name)
                ? 'text-primary-500 cursor-default font-semibold border-primary-500'
                : 'border-transparent cursor-pointer font-medium')} style={{ height: '100%' }}>
            <a />
            <div className="flex flex-col items-center py-2 text-sm leading-none text-left text-slate900 whitespace-nowrap gap-y-1">
              <p>{tab.name}</p>
            </div>
          </div>); })}
      </ul>
      {selectedTab.name === 'Add Fields' ? <AddField /> : <FieldOption />}
    </div>);
};
//# sourceMappingURL=formOptions.jsx.map