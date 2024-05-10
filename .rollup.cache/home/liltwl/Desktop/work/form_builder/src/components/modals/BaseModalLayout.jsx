/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Stack, } from '@mui/material';
import cn from 'classnames';
//liltwl was here
export default function BaseModalLayout(props) {
    var _a = useState(false), confirmation = _a[0], setConfirmation = _a[1];
    return (<>
      <Dialog className={(props === null || props === void 0 ? void 0 : props.className) || 'rlative'} onClose={props.withConfimation
            ? function () { return setConfirmation(true); }
            : function () { return props.setIsOpen(false); }} open={props.isOpen} fullWidth scroll="body" maxWidth={props.maxWidth || 'md'} PaperProps={{ sx: { overflowY: 'visible' } }}>
        <DialogContent sx={{ width: '100%' }} style={{ overflowY: 'visible' }}>
          <DialogTitle sx={{ p: 0 }}>
            <p className="px-2 text-xl font-semibold text-gray-900">
              {props.title}
            </p>
          </DialogTitle>
          <p className="w-full px-2 mb-4 text-xs text-gray-600 leading-4">
            {props.description}
          </p>
          <form onSubmit={props.onSubmit}>
            <div>
              <Stack direction="column" spacing={1}>
                {props.children}
              </Stack>
            </div>

            <div className="w-full">
              <div className="flex justify-center w-full pt-4 sm:px-0">
                {/* TODO: !not not */}
                {!(props === null || props === void 0 ? void 0 : props.isSubmitable) && (<ModalSubmitButton Disabled={props === null || props === void 0 ? void 0 : props.SubmitDisabled} text={props.submitText || 'Submit'} loading={props.loading} onSubmit={props.onSubmit} className={props.submitClassName}/>)}
                <ModalCancelButton text={props.cancelText || 'Cancel'} closeModal={props.withConfimation
            ? function () { return setConfirmation(true); }
            : function () { return props.setIsOpen(false); }} isSubmitable={props.isSubmitable} className={props.cancelClassName}/>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog className="confirmation" open={confirmation} onClose={function () { return setConfirmation(false); }}>
        <div className="flex flex-col justify-center px-12 py-6 bg-gray-50 rounded-xl">
          <DialogTitle>
            <span className="px-2 text-xl font-semibold text-center text-gray-900">
              {'Are you sure you want to proceed?'}
            </span>
            <p className="w-full px-2 mb-4 text-xs text-center text-gray-700 leading-4">
              {'Please confirm the dialog closing!'}
            </p>
          </DialogTitle>

          <Box sx={{ px: 8 }}>
            <div className="flex justify-center gap-x-3">
              <button className="py-2 font-semibold text-white bg-red-500 border border-red-500 rounded-md w-28 hover:bg-red-600" onClick={function () {
            setConfirmation(false);
            props.setIsOpen(false);
        }}>
                {'Confirm'}
              </button>
              <button onClick={function () { return setConfirmation(false); }} className="py-3 text-sm font-semibold border rounded cursor-pointer transition duration-150 ease-in-out w-28 hover:text-primary-600 hover:border-primary-600 hover:shadow-lg border-primary-500 focus:outline-none text-primary-500">
                {'Cancel'}
              </button>
            </div>
          </Box>
        </div>
      </Dialog>
    </>);
}
export function ModalSubmitButton(props) {
    return (<button type="button" className={cn((props.Disabled ? 'cursor-not-allowed opacity-50' : '') +
            'inline-flex items-center justify-center px-8 py-2 text-sm font-medium text-white border border-transparent bg-primary-500 hover:bg-primary-400 rounded-md focus:outline-none transition-colors duration-150 gap-3', props.className)} disabled={(props === null || props === void 0 ? void 0 : props.Disabled) || (props === null || props === void 0 ? void 0 : props.loading)} onClick={props.onSubmit}>
      {props.text || 'Submit'}
      {props.loading && (<svg className="inline-flex w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>)}
    </button>);
}
export function ModalCancelButton(props) {
    return (<div onClick={props.closeModal} className={cn({
            'inline-flex items-center justify-center px-8 py-2 hover:cursor-pointer text-sm font-medium text-white border border-transparent bg-primary-500 hover:bg-primary-400 rounded-md focus:outline-none transition-colors duration-150 gap-3': props.isSubmitable,
            'px-8 py-3 ml-3 text-sm rounded cursor-pointer focus:outline-none transition duration-150 ease-in-out text-primary-500': !props.isSubmitable,
        }, props.className)}>
      {props.text || (props.isSubmitable ? 'Ok' : 'Cancel')}
    </div>);
}
//# sourceMappingURL=BaseModalLayout.jsx.map