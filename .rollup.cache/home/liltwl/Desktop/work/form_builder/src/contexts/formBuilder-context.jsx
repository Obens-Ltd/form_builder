import { __assign } from "tslib";
import { createContext, useCallback, useContext, useState } from 'react';
import ObjectID from 'bson-objectid';
import { FieldDropArea, FormContainer, FormDateInput, FormDropDownInput, FormLongTextInput, FormMultiDropDownInput, FormNumberInput, FormSection, FormTextInput, } from '@components/formBuilder/formFields';
import { ContainerOptions, DateFieldOptions, DropDownFieldOptions, InputFieldOptions, LongTextInputFieldOptions, MultiDropDownFieldOptions, NumberInputFieldOptions, } from '@components/formBuilder/formOptions';
var initialForm = {
    id: '22222',
    type: 'Screen',
    name: 'text',
    label: 'Text',
    required: false,
    placeholder: 'Enter text',
    children: [],
};
var initialFosrm = {
    // id: '1',
    // type: 'Form',
    // name: 'text',
    // label: 'Text',
    // required: false,
    // placeholder: 'Enter text',
    // children: [
    // {
    id: '22222',
    type: 'Screen',
    name: 'text',
    label: 'Text',
    required: false,
    placeholder: 'Enter text',
    children: [
        {
            id: '1',
            type: 'section',
            name: 'text',
            label: 'Text',
            required: false,
            placeholder: 'Enter text',
            children: [
                // {
                //   id: '4',
                //   type: 'Header',
                //   name: 'text',
                //   label: 'Text',
                //   required: false,
                //   placeholder: 'Enter text',
                //   children: [],
                // },
                {
                    id: '11',
                    type: 'section',
                    name: 'Hstack',
                    label: 'Text',
                    required: false,
                    placeholder: 'Enter text',
                    children: [
                        {
                            id: '111',
                            type: 'container',
                            name: 'Hstack',
                            label: 'Text',
                            default: 'Text',
                            required: false,
                            placeholder: 'Enter text',
                            children: [
                                {
                                    id: '1111',
                                    type: 'Input',
                                    name: 'text',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    children: [],
                                },
                                {
                                    id: '1112',
                                    type: 'Input',
                                    name: 'yoooooooo',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    children: [],
                                },
                                {
                                    id: '1113',
                                    type: 'Input',
                                    name: 'text',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: '12',
                            type: 'container',
                            name: 'Vstack',
                            label: 'Text',
                            required: false,
                            placeholder: 'Enter text',
                            children: [
                                {
                                    id: '121',
                                    type: 'Input',
                                    name: 'text',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    children: [],
                                },
                                {
                                    id: '122',
                                    type: 'Input',
                                    name: 'text',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    children: [],
                                },
                                {
                                    id: '123',
                                    type: 'Input',
                                    name: 'text',
                                    label: 'Text',
                                    required: false,
                                    placeholder: 'Enter text',
                                    defaultValue: 'Text',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: '13',
                    type: 'container',
                    name: 'Vstack',
                    label: 'Text',
                    required: false,
                    placeholder: 'Enter text',
                    children: [
                        {
                            id: '131',
                            type: 'Input',
                            name: 'text',
                            label: 'Text',
                            required: false,
                            placeholder: 'Enter text',
                            children: [],
                        },
                    ],
                },
            ],
        },
    ],
    //   },
    // ],
};
var initialState = {
    formList: {},
    isFormEditable: false,
    setIsFormEditable: function (isEditable) { },
    addField: function (parentId, order, field) { },
    removeField: function (fieldId) { },
    updateField: function (field) { },
    // moveField: (field: any) => {},
    clearFields: function () { },
    // getField: (field: any) => {},
    cloneField: function (field) { },
    getOrderById: function (id) { },
    reorderFields: function (parentId, order, fieldId) { },
    allFormFields: new Map(),
    allFormOptions: new Map(),
    selectedField: null,
    setSelectedField: function (field) { },
    findParent: function (id, form) { },
    hoveredField: null,
    setHoveredField: function (field) { },
    clearDropEreas: function (parent, form) { },
    setDraggedField: function (field) { },
    findField: function (id, form) { },
    replaceDropEreatoField: function (parent, form, field, isContainer) { },
    addFieldDropErea: function (parentId, order, type) { },
    draggedField: null,
    addFieldConponent: function (type, fieldComponent) { },
};
var FormBuilderProvider = function (_a) {
    var children = _a.children;
    var _b = useState(__assign({}, initialForm)), formList = _b[0], setFormList = _b[1];
    var _c = useState(null), selectedField = _c[0], setSelectedField = _c[1];
    var _d = useState(null), hoveredField = _d[0], setHoveredField = _d[1];
    var _e = useState(null), draggedField = _e[0], setDraggedField = _e[1];
    var _f = useState(true), isFormEditable = _f[0], setIsFormEditable = _f[1];
    var _g = useState(new Map([
        ['TextInput', FormTextInput],
        ['LongTextInput', FormLongTextInput],
        ['dropDown', FormDropDownInput],
        ['numberInput', FormTextInput],
        ['Container', FormContainer],
        ['Section', FormSection],
        ['fieldDropArea', FieldDropArea],
        ['FormNumberInput', FormNumberInput],
        ['MultipleChoiceListInput', FormMultiDropDownInput],
        ['DateInput', FormDateInput],
        // 'Header',
    ])), allFormFields = _g[0], setAllFormFields = _g[1];
    var allFormOptions = new Map([
        ['TextInput', InputFieldOptions],
        ['LongTextInput', LongTextInputFieldOptions],
        ['Container', ContainerOptions],
        ['Section', undefined],
        ['fieldDropArea', undefined],
        ['dropDown', DropDownFieldOptions],
        ['FormNumberInput', NumberInputFieldOptions],
        ['MultipleChoiceListInput', MultiDropDownFieldOptions],
        ['DateInput', DateFieldOptions],
        // 'Header',
    ]);
    var findField = useCallback(function (id, form) {
        if ((form === null || form === void 0 ? void 0 : form.id) === id) {
            return form;
        }
        if (form.children) {
            for (var _i = 0, _a = form.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var found = findField(id, child);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }, []);
    var findParent = useCallback(function (id, form) {
        if (form.children) {
            for (var _i = 0, _a = form.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.id === id) {
                    return form;
                }
                var found = findParent(id, child);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }, []);
    var getOrderById = useCallback(function (id) {
        var parent = findParent(id, formList);
        if (parent === null || parent === void 0 ? void 0 : parent.children) {
            return parseInt(parent.children.findIndex(function (child) { return child.id === id; }));
        }
        return 0;
    }, [findParent, formList]);
    var addField = useCallback(function (parentId, order, field) {
        setFormList(function (prev) {
            var _a;
            var form = __assign({}, prev);
            var parent = findField(parentId, form);
            if (parent) {
                var newField = {
                    id: ObjectID(),
                    type: field === null || field === void 0 ? void 0 : field.type,
                    name: 'text',
                    label: 'Text',
                    isContainer: (field === null || field === void 0 ? void 0 : field.isContainer) || false,
                    required: false,
                    placeholder: 'Enter text',
                    children: [],
                };
                (_a = parent === null || parent === void 0 ? void 0 : parent.children) === null || _a === void 0 ? void 0 : _a.splice(order, 0, newField);
            }
            return form;
        });
    }, [setFormList, findField]);
    var removeField = useCallback(function (fieldId) {
        setFormList(function (prev) {
            var form = __assign({}, prev);
            var parent = findParent(fieldId, form);
            var field = findField(fieldId, form);
            if (parent) {
                var index = parent.children.indexOf(field);
                parent.children.splice(index, 1);
            }
            return form;
        });
    }, [setFormList, findField, findParent]);
    var reorderFields = useCallback(function (parentId, order, item) {
        setFormList(function (prev) {
            var _a;
            var form = __assign({}, prev);
            var parent = findField(parentId, form);
            if (parent) {
                var field = __assign({}, findField(item === null || item === void 0 ? void 0 : item.id, form));
                if (field) {
                    removeField(field === null || field === void 0 ? void 0 : field.id);
                    (_a = parent === null || parent === void 0 ? void 0 : parent.children) === null || _a === void 0 ? void 0 : _a.splice(order, 0, field);
                }
            }
            return form;
        });
    }, [setFormList, findField, removeField]);
    var clearFields = useCallback(function () {
        setFormList({
            id: '22222',
            type: 'Screen',
            name: 'text',
            label: 'Text',
            required: false,
            placeholder: 'Enter text',
            children: [],
        });
    }, [setFormList]);
    var clearDropEreas = useCallback(function (parent, form) {
        if (form.type === 'fieldDropArea') {
            var index = parent.children.indexOf(form);
            parent.children.splice(index, 1);
        }
        if (form.children) {
            for (var _i = 0, _a = form.children; _i < _a.length; _i++) {
                var child = _a[_i];
                clearDropEreas(form, child);
            }
        }
    }, []);
    var addFieldDropErea = useCallback(function (parentId, order, type) {
        setFormList(function (prev) {
            var _a, _b;
            var form = __assign({}, prev);
            var parent = findField(parentId, form);
            if (((_a = parent === null || parent === void 0 ? void 0 : parent[order]) === null || _a === void 0 ? void 0 : _a.type) === 'fieldDropArea')
                return form;
            clearDropEreas(form, form);
            if (parent) {
                var newField = {
                    id: ObjectID(),
                    type: 'fieldDropArea',
                    name: 'text',
                    label: 'Text',
                    required: false,
                    placeholder: 'Enter text',
                    children: [],
                };
                (_b = parent === null || parent === void 0 ? void 0 : parent.children) === null || _b === void 0 ? void 0 : _b.splice(order, 0, newField);
            }
            return form;
        });
    }, [setFormList, findField, clearDropEreas]);
    var replaceDropEreatoField = function (parent, form, type, isContainer) {
        if (form.type === 'fieldDropArea') {
            updateField({
                id: form === null || form === void 0 ? void 0 : form.id,
                type: type,
                name: 'text',
                label: '',
                isContainer: isContainer,
                required: false,
                placeholder: 'Enter text',
                children: [],
            });
        }
        if (form === null || form === void 0 ? void 0 : form.children) {
            for (var _i = 0, _a = form === null || form === void 0 ? void 0 : form.children; _i < _a.length; _i++) {
                var child = _a[_i];
                replaceDropEreatoField(form, child, type, isContainer);
            }
        }
    };
    var addFieldConponent = useCallback(function (type, fieldComponent) {
        setAllFormFields(function (prv) { return prv.set(type, fieldComponent); });
    }, [setAllFormFields]);
    var updateField = useCallback(function (field) {
        setFormList(function (prev) {
            var form = __assign({}, prev);
            var fieldToUpdate = findField(field.id, form);
            var parent = findParent(field.id, form);
            if (fieldToUpdate) {
                parent.children = parent.children.map(function (child) {
                    if (child.id === field.id) {
                        return field;
                    }
                    return child;
                });
            }
            return form;
        });
    }, [setFormList, findField, findParent]);
    var cloneField = useCallback(function (field) {
        setFormList(function (prev) {
            var form = __assign({}, prev);
            var fieldToClone = findField(field.id, form);
            var parent = findParent(field.id, form);
            if (fieldToClone) {
                var newField = __assign({}, fieldToClone);
                newField.id = ObjectID();
                parent.children.splice(parent.children.indexOf(fieldToClone), 0, newField);
            }
            return form;
        });
    }, [setFormList, findField, findParent]);
    return (<FormBuilderContext.Provider value={{
            isFormEditable: isFormEditable,
            setIsFormEditable: setIsFormEditable,
            updateField: updateField,
            findField: findField,
            formList: formList,
            allFormFields: allFormFields,
            allFormOptions: allFormOptions,
            selectedField: selectedField,
            setSelectedField: setSelectedField,
            hoveredField: hoveredField,
            setHoveredField: setHoveredField,
            reorderFields: reorderFields,
            addField: addField,
            getOrderById: getOrderById,
            draggedField: draggedField,
            setDraggedField: setDraggedField,
            clearFields: clearFields,
            addFieldDropErea: addFieldDropErea,
            replaceDropEreatoField: replaceDropEreatoField,
            clearDropEreas: clearDropEreas,
            findParent: findParent,
            cloneField: cloneField,
            removeField: removeField,
            addFieldConponent: addFieldConponent,
        }}>
      {children}
    </FormBuilderContext.Provider>);
};
var FormBuilderContext = createContext(initialState);
var useFormBuilder = function () {
    return useContext(FormBuilderContext);
};
export { useFormBuilder, FormBuilderProvider };
//# sourceMappingURL=formBuilder-context.jsx.map