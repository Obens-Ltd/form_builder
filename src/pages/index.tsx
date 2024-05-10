import { useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { FormGenerator } from '@components/formBuilder/formBuilder';
import BaseModalLayout from '@components/modals/BaseModalLayout';
import { useFormBuilder } from '@contexts/formBuilder-context';
import { FormBuilder } from '@index';

const FormBaseModalGenerator = ({
  isOpen,
  setIsOpen,
  formList,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  formList: any;
}) => {
  // const { formList, selectedField, setSelectedField } = useFormBuilder();
  return (
    <BaseModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Test Lab Request"
      description="Here you can view test lab requests."
      loading={false}
      onSubmit={function (e?: any): void {
        throw new Error('Function not implemented.');
      }}
      isSubmitable
    >
      {formList?.type === 'Screen' &&
        formList?.children?.map((form: any, index: any) => (
          <FormGenerator
            key={index}
            isEditable={false}
            field={form}
            parentId={form}
          />
        ))}
    </BaseModalLayout>
  );
};

export default function HeroPage() {
  const {
    formList,
    selectedField,
    addField,
    clearDropEreas,
    addFieldConponent,
  } = useFormBuilder();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className="flex flex-col items-start justify-center w-full mx-auto text-center "
      >
        <div className="flex flex-row items-center justify-between w-full max-w-7xl">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="flex flex-col items-start justify-start text-left"
          >
            <h1 className="font-bold leading-none uppercase text-heading">
              <strong>{'MANAGE FORM'}</strong>
            </h1>
            {/* <Breadcrumbs label="FORM" /> */}
          </motion.div>
        </div>
        {
          <FormBuilder
            onSave={(data: any) => {
              setIsOpen(true);
            }}
          />
        }
        <div className="w-full h-16 spacer" />
      </div>
      {isOpen && (
        <FormBaseModalGenerator
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formList={formList}
        />
      )}
    </>
  );
}

export {
  FormBuilderProvider,
  useFormBuilder,
} from '@contexts/formBuilder-context';
