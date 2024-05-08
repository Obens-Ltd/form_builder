import { useCallback, useEffect, useRef, useState } from 'react';

import { Switch } from '@mui/material';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { CiCalendarDate } from 'react-icons/ci';
import { GoMultiSelect } from 'react-icons/go';
import { IoIosArrowDropdown } from 'react-icons/io';
import {
  IoAddOutline,
  IoReloadOutline,
  IoTabletLandscapeOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { LuText } from 'react-icons/lu';
import { RiInputCursorMove } from 'react-icons/ri';
import { TbNewSection, TbNumbers } from 'react-icons/tb';

import SelectInput from '@components/inputs/SelectInput';
import TextareaInput from '@components/inputs/TextareaInput';
import TextInput from '@components/inputs/TextInput';
import { useFormBuilder } from '@contexts/formBuilder-context';

export const fields = [
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

const FielComponentOpetion = ({
  fieldType,
  title,
  icon,
  isContainer,
}: {
  fieldType: string;
  title?: string;
  icon?: any;
  isContainer?: boolean;
}) => {
  const { replaceDropEreatoField, formList } = useFormBuilder();
  const ref = useRef(null) as any;
  const [, drag] = useDrag(() => ({
    type: 'addField',
    item: () => {
      return { type: fieldType, isContainer: isContainer };
    },
    end: (item, monitor) => {
      replaceDropEreatoField(
        formList,
        formList,
        item.type,
        item?.isContainer || false,
      );
    },
  }));
  drag(ref);

  const Icone = icon || RiInputCursorMove;

  return (
    <div
      ref={ref}
      className="flex flex-row items-center justify-start w-full h-12 p-4 border border-gray-200 rounded cursor-move hover:border-primary-400 bg-primary-50 bg-opacity-30 gap-4 hover:bg-primary-100 hover:bg-opacity-70"
    >
      <Icone className="w-4 h-4 text-gray-500" />
      <p className="text-sm font-medium leading-none cursor-move text-heading">
        {title}
      </p>
    </div>
  );
};

export const AddField = () => {
  return (
    <div className="flex flex-col flex-wrap items-start justify-start h-full p-5 flex-2 gap-4">
      {fields.map((field) => (
        <div
          key={field.title}
          className="flex flex-col items-start justify-start w-full gap-4"
        >
          <p className=" text-base font-medium leading-none cursor-default text-heading">
            {field.title}
          </p>
          <div className="flex flex-col items-start justify-start w-full flex-2 gap-4">
            {field.children.map((child, index) => (
              <FielComponentOpetion
                key={child?.type + index}
                fieldType={child.type}
                title={child.name}
                isContainer={field.title === 'Layouts'}
                icon={child?.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ************************** options component start ************************** */

export const InputFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />

      <TextInput
        id="Default"
        fieldName="Default value"
        placeholder="Default value"
        value={field?.defaultValue}
        onChange={(env: any) => {
          updateField({ ...field, defaultValue: env.target.value });
        }}
        name="default"
      />
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};
export const LongTextInputFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />

      <TextareaInput
        id="Default"
        fieldName="Default value"
        placeholder="Default value"
        value={field?.defaultValue}
        type={field?.inputType}
        onChange={(env: any) => {
          updateField({ ...field, defaultValue: env.target.value });
        }}
        name="default"
      />
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const DateFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />

      <TextInput
        id="Default"
        fieldName="Default value"
        placeholder="Default value"
        value={field?.defaultValue}
        type={'date'}
        onChange={(env: any) => {
          updateField({ ...field, defaultValue: env.target.value });
        }}
        name="default"
      />
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const NumberInputFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />

      <TextInput
        id="Default"
        fieldName="Default value"
        placeholder="Default value"
        value={field?.defaultValue}
        type={'number'}
        onChange={(env: any) => {
          updateField({ ...field, defaultValue: env.target.value });
        }}
        name="default"
      />
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const DropDownOptionsInput = ({ field }: any) => {
  const { updateField, formList } = useFormBuilder();
  const addOption = useCallback(() => {
    const newField = {
      label: '',
      value: '',
    };
    updateField({
      ...field,
      options: field?.options ? [...field?.options, newField] : [newField],
    });
  }, [field, updateField]);

  const deleteOption = useCallback(
    (index: number) => {
      updateField({
        ...field,
        options: field?.options.filter((item: any, i: number) => i !== index),
      });
    },
    [field, updateField],
  );

  const updateOption = useCallback(
    (index: number, key: string, value: string) => {
      updateField({
        ...field,
        options: field?.options.map((option: any, i: number) =>
          i === index ? { ...option, [key]: value } : option,
        ),
      });
    },
    [field, updateField],
  );

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <label
        htmlFor={'data'}
        className={'block pb-2 text-xs font-semibold text-gray-800'}
      >
        {'Options'} {<span className="text-red-500">*</span>}
      </label>
      {field?.options?.map((option: any, i: number) => (
        <div
          key={i}
          className="flex flex-row items-center justify-start w-full gap-4"
        >
          <TextInput
            id="label"
            fieldName={i === 0 ? 'Label' : ''}
            placeholder="Label"
            value={option?.label}
            name="label"
            onChange={(env: any) => {
              updateOption(i, 'label', env.target.value);
            }}
          />
          <TextInput
            id="value"
            fieldName={i === 0 ? 'Value' : ''}
            placeholder="Value"
            value={option?.value}
            name="value"
            onChange={(env: any) => {
              updateOption(i, 'value', env.target.value);
            }}
          />
          <div
            onClick={() => {
              deleteOption(i);
            }}
            className={cn(
              'flex flex-row items-center self-center justify-center h-full  text-red-500 cursor-pointer justify-self-center hover:text-red-800 duration-150 transition-colors',
              i === 0 ? 'mt-5' : '',
            )}
          >
            <IoTrashOutline className="w-5 h-5 " />
          </div>
        </div>
      ))}
      <button
        className="flex items-center self-center p-0 px-4 py-2 m-0 border justify-self-center transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300"
        onClick={(e) => {
          e.preventDefault();
          // addField(id, field?.children?.length, 'container');
          addOption();
        }}
      >
        <span className="mr-2 text-sm leading-none">{'Add new option'}</span>
        <IoAddOutline className="w-5 h-5 !m-0" />
      </button>
    </div>
  );
};

export const DropDownFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'singleSelect', label: 'singleSelect' },
    { value: 'multiSelect', label: 'multiSelect' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />
      <DropDownOptionsInput field={field} />
      <SelectInput
        id="label"
        fieldName="Type"
        placeholder="Label"
        // value={{ value: field?.name, label: field?.name }}
        value={{
          value: field?.inputType || 'text',
          label:
            inputTypes.find((val) => val.value === field?.inputType)?.label ||
            'Text',
        }}
        name="label"
        options={inputTypes}
        onChange={(env: any) => {
          updateField({ ...field, inputType: env.target.value });
        }}
      />

      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const MultiDropDownFieldOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  const inputTypes = [
    { value: 'singleSelect', label: 'singleSelect' },
    { value: 'multiSelect', label: 'multiSelect' },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.name}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <TextInput
        id="Placeholder"
        fieldName="Place holder"
        placeholder="Place holder"
        value={field?.placeholder}
        name="placeholder"
        onChange={(env: any) => {
          updateField({ ...field, placeholder: env.target.value });
        }}
      />
      <DropDownOptionsInput field={field} />

      <SelectInput
        id={'form-name' + field?.name}
        fieldName={'Default value'}
        placeholder={field?.placeholder}
        name={field?.name}
        readonly
        options={field?.options}
        isMulti
        value={{
          value: field?.defaultValue || '',
          label:
            field?.options?.find(
              (val: any) => val.value === field?.defaultValue,
            )?.label || '',
        }}
        onChange={(env: any) => {
          updateField({ ...field, defaultValue: env.target.value });
        }}
        InputBgColor="bg-gray-100 curser-move"
        style={{ cursor: 'move' }}
      />
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Switch color="success" />
          <p className="text-sm font-medium leading-none cursor-default text-heading">
            {'Required'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContainerOptions = ({ field }: any) => {
  const { updateField } = useFormBuilder();

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <TextInput
        id="label"
        fieldName="Label"
        placeholder="Label"
        value={field?.lable}
        name="label"
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
      <SelectInput
        id="label"
        fieldName="type"
        placeholder="Label"
        // value={{ value: field?.name, label: field?.name }}
        defaultValue={{ value: field?.name, label: field?.name }}
        name="label"
        options={[
          { value: 'Hstack', label: 'Hstack' },
          { value: 'Vstack', label: 'Vstack' },
        ]}
        onChange={(env: any) => {
          updateField({ ...field, name: env.target.value });
        }}
      />
    </div>
  );
};

/* ************************** options component end ************************** */

const FiledOptionName = ({
  value,
  updateField,
}: {
  value: string;
  updateField: () => void;
}) => {
  <TextInput
    id="label"
    fieldName="Label"
    placeholder="Label"
    value={value}
    name="label"
    onChange={(env: any) => {
      updateField();
    }}
  />;
};

export const FieldOption = () => {
  const [value, setValue] = useState(false);
  const [field, setField] = useState(null) as any;
  const { selectedField, findField, formList, updateField, allFormOptions } =
    useFormBuilder();

  useEffect(() => {
    if (selectedField) {
      const field: any = findField(selectedField, formList);
      setField(field);
    }
  }, [selectedField, formList, findField]);

  const Component = allFormOptions?.get(field?.type);

  return (
    <div className="flex flex-col items-start justify-start flex-1 h-full p-5 gap-4">
      {field ? (
        <>
          <div className="flex flex-row items-center justify-start w-full h-12 p-4 border-b bg-opacity-30 gap-4 ">
            <RiInputCursorMove className="w-4 h-4" />
            <div className="flex flex-row items-center justify-start w-full gap-1">
              <p className="text-sm font-medium leading-none cursor-default text-heading">
                {fields?.map(
                  (fld) =>
                    fld?.children.find((item) => item?.type === field?.type)
                      ?.name,
                )}
              </p>
              <p className="text-xs font-normal leading-none text-gray-600 cursor-default">
                {`(key# ${selectedField})`}
              </p>
            </div>
          </div>
          {Component ? (
            <Component field={field} />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-40 gap-4">
              <p>{' No options available'}</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-40 gap-4">
          <p>{'No field selected'}</p>
        </div>
      )}
    </div>
  );
};

export const FormOption = () => {
  const availableTabs = [
    { id: 1, name: 'Add Fields' },
    { id: 2, name: 'Field Options' },
  ];
  const [selectedTab, setSelectedTab] = useState(availableTabs[0]);
  const ref = useRef<HTMLDivElement>(null);

  const { selectedField } = useFormBuilder();
  useEffect(() => {
    if (selectedField) {
      setSelectedTab({ id: 2, name: 'Field Options' });
    }
  }, [selectedField]);
  return (
    <div
      style={{ minHeight: '30rem' }}
      className="relative flex flex-col w-full h-full text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none"
    >
      <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
        <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
          {'Form options'}
        </h3>
        <div
          onClick={() => {}}
          className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
        >
          <IoReloadOutline className={cn('w-5 h-5')} />
        </div>
      </div>
      <ul className="flex flex-row items-center w-full h-12 overflow-auto  overflow-y-hidden border-b">
        {availableTabs.map((tab, i) => (
          <div
            key={i}
            ref={ref}
            id={`coop-${i}`}
            onClick={() => {
              // to avoid re-selecting same tab
              if (tab.id && selectedTab.id && tab.id === selectedTab.id) return;
              setSelectedTab(tab);
            }}
            className={cn(
              'text-gray-600 px-7 flex flex-row h-full hover:text-primary-500 focus:outline-none w-full justify-center items-center transition-colors duration-300 border-b-2 text-sm',
              selectedTab?.name === tab?.name
                ? 'text-primary-500 cursor-default font-semibold border-primary-500'
                : 'border-transparent cursor-pointer font-medium',
            )}
            style={{ height: '100%' }}
          >
            <a />
            <div className="flex flex-col items-center py-2 text-sm leading-none text-left text-slate900 whitespace-nowrap gap-y-1">
              <p>{tab.name}</p>
            </div>
          </div>
        ))}
      </ul>
      {selectedTab.name === 'Add Fields' ? <AddField /> : <FieldOption />}
    </div>
  );
};
