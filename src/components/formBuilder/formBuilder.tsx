import { useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';
import { AiOutlineEdit } from 'react-icons/ai';
import {
  IoAddOutline,
  IoPlayOutline,
  IoSaveOutline,
  IoTrashOutline,
} from 'react-icons/io5';

import { FieldChooser } from '@components/formBuilder/formFields';
import { FormOption } from '@components/formBuilder/formOptions';
import { useFormBuilder } from '@contexts/formBuilder-context';


export const FormGenerator = ({
  field,
  parentId,
  order = 0,
  isEditable = false,
}: {
  field: any;
  parentId: any;
  order?: any;
  isEditable?: boolean;
}) => {
  const {
    allFormFields,
    selectedField,
    setSelectedField,
    isFormEditable,
    updateField,
  } = useFormBuilder();

  const Field = allFormFields?.get(field?.type);

  return (
    <>
      <div className="flex flex-row items-start justify-start w-full">
        {Field && (
          <FieldChooser
            display={isEditable}
            order={order}
            parentId={parentId}
            field={field}
          >
            {Field && (
              <Field
                isEditable={!isEditable}
                id={field?.id}
                key={field?.id}
                field={field}
                selectedId={selectedField}
                setSelectedid={setSelectedField}
                onChange={(env: any) => {
                  updateField({ ...field, defaultValue: env.target.value });
                }}
              >
                {field?.children?.map((child: any, index: number) => (
                  <FormGenerator
                    key={child.id}
                    isEditable={isEditable}
                    order={index}
                    field={child}
                    parentId={field.id}
                  />
                ))}
              </Field>
            )}
          </FieldChooser>
        )}
      </div>
    </>
  );
};

export const FormScreen = () => {
  const {
    formList,
    selectedField,
    setSelectedField,
    addField,
    clearFields,
    isFormEditable,
  } = useFormBuilder();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full',
        !isFormEditable ? 'bg-gray-50 gap-4' : 'bg-white',
      )}
    >
      {formList?.type === 'Screen' &&
        formList?.children?.map((form: any) => (
          <FormGenerator
            key={form?.id}
            field={form}
            parentId={formList?.id}
            isEditable={isFormEditable}
          />
        ))}
      <div className="flex justify-center py-8">
        {isFormEditable && (
          <button
            className="flex items-center p-0 px-4 py-2 m-0 border transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300"
            onClick={(e) => {
              e.preventDefault();
              addField(formList?.id, formList?.children?.length || 0, {
                type: 'Section',
                isContainer: true,
              });
            }}
          >
            <span className="mr-2 text-sm leading-none">
              {'Add a new section'}
            </span>
            <IoAddOutline className="w-5 h-5 !m-0" />
          </button>
        )}
      </div>
    </div>
  );
};

const FormViewer = ({
  exceptionRef,
  onSave,
}: {
  exceptionRef?: any;
  onSave?: (data: any) => void;
}) => {
  // const [selectedId, setSelectedId] = useState<number | null>(null);
  const {
    formList,
    selectedField,
    setSelectedField,
    addField,
    clearFields,
    setIsFormEditable,
    isFormEditable,
  } = useFormBuilder();

  const handleClickOut = useCallback(() => {
    // setSelectedField(null);
  }, []);


  return (
    <div
      style={{ minHeight: '30rem', marginTop: '0px' }}
      // onClick={() => setSelectedId(null)}
      className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 lg:rounded-l-none rounded-md col-span-2"
    >
      <div className="flex flex-row items-center justify-between w-full h-12 pr-5 border-b border-gray-200">
        <h3 className="pt-4 pb-4 pl-4 text-sm font-semibold leading-none text-heading">
          {'Form builder'}
        </h3>
        <button
          className={cn(
            'flex items-center p-0 px-2 py-2 m-0  border  transition-colors duration-150 rounded-md ',
            isFormEditable
              ? 'text-blue-500 border-blue-400 hover:text-blue-800'
              : 'text-primary-500 border-primary-400 hover:text-primary-600',
          )}
          onClick={(e) => {
            setIsFormEditable(!isFormEditable);
            e.preventDefault();
          }}
        >
          {isFormEditable ? (
            <IoPlayOutline className="w-5 h-5 !m-0" />
          ) : (
            <AiOutlineEdit className="w-5 h-5 !m-0" />
          )}
          <span className="ml-1 text-sm leading-none">
            {isFormEditable ? 'Preview Form' : 'Edit Form'}
          </span>
        </button>
        <div className="flex flex-row items-center justify-center gap-4">
          <div
            onClick={() => {
              clearFields();
            }}
            className="flex flex-row items-center justify-center text-red-500 cursor-pointer hover:text-red-800 duration-150 transition-colors"
          >
            <IoTrashOutline className="w-5 h-5 " />
          </div>
          <div
            onClick={() => {
              onSave && onSave('fff');
            }}
            className="flex flex-row items-center justify-center cursor-pointer text-primary-500 hover:text-primary-800 duration-150 transition-colors"
          >
            <IoSaveOutline className="w-5 h-5 " />
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
              <button
                className="py-2 font-semibold text-white border cursor-default bg-primary-500 border-primary-500 rounded-md w-28"
                onClick={() => {}}
              >
                {'Submit'}
              </button>
              <button
                onClick={() => {}}
                className="py-3 text-sm font-semibold text-red-500 border border-transparent rounded cursor-default w-28 "
              >
                {'Cancel'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start flex-1 p-5 gap-4"></div>
      </div>
    </div>
  );
};

const FormBuilder = ({ onSave }: { onSave?: (data: any) => void }) => {
  const { formList, selectedField } = useFormBuilder();

  return (
    <div className="flex flex-row items-start justify-between w-full mt-3 space-x-1">
      <div className="w-[30%]">
        <FormOption />
      </div>
      <div className="p-0 mt-0 w-[70%]">
        <FormViewer
          exceptionRef={null}
          onSave={() => {
            onSave && onSave('fff');
          }}
        />
      </div>
    </div>
  );
};

export default FormBuilder;
