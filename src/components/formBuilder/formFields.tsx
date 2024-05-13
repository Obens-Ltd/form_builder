import { ReactNode, useCallback, useEffect, useRef } from 'react';

import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { GrClone } from 'react-icons/gr';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';

import { useFormBuilder } from '../../contexts/formBuilder-context';
import SelectInput from '../inputs/SelectInput';
import TextareaInput from '../inputs/TextareaInput';
import TextInput from '../inputs/TextInput';

export const FieldChooser = ({
  children,
  parentId,
  field,
  display = true,
  order,
}: {
  children: ReactNode;
  parentId?: string;
  field?: any;
  display?: boolean;
  order?: number;
}) => {
  const ref = useRef(null) as any;
  const {
    formList,
    allFormFields,
    selectedField,
    setSelectedField,
    hoveredField,
    setHoveredField,
    reorderFields,
    getOrderById,
    setDraggedField,
    draggedField,
    addFieldDropErea,
    replaceDropEreatoField,
    findParent,
    clearDropEreas,
    cloneField,
    removeField,
  } = useFormBuilder();

  const onClick = useCallback(() => {
    setSelectedField(hoveredField);
  }, [hoveredField, setSelectedField]);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'reorder',
    item: () => {
      return { order, field: field };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      setDraggedField(null);
      if (!monitor.didDrop()) {
        return;
      }
    },
  }));

  useEffect(() => {
    if (isDragging) {
      setDraggedField(field?.id);
    }
  }, [isDragging, field?.id, setDraggedField]);

  const isCursorInsidePadding = (
    field: any,
    hoverBoundingRect: any,
    clientOffsetY: any,
    clientOffsetX: any,
    hoverT: any,
    hoverB: any,
    hoverL: any,
    hoverR: any,
  ) => {
    if (
      (clientOffsetY &&
        clientOffsetY > hoverT &&
        clientOffsetY < hoverT + 16) ||
      (clientOffsetY && clientOffsetY < hoverB && clientOffsetY > hoverB - 16)
    ) {
      return true;
    } else if (
      (clientOffsetX &&
        clientOffsetX > hoverL &&
        clientOffsetX < hoverL + 16) ||
      (clientOffsetX && clientOffsetX < hoverR && clientOffsetX > hoverR - 16)
    ) {
      return true;
    }

    return false;
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'reorder',

    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      if (item?.field?.id === field?.id) return;

      // Get vertical middle
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverT = hoverBoundingRect?.top;
      const hoverB = hoverBoundingRect?.bottom;
      const hoverL = hoverBoundingRect?.left;
      const hoverR = hoverBoundingRect?.right;
      const clientOffsetY = monitor?.getClientOffset()?.y;
      const clientOffsetX = monitor?.getClientOffset()?.x;

      if (!field?.isContainer) {
        reorderFields(parentId, getOrderById(field?.id), item.field);
        return;
      }

      // if (field?.isContainer) {
      //   reorderFields(parentId, getOrderById(field?.id), item.field);
      //   return;
      // }

      if (field.isContainer && field?.children?.length === 0) {
        reorderFields(field?.id, 0, item?.field);
        return;
      }

      if (
        field.isContainer &&
        isCursorInsidePadding(
          field,
          hoverBoundingRect,
          clientOffsetY,
          clientOffsetX,
          hoverT,
          hoverB,
          hoverL,
          hoverR,
        ) &&
        field?.children?.length !== 0
      ) {
        reorderFields(
          parentId,
          (
            field?.name === 'Hstack'
              ? clientOffsetX && clientOffsetX - hoverL < (hoverR - hoverL) / 2
              : clientOffsetY && clientOffsetY - hoverT < (hoverB - hoverT) / 2
          )
            ? getOrderById(field?.id)
            : (getOrderById(field?.id) as any) + 1,
          item?.field,
        );
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{}, feilDrop] = useDrop(() => ({
    accept: 'addField',

    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      if (field?.type === 'fieldDropArea') return;
      // Get vertical middle

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverT = hoverBoundingRect?.top;
      const hoverB = hoverBoundingRect?.bottom;
      const hoverL = hoverBoundingRect?.left;
      const hoverR = hoverBoundingRect?.right;
      const clientOffsetY = monitor?.getClientOffset()?.y;
      const clientOffsetX = monitor?.getClientOffset()?.x;

      if (!field?.isContainer) {
        addFieldDropErea(parentId, getOrderById(field?.id), '');
        return;
      }

      if (
        field.isContainer &&
        (isCursorInsidePadding(
          field,
          hoverBoundingRect,
          clientOffsetY,
          clientOffsetX,
          hoverT,
          hoverB,
          hoverL,
          hoverR,
        ) ||
          field?.children?.length === 0)
      ) {
        addFieldDropErea(
          field?.id,
          (
            field?.name === 'Hstack'
              ? clientOffsetX && clientOffsetX - hoverL < (hoverR - hoverL) / 2
              : clientOffsetY && clientOffsetY - hoverT < (hoverB - hoverT) / 2
          )
            ? 0
            : field?.children?.length,
          '',
        );
      }
    },

    drop: (item: any) => {
      replaceDropEreatoField(
        parentId,
        formList,
        item?.type,
        item?.isContainer || false,
      );
      clearDropEreas(formList, formList);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  feilDrop(drag(drop(ref)));
  return (
    <>
      {display ? (
        <div
          ref={ref}
          className={cn(
            'relative flex z-30 flex-col overflow-hidden items-start  justify-start w-full p-4 rounded  ',
            selectedField === field?.id
              ? 'bg-gray-200 border-dashed border border-primary-400 hover:bg-gray-200 hover:bg-opacity-100'
              : '',
            hoveredField === field?.id ? 'bg-gray-100' : '',
            draggedField === field?.id ? 'opacity-50' : '',
          )}
          onMouseEnter={() => setHoveredField(field?.id)}
          onMouseLeave={() => setHoveredField(parentId)}
          onClick={() => onClick()}
        >
          {selectedField === field?.id && (
            <div className="absolute top-0 right-0 z-40 flex items-center justify-center p-3 rounded-tl gap-2">
              <div
                onClick={() => {
                  cloneField(field);
                }}
                title="Clone Field"
                className="flex flex-row items-center self-center justify-center h-full cursor-pointer text-primary-500 justify-self-center hover:text-primary-800 duration-150 transition-colors"
              >
                <GrClone className="w-4 h-4 " />
              </div>
              <div
                onClick={() => {
                  removeField(field?.id);
                }}
                title="Delete Field"
                className="flex flex-row items-center self-center justify-center h-full text-red-500 cursor-pointer justify-self-center hover:text-red-800 duration-150 transition-colors"
              >
                <IoTrashOutline className="w-4 h-4 " />
              </div>
            </div>
          )}
          {children && children}
          {hoveredField === field?.id && draggedField === null && (
            <div className="absolute bottom-0 right-0 z-40 p-3 rounded-tl cursor-move bg-primary-200">
              <p className="text-xs leading-none text-gray-600 font-base">
                {'Click to Edit | Drag to Reorder'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <>{children && children}</>
      )}{' '}
    </>
  );
};

export const FieldDropArea = ({
  id,
  field,
  parentId,
  setSelectedid,
}: {
  id?: number;
  field?: any;
  parentId?: any;

  setSelectedid?: any;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-xs text-gray-600 border opacity-70 rounded-md border-primary-600/60 h-[70px] bg-primary-400/30">
      dzed
    </div>
  );
};

export const FormSection = ({
  id,
  children,
  field,
  parentId,
  isEditable = false,
}: {
  id: any;
  children: ReactNode;
  field: any;
  parentId: any;
  isEditable?: boolean;
}) => {
  const { addField, formList } = useFormBuilder();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full border border-gray-500/50 rounded-md',
        isEditable ? 'p-4 gap-4' : '',
      )}
    >
      {children?.toString() ? (
        children
      ) : (
        <>
          {!isEditable && (
            <div className="flex justify-center py-8">
              <button
                className="flex items-center p-0 px-4 py-2 m-0 border  transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300"
                onClick={(e) => {
                  e.preventDefault();
                  addField(id || '', field?.children?.length, {
                    type: 'Container',
                    isContainer: true,
                  });
                }}
              >
                <span className="mr-2 text-sm leading-none">
                  {'Add a new container'}
                </span>
                <IoAddOutline className="w-5 h-5 !m-0" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const FormContainer = ({
  id,
  children,
  isEditable = false,
  field,
}: {
  id: any;
  isEditable?: boolean;
  children: ReactNode;
  field: any;
}) => {
  const { addField, formList } = useFormBuilder();
  return (
    <div
      className={cn(
        'flex items-center justify-center w-full',
        field?.name === 'Hstack' ? 'flex-row' : 'flex-col',
        isEditable ? 'p-4 gap-4' : '',
      )}
    >
      {children?.toString() ? (
        children
      ) : (
        <>
          {!isEditable && (
            <div className="flex justify-center py-8">
              <button
                className="flex items-center p-0 px-4 py-2 m-0 border transition-colors duration-150 rounded-md text-primary-400 hover:text-primary-600 border-primary-300"
                onClick={(e) => {
                  e.preventDefault();
                  addField(id, field?.children?.length, {
                    type: 'TextInput',
                    // isContainer: true,
                  });
                }}
              >
                <span className="mr-2 text-sm leading-none">
                  {'Add a new text input'}
                </span>
                <IoAddOutline className="w-5 h-5 !m-0" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const FormDropDownInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange?: (env: any) => {};
}) => {
  return (
    <SelectInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      readonly={isEditable}
      isMulti={field?.type === 'multiSelect' ? true : false}
      isEditable={isEditable}
      onChange={(env: any) => {
        onChange && onChange(env);
      }}
      options={field?.options}
      value={{
        value: field?.defaultValue || '',
        label:
          field?.options?.find((val: any) => val.value === field?.defaultValue)
            ?.label || '',
      }}
      InputBgColor="bg-gray-100"
      // style={{ cursor: 'move' }}
    />
  );
};

export const FormMultiDropDownInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange?: (env: any) => {};
}) => {
  return (
    <SelectInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      readonly={isEditable}
      isMulti
      isEditable={isEditable}
      onChange={(env: any) => {
        onChange && onChange(env);
      }}
      options={field?.options}
      value={{
        value: field?.defaultValue || '',
        label:
          field?.options?.find((val: any) => val.value === field?.defaultValue)
            ?.label || '',
      }}
      InputBgColor="bg-gray-100"
      // style={{ cursor: 'move' }}
    />
  );
};

export const FormTextInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange: (env: any) => {};
}) => {
  return (
    <TextInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      type={'text'}
      readonly={!isEditable}
      onChange={(env: any) => {
        onChange(env);
      }}
      value={!field?.defaultValue ? '' : field?.defaultValue}
      InputBgColor={!isEditable ? 'bg-gray-100' : ''}
      // style={{ cursor: 'move' }}
    />
  );
};

export const FormNumberInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange: (env: any) => {};
}) => {
  return (
    <TextInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      type={'number'}
      readonly={!isEditable}
      onChange={(env: any) => {
        onChange(env);
      }}
      value={!field?.defaultValue ? '' : field?.defaultValue}
      InputBgColor={!isEditable ? 'bg-gray-100' : ''}
      // style={{ cursor: 'move' }}
    />
  );
};

export const FormDateInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange: (env: any) => {};
}) => {
  return (
    <TextInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      type={'date'}
      readonly={!isEditable}
      onChange={(env: any) => {
        onChange(env);
      }}
      value={!field?.defaultValue ? '' : field?.defaultValue}
      InputBgColor={!isEditable ? 'bg-gray-100' : ''}
      // style={{ cursor: 'move' }}
    />
  );
};

export const FormLongTextInput = ({
  id,
  field,
  parentId,
  setSelectedid,
  isEditable = false,
  onChange,
}: {
  id?: number;
  field?: any;
  parentId?: any;
  setSelectedid?: any;
  isEditable?: boolean;
  onChange: (env: any) => {};
}) => {
  return (
    <TextareaInput
      id={'form-name' + id}
      fieldName={field?.name}
      placeholder={field?.placeholder}
      name={field?.name}
      // type={'text'}
      readOnly={!isEditable}
      onChange={(env: any) => {
        onChange(env);
      }}
      value={!field?.defaultValue ? '' : field?.defaultValue}
      // InputBgColor={!isEditable ? 'bg-gray-100' : ''}
      // style={{ cursor: 'move' }}
    />
  );
};
