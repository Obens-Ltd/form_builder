import { createContext, useCallback, useContext, useState } from 'react';

import ObjectID from 'bson-objectid';

import {
  FieldDropArea,
  FormContainer,
  FormDateInput,
  FormDropDownInput,
  FormLongTextInput,
  FormMultiDropDownInput,
  FormNumberInput,
  FormSection,
  FormTextInput,
} from '@components/formBuilder/formFields';
import {
  ContainerOptions,
  DateFieldOptions,
  DropDownFieldOptions,
  InputFieldOptions,
  LongTextInputFieldOptions,
  MultiDropDownFieldOptions,
  NumberInputFieldOptions,
} from '@components/formBuilder/formOptions';
import { formList } from '@interfaces';

const initialForm = {
  id: '22222',
  type: 'Screen',
  name: 'text',
  label: 'Text',
  required: false,
  placeholder: 'Enter text',
  children: [],
};

const initialFosrm = {
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

const initialState = {
  formList: {} as formList,
  isFormEditable: false,
  setIsFormEditable: (isEditable: boolean) => {},
  addField: (parentId: string, order: any, field: any) => {},
  removeField: (fieldId: string) => {},
  updateField: (field: any) => {},
  // moveField: (field: any) => {},
  clearFields: () => {},
  // getField: (field: any) => {},
  cloneField: (field: any) => {},
  getOrderById: (id: string) => {},
  reorderFields: (parentId: string | undefined, order: any, fieldId: any) => {},
  allFormFields: new Map<string, any>(),
  allFormOptions: new Map<string, any>(),
  selectedField: null,
  setSelectedField: (field: any) => {},
  findParent: (id: string, form: any): any => {},
  hoveredField: null,
  setHoveredField: (field: any) => {},
  clearDropEreas: (parent: any, form: any) => {},
  setDraggedField: (field: any) => {},
  findField: (id: string | undefined, form: any) => {},
  replaceDropEreatoField: (
    parent: any,
    form: any,
    field: string,
    isContainer: boolean,
  ) => {},
  addFieldDropErea: (
    parentId: string | undefined,
    order: any,
    type: string,
  ) => {},
  draggedField: null,
  addFieldConponent: (type: string, fieldComponent: any) => {},
};

const FormBuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [formList, setFormList] = useState<formList>({ ...initialForm });
  const [selectedField, setSelectedField] = useState<any>(null);
  const [hoveredField, setHoveredField] = useState<any>(null);
  const [draggedField, setDraggedField] = useState<any>(null);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(true);
  const [allFormFields, setAllFormFields] = useState(
    new Map<string, any>([
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
    ]),
  );
  const allFormOptions = new Map<string, any>([
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

  const findField = useCallback((id: string | undefined, form: any) => {
    if (form?.id === id) {
      return form;
    }
    if (form.children) {
      for (const child of form.children) {
        const found: any = findField(id, child);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }, []);

  const findParent = useCallback((id: string, form: any): any => {
    if (form.children) {
      for (const child of form.children) {
        if (child.id === id) {
          return form;
        }
        const found: any = findParent(id, child);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }, []);

  const getOrderById: (v: string) => number = useCallback(
    (id: string): number => {
      const parent = findParent(id, formList);
      if (parent?.children) {
        return parseInt(
          parent.children.findIndex((child: any) => child.id === id),
        );
      }
      return 0;
    },
    [findParent, formList],
  );

  const addField = useCallback(
    (parentId: string | undefined, order: any, field: any) => {
      setFormList((prev) => {
        const form = { ...prev };
        const parent = findField(parentId, form);
        if (parent) {
          const newField = {
            id: ObjectID(),
            type: field?.type,
            name: 'text',
            label: 'Text',
            isContainer: field?.isContainer || false,
            required: false,
            placeholder: 'Enter text',
            children: [],
          };
          parent?.children?.splice(order, 0, newField);
        }
        return form;
      });
    },
    [setFormList, findField],
  );

  const removeField = useCallback(
    (fieldId: string) => {
      setFormList((prev) => {
        const form = { ...prev };
        const parent = findParent(fieldId, form);
        const field = findField(fieldId, form);
        if (parent) {
          const index = parent.children.indexOf(field);
          parent.children.splice(index, 1);
        }
        return form;
      });
    },
    [setFormList, findField, findParent],
  );

  const reorderFields = useCallback(
    (parentId: string | undefined, order: any, item: any) => {
      setFormList((prev) => {
        const form = { ...prev };
        const parent = findField(parentId, form);
        if (parent) {
          const field = { ...findField(item?.id, form) };
          if (field) {
            removeField(field?.id);
            parent?.children?.splice(order, 0, field);
          }
        }
        return form;
      });
    },
    [setFormList, findField, removeField],
  );

  const clearFields = useCallback(() => {
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

  const clearDropEreas = useCallback((parent: any, form: any) => {
    if (form.type === 'fieldDropArea') {
      const index = parent.children.indexOf(form);
      parent.children.splice(index, 1);
    }
    if (form.children) {
      for (const child of form.children) {
        clearDropEreas(form, child);
      }
    }
  }, []);

  const addFieldDropErea = useCallback(
    (parentId: string | undefined, order: any, type: string) => {
      setFormList((prev) => {
        const form = { ...prev };
        const parent = findField(parentId, form);
        if (parent?.[order]?.type === 'fieldDropArea') return form;

        clearDropEreas(form, form);
        if (parent) {
          const newField = {
            id: ObjectID(),
            type: 'fieldDropArea',
            name: 'text',
            label: 'Text',
            required: false,
            placeholder: 'Enter text',
            children: [],
          };
          parent?.children?.splice(order, 0, newField);
        }
        return form;
      });
    },
    [setFormList, findField, clearDropEreas],
  );

  const replaceDropEreatoField = (
    parent: any,
    form: any,
    type: string,
    isContainer: boolean,
  ) => {
    if (form.type === 'fieldDropArea') {
      updateField({
        id: form?.id,
        type: type,
        name: 'text',
        label: '',
        isContainer: isContainer,
        required: false,
        placeholder: 'Enter text',
        children: [],
      });
    }
    if (form?.children) {
      for (const child of form?.children) {
        replaceDropEreatoField(form, child, type, isContainer);
      }
    }
  };

  const addFieldConponent = useCallback(
    (type: string, fieldComponent: any) => {
      setAllFormFields((prv) => prv.set(type, fieldComponent));
    },
    [setAllFormFields],
  );

  const updateField = useCallback(
    (field: any) => {
      setFormList((prev) => {
        const form = { ...prev };
        const fieldToUpdate = findField(field.id, form);
        const parent = findParent(field.id, form);
        if (fieldToUpdate) {
          parent.children = parent.children.map((child: any) => {
            if (child.id === field.id) {
              return field;
            }
            return child;
          });
        }
        return form;
      });
    },
    [setFormList, findField, findParent],
  );

  const cloneField = useCallback(
    (field: any) => {
      setFormList((prev) => {
        const form = { ...prev };
        const fieldToClone = findField(field.id, form);
        const parent = findParent(field.id, form);
        if (fieldToClone) {
          const newField = { ...fieldToClone };
          newField.id = ObjectID();
          parent.children.splice(
            parent.children.indexOf(fieldToClone),
            0,
            newField,
          );
        }
        return form;
      });
    },
    [setFormList, findField, findParent],
  );

  return (
    <FormBuilderContext.Provider
      value={{
        isFormEditable,
        setIsFormEditable,
        updateField,
        findField,
        formList,
        allFormFields,
        allFormOptions,
        selectedField,
        setSelectedField,
        hoveredField,
        setHoveredField,
        reorderFields,
        addField,
        getOrderById,
        draggedField,
        setDraggedField,
        clearFields,
        addFieldDropErea,
        replaceDropEreatoField,
        clearDropEreas,
        findParent,
        cloneField,
        removeField,
        addFieldConponent,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

const FormBuilderContext = createContext(initialState);

const useFormBuilder = () => {
  return useContext(FormBuilderContext);
};

export { useFormBuilder, FormBuilderProvider };
