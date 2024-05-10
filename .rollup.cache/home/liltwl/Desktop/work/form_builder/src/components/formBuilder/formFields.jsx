import { useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { GrClone } from 'react-icons/gr';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';
import SelectInput from '@components/inputs/SelectInput';
import TextareaInput from '@components/inputs/TextareaInput';
import TextInput from '@components/inputs/TextInput';
import { useFormBuilder } from '@contexts/formBuilder-context';
export var FieldChooser = function (_a) {
    var children = _a.children, parentId = _a.parentId, field = _a.field, _b = _a.display, display = _b === void 0 ? true : _b, order = _a.order;
    var ref = useRef(null);
    var _c = useFormBuilder(), formList = _c.formList, allFormFields = _c.allFormFields, selectedField = _c.selectedField, setSelectedField = _c.setSelectedField, hoveredField = _c.hoveredField, setHoveredField = _c.setHoveredField, reorderFields = _c.reorderFields, getOrderById = _c.getOrderById, setDraggedField = _c.setDraggedField, draggedField = _c.draggedField, addFieldDropErea = _c.addFieldDropErea, replaceDropEreatoField = _c.replaceDropEreatoField, findParent = _c.findParent, clearDropEreas = _c.clearDropEreas, cloneField = _c.cloneField, removeField = _c.removeField;
    var onClick = useCallback(function () {
        setSelectedField(hoveredField);
    }, [hoveredField, setSelectedField]);
    var _d = useDrag(function () { return ({
        type: 'reorder',
        item: function () {
            return { order: order, field: field };
        },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging(),
        }); },
        end: function (item, monitor) {
            setDraggedField(null);
            if (!monitor.didDrop()) {
                return;
            }
        },
    }); }), isDragging = _d[0].isDragging, drag = _d[1], dragPreview = _d[2];
    useEffect(function () {
        if (isDragging) {
            setDraggedField(field === null || field === void 0 ? void 0 : field.id);
        }
    }, [isDragging, field === null || field === void 0 ? void 0 : field.id, setDraggedField]);
    var isCursorInsidePadding = function (field, hoverBoundingRect, clientOffsetY, clientOffsetX, hoverT, hoverB, hoverL, hoverR) {
        if ((clientOffsetY &&
            clientOffsetY > hoverT &&
            clientOffsetY < hoverT + 16) ||
            (clientOffsetY && clientOffsetY < hoverB && clientOffsetY > hoverB - 16)) {
            return true;
        }
        else if ((clientOffsetX &&
            clientOffsetX > hoverL &&
            clientOffsetX < hoverL + 16) ||
            (clientOffsetX && clientOffsetX < hoverR && clientOffsetX > hoverR - 16)) {
            return true;
        }
        return false;
    };
    var _e = useDrop(function () { return ({
        accept: 'reorder',
        hover: function (item, monitor) {
            var _a, _b, _c, _d, _e, _f;
            if (!ref.current) {
                return;
            }
            if (((_a = item === null || item === void 0 ? void 0 : item.field) === null || _a === void 0 ? void 0 : _a.id) === (field === null || field === void 0 ? void 0 : field.id))
                return;
            // Get vertical middle
            var hoverBoundingRect = (_b = ref.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            var hoverT = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.top;
            var hoverB = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.bottom;
            var hoverL = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.left;
            var hoverR = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.right;
            var clientOffsetY = (_c = monitor === null || monitor === void 0 ? void 0 : monitor.getClientOffset()) === null || _c === void 0 ? void 0 : _c.y;
            var clientOffsetX = (_d = monitor === null || monitor === void 0 ? void 0 : monitor.getClientOffset()) === null || _d === void 0 ? void 0 : _d.x;
            if (!(field === null || field === void 0 ? void 0 : field.isContainer)) {
                reorderFields(parentId, getOrderById(field === null || field === void 0 ? void 0 : field.id), item.field);
                return;
            }
            // if (field?.isContainer) {
            //   reorderFields(parentId, getOrderById(field?.id), item.field);
            //   return;
            // }
            if (field.isContainer && ((_e = field === null || field === void 0 ? void 0 : field.children) === null || _e === void 0 ? void 0 : _e.length) === 0) {
                reorderFields(field === null || field === void 0 ? void 0 : field.id, 0, item === null || item === void 0 ? void 0 : item.field);
                return;
            }
            if (field.isContainer &&
                isCursorInsidePadding(field, hoverBoundingRect, clientOffsetY, clientOffsetX, hoverT, hoverB, hoverL, hoverR) &&
                ((_f = field === null || field === void 0 ? void 0 : field.children) === null || _f === void 0 ? void 0 : _f.length) !== 0) {
                reorderFields(parentId, ((field === null || field === void 0 ? void 0 : field.name) === 'Hstack'
                    ? clientOffsetX && clientOffsetX - hoverL < (hoverR - hoverL) / 2
                    : clientOffsetY && clientOffsetY - hoverT < (hoverB - hoverT) / 2)
                    ? getOrderById(field === null || field === void 0 ? void 0 : field.id)
                    : getOrderById(field === null || field === void 0 ? void 0 : field.id) + 1, item === null || item === void 0 ? void 0 : item.field);
            }
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }); },
    }); }), _f = _e[0], canDrop = _f.canDrop, isOver = _f.isOver, drop = _e[1];
    var _g = useDrop(function () { return ({
        accept: 'addField',
        hover: function (item, monitor) {
            var _a, _b, _c, _d, _e;
            if (!ref.current) {
                return;
            }
            if ((field === null || field === void 0 ? void 0 : field.type) === 'fieldDropArea')
                return;
            // Get vertical middle
            var hoverBoundingRect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            var hoverT = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.top;
            var hoverB = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.bottom;
            var hoverL = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.left;
            var hoverR = hoverBoundingRect === null || hoverBoundingRect === void 0 ? void 0 : hoverBoundingRect.right;
            var clientOffsetY = (_b = monitor === null || monitor === void 0 ? void 0 : monitor.getClientOffset()) === null || _b === void 0 ? void 0 : _b.y;
            var clientOffsetX = (_c = monitor === null || monitor === void 0 ? void 0 : monitor.getClientOffset()) === null || _c === void 0 ? void 0 : _c.x;
            if (!(field === null || field === void 0 ? void 0 : field.isContainer)) {
                addFieldDropErea(parentId, getOrderById(field === null || field === void 0 ? void 0 : field.id), '');
                return;
            }
            if (field.isContainer &&
                (isCursorInsidePadding(field, hoverBoundingRect, clientOffsetY, clientOffsetX, hoverT, hoverB, hoverL, hoverR) ||
                    ((_d = field === null || field === void 0 ? void 0 : field.children) === null || _d === void 0 ? void 0 : _d.length) === 0)) {
                addFieldDropErea(field === null || field === void 0 ? void 0 : field.id, ((field === null || field === void 0 ? void 0 : field.name) === 'Hstack'
                    ? clientOffsetX && clientOffsetX - hoverL < (hoverR - hoverL) / 2
                    : clientOffsetY && clientOffsetY - hoverT < (hoverB - hoverT) / 2)
                    ? 0
                    : (_e = field === null || field === void 0 ? void 0 : field.children) === null || _e === void 0 ? void 0 : _e.length, '');
            }
        },
        drop: function (item) {
            replaceDropEreatoField(parentId, formList, item === null || item === void 0 ? void 0 : item.type, (item === null || item === void 0 ? void 0 : item.isContainer) || false);
            clearDropEreas(formList, formList);
        },
        collect: function (monitor) { return ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }); },
    }); }), _h = _g[0], feilDrop = _g[1];
    feilDrop(drag(drop(ref)));
    return (<>
      {display ? (<div ref={ref} className={cn('relative flex z-30 flex-col overflow-hidden items-start  justify-start w-full p-4 rounded  ', selectedField === (field === null || field === void 0 ? void 0 : field.id)
                ? 'bg-gray-200 border-dashed border border-primary-400 hover:bg-gray-200 hover:bg-opacity-100'
                : '', hoveredField === (field === null || field === void 0 ? void 0 : field.id) ? 'bg-gray-100' : '', draggedField === (field === null || field === void 0 ? void 0 : field.id) ? 'opacity-50' : '')} onMouseEnter={function () { return setHoveredField(field === null || field === void 0 ? void 0 : field.id); }} onMouseLeave={function () { return setHoveredField(parentId); }} onClick={function () { return onClick(); }}>
          {selectedField === (field === null || field === void 0 ? void 0 : field.id) && (<div className="absolute top-0 right-0 z-40 flex items-center justify-center p-3 rounded-tl gap-2">
              <div onClick={function () {
                    cloneField(field);
                }} title="Clone Field" className="flex flex-row items-center self-center justify-center h-full cursor-pointer text-primary-500 justify-self-center hover:text-primary-800 duration-150 transition-colors">
                <GrClone className="w-4 h-4 "/>
              </div>
              <div onClick={function () {
                    removeField(field === null || field === void 0 ? void 0 : field.id);
                }} title="Delete Field" className="flex flex-row items-center self-center justify-center h-full text-red-500 cursor-pointer justify-self-center hover:text-red-800 duration-150 transition-colors">
                <IoTrashOutline className="w-4 h-4 "/>
              </div>
            </div>)}
          {children && children}
          {hoveredField === (field === null || field === void 0 ? void 0 : field.id) && draggedField === null && (<div className="absolute bottom-0 right-0 z-40 p-3 rounded-tl cursor-move bg-primary-200">
              <p className="text-xs leading-none text-gray-600 font-base">
                {'Click to Edit | Drag to Reorder'}
              </p>
            </div>)}
        </div>) : (<>{children && children}</>)}{' '}
    </>);
};
export var FieldDropArea = function (_a) {
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid;
    return (<div className="flex flex-col items-center justify-center w-full text-xs text-gray-600 border opacity-70 rounded-md border-primary-600/60 h-[70px] bg-primary-400/30">
      dzed
    </div>);
};
export var FormSection = function (_a) {
    var id = _a.id, children = _a.children, field = _a.field, parentId = _a.parentId, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b;
    var _c = useFormBuilder(), addField = _c.addField, formList = _c.formList;
    return (<div className={cn('flex flex-col items-center justify-center w-full border border-gray-500/50 rounded-md', isEditable ? 'p-4 gap-4' : '')}>
      {(children === null || children === void 0 ? void 0 : children.toString()) ? (children) : (<>
          {!isEditable && (<div className="flex justify-center py-8">
              <button className="flex items-center p-0 px-4 py-2 m-0 border  transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300" onClick={function (e) {
                    var _a;
                    e.preventDefault();
                    addField(id || '', (_a = field === null || field === void 0 ? void 0 : field.children) === null || _a === void 0 ? void 0 : _a.length, {
                        type: 'Container',
                        isContainer: true,
                    });
                }}>
                <span className="mr-2 text-sm leading-none">
                  {'Add a new container'}
                </span>
                <IoAddOutline className="w-5 h-5 !m-0"/>
              </button>
            </div>)}
        </>)}
    </div>);
};
export var FormContainer = function (_a) {
    var id = _a.id, children = _a.children, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b, field = _a.field;
    var _c = useFormBuilder(), addField = _c.addField, formList = _c.formList;
    return (<div className={cn('flex items-center justify-center w-full', (field === null || field === void 0 ? void 0 : field.name) === 'Hstack' ? 'flex-row' : 'flex-col', isEditable ? 'p-4 gap-4' : '')}>
      {(children === null || children === void 0 ? void 0 : children.toString()) ? (children) : (<>
          {!isEditable && (<div className="flex justify-center py-8">
              <button className="flex items-center p-0 px-4 py-2 m-0 border transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300" onClick={function (e) {
                    var _a;
                    e.preventDefault();
                    addField(id, (_a = field === null || field === void 0 ? void 0 : field.children) === null || _a === void 0 ? void 0 : _a.length, {
                        type: 'TextInput',
                        // isContainer: true,
                    });
                }}>
                <span className="mr-2 text-sm leading-none">
                  {'Add a new text input'}
                </span>
                <IoAddOutline className="w-5 h-5 !m-0"/>
              </button>
            </div>)}
        </>)}
    </div>);
};
export var FormDropDownInput = function (_a) {
    var _b, _c;
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _d = _a.isEditable, isEditable = _d === void 0 ? false : _d, onChange = _a.onChange;
    return (<SelectInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} readonly={isEditable} isMulti={(field === null || field === void 0 ? void 0 : field.type) === 'multiSelect' ? true : false} isEditable={isEditable} onChange={function (env) {
            onChange && onChange(env);
        }} options={field === null || field === void 0 ? void 0 : field.options} value={{
            value: (field === null || field === void 0 ? void 0 : field.defaultValue) || '',
            label: ((_c = (_b = field === null || field === void 0 ? void 0 : field.options) === null || _b === void 0 ? void 0 : _b.find(function (val) { return val.value === (field === null || field === void 0 ? void 0 : field.defaultValue); })) === null || _c === void 0 ? void 0 : _c.label) || '',
        }} InputBgColor="bg-gray-100"/>);
};
export var FormMultiDropDownInput = function (_a) {
    var _b, _c;
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _d = _a.isEditable, isEditable = _d === void 0 ? false : _d, onChange = _a.onChange;
    return (<SelectInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} readonly={isEditable} isMulti isEditable={isEditable} onChange={function (env) {
            onChange && onChange(env);
        }} options={field === null || field === void 0 ? void 0 : field.options} value={{
            value: (field === null || field === void 0 ? void 0 : field.defaultValue) || '',
            label: ((_c = (_b = field === null || field === void 0 ? void 0 : field.options) === null || _b === void 0 ? void 0 : _b.find(function (val) { return val.value === (field === null || field === void 0 ? void 0 : field.defaultValue); })) === null || _c === void 0 ? void 0 : _c.label) || '',
        }} InputBgColor="bg-gray-100"/>);
};
export var FormTextInput = function (_a) {
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b, onChange = _a.onChange;
    return (<TextInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} type={'text'} readonly={!isEditable} onChange={function (env) {
            onChange(env);
        }} value={!(field === null || field === void 0 ? void 0 : field.defaultValue) ? '' : field === null || field === void 0 ? void 0 : field.defaultValue} InputBgColor={!isEditable ? 'bg-gray-100' : ''}/>);
};
export var FormNumberInput = function (_a) {
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b, onChange = _a.onChange;
    return (<TextInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} type={'number'} readonly={!isEditable} onChange={function (env) {
            onChange(env);
        }} value={!(field === null || field === void 0 ? void 0 : field.defaultValue) ? '' : field === null || field === void 0 ? void 0 : field.defaultValue} InputBgColor={!isEditable ? 'bg-gray-100' : ''}/>);
};
export var FormDateInput = function (_a) {
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b, onChange = _a.onChange;
    return (<TextInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} type={'date'} readonly={!isEditable} onChange={function (env) {
            onChange(env);
        }} value={!(field === null || field === void 0 ? void 0 : field.defaultValue) ? '' : field === null || field === void 0 ? void 0 : field.defaultValue} InputBgColor={!isEditable ? 'bg-gray-100' : ''}/>);
};
export var FormLongTextInput = function (_a) {
    var id = _a.id, field = _a.field, parentId = _a.parentId, setSelectedid = _a.setSelectedid, _b = _a.isEditable, isEditable = _b === void 0 ? false : _b, onChange = _a.onChange;
    return (<TextareaInput id={'form-name' + id} fieldName={field === null || field === void 0 ? void 0 : field.name} placeholder={field === null || field === void 0 ? void 0 : field.placeholder} name={field === null || field === void 0 ? void 0 : field.name} 
    // type={'text'}
    readOnly={!isEditable} onChange={function (env) {
            onChange(env);
        }} value={!(field === null || field === void 0 ? void 0 : field.defaultValue) ? '' : field === null || field === void 0 ? void 0 : field.defaultValue}/>);
};
//# sourceMappingURL=formFields.jsx.map