import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FormGenerator } from '@components/formBuilder/formBuilder';
import BaseModalLayout from '@components/modals/BaseModalLayout';
import { useFormBuilder } from '@contexts/formBuilder-context';
import { FormBuilder } from '@index';
var FormBaseModalGenerator = function (_a) {
    var _b;
    var isOpen = _a.isOpen, setIsOpen = _a.setIsOpen, formList = _a.formList;
    // const { formList, selectedField, setSelectedField } = useFormBuilder();
    return (<BaseModalLayout isOpen={isOpen} setIsOpen={setIsOpen} title="Test Lab Request" description="Here you can view test lab requests." loading={false} onSubmit={function (e) {
            throw new Error('Function not implemented.');
        }} isSubmitable>
      {(formList === null || formList === void 0 ? void 0 : formList.type) === 'Screen' &&
            ((_b = formList === null || formList === void 0 ? void 0 : formList.children) === null || _b === void 0 ? void 0 : _b.map(function (form, index) { return (<FormGenerator key={index} isEditable={false} field={form} parentId={form}/>); }))}
    </BaseModalLayout>);
};
export default function HeroPage() {
    var _a = useFormBuilder(), formList = _a.formList, selectedField = _a.selectedField, addField = _a.addField, clearDropEreas = _a.clearDropEreas, addFieldConponent = _a.addFieldConponent;
    var ref = useRef(null);
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    return (<>
      <div ref={ref} className="flex flex-col items-start justify-center w-full mx-auto text-center ">
        <div className="flex flex-row items-center justify-between w-full max-w-7xl">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="flex flex-col items-start justify-start text-left">
            <h1 className="font-bold leading-none uppercase text-heading">
              <strong>{'MANAGE FORM'}</strong>
            </h1>
            {/* <Breadcrumbs label="FORM" /> */}
          </motion.div>
        </div>
        {<FormBuilder onSave={function (data) {
                setIsOpen(true);
            }}/>}
        <div className="w-full h-16 spacer"/>
      </div>
      {isOpen && (<FormBaseModalGenerator isOpen={isOpen} setIsOpen={setIsOpen} formList={formList}/>)}
    </>);
}
export { FormBuilderProvider, useFormBuilder, } from '@contexts/formBuilder-context';
//# sourceMappingURL=index.jsx.map