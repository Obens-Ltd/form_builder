import * as react_jsx_runtime from 'react/jsx-runtime';
import { formList } from '@interfaces';

declare const FormGenerator: ({ field, parentId, order, isEditable, }: {
    field: any;
    parentId: any;
    order?: any;
    isEditable?: boolean | undefined;
}) => react_jsx_runtime.JSX.Element;
declare const FormScreen: () => react_jsx_runtime.JSX.Element;
declare const FormBuilder: ({ onSave }: {
    onSave?: ((data: any) => void) | undefined;
}) => react_jsx_runtime.JSX.Element;

declare const FormBuilderProvider: ({ children }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const useFormBuilder: () => {
    formList: formList;
    isFormEditable: boolean;
    setIsFormEditable: (isEditable: boolean) => void;
    addField: (parentId: string, order: any, field: any) => void;
    removeField: (fieldId: string) => void;
    updateField: (field: any) => void;
    clearFields: () => void;
    cloneField: (field: any) => void;
    getOrderById: (id: string) => void;
    reorderFields: (parentId: string | undefined, order: any, fieldId: any) => void;
    allFormFields: Map<string, any>;
    allFormOptions: Map<string, any>;
    selectedField: null;
    setSelectedField: (field: any) => void;
    findParent: (id: string, form: any) => any;
    hoveredField: null;
    setHoveredField: (field: any) => void;
    clearDropEreas: (parent: any, form: any) => void;
    setDraggedField: (field: any) => void;
    findField: (id: string | undefined, form: any) => void;
    replaceDropEreatoField: (parent: any, form: any, field: string, isContainer: boolean) => void;
    addFieldDropErea: (parentId: string | undefined, order: any, type: string) => void;
    draggedField: null;
    addFieldConponent: (type: string, fieldComponent: any) => void;
};

export { FormBuilder, FormBuilderProvider, FormGenerator, FormScreen, useFormBuilder };
