/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
// import { getToken } from '@utils/auth-token';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
// import { useToasts } from 'react-toast-notifications';

import TextInput from '@components/inputs/TextInput';

import ImageUpload from './inputs/ImageUpload';

export default function CreateProductTypeModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (x: boolean) => void;
  onSuccess: (name: string) => void;
}) {
  // const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    console.log(formData);
    onSuccess(formData?.name);
    // try {
    //   if (selectedImage) {
    //     const fd = new FormData();
    //     fd.append('upload_preset', 'cfv5bt12');
    //     fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    //     fd.append('file', selectedImage);
    //     const resp = await fetch(
    //       `https://api.cloudinary.com/v1_1/${'obens'}/upload`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'X-Requested-With': 'XMLHttpRequest',
    //         },
    //         body: fd,
    //       },
    //     );

    //     if (resp.status === 200) {
    //       const data = await resp.json();
    //       formData.image_url = data.secure_url;
    //     } else {
    //       throw new Error('Error uploading image');
    //     }
    //   }

    //   const resp = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT}/product_type`,
    //     {
    //       method: 'POST',
    //       mode: 'cors',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + getToken(),
    //       },
    //       body: JSON.stringify({
    //         name: formData.name,
    //         image: {
    //           name: selectedImage?.name,
    //           url: formData.image_url,
    //         },
    //       }),
    //     },
    //   );

    //   if (resp.status === 200) {
    // addToast(
    //   <>
    //     <p className="pb-2 text-sm font-normal text-gray-600">
    //       The new ingredients has been created successfully.
    //     </p>
    //   </>,
    //   { appearance: 'success' },
    // );
    //     onSuccess();
    //     reset();
    //     setIsModalOpen(false);
    //   } else
    //     // addToast(
    //     //   <>
    //     //     <p className="pb-2 text-sm font-normal text-gray-600">
    //     //       An error occurred while creating the ingredients.
    //     //     </p>
    //     //   </>,
    //     //   { appearance: 'error' },
    //     // );
    // } catch (error) {
    //   // addToast(
    //   //   <>
    //   //     <p className="pb-2 text-sm font-normal text-gray-600">
    //   //       Something went wrong. Please try again later.
    //   //     </p>
    //   //   </>,
    //   //   { appearance: 'error' },
    //   // );
    // }

    setIsLoading(false);
  };

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 pointer-events-none bg-primary-900 opacity-20" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="inline-block w-full max-w-3xl p-6 my-8 text-left align-middle bg-white rounded-lg shadow-xl transition-all transform">
                <Dialog.Title
                  as="h3"
                  className="px-2 text-xl font-semibold text-gray-900"
                >
                  Create new ingredients
                </Dialog.Title>
                <p className="w-full px-2 mb-4 text-xs text-gray-600 leading-4">
                  Please fill in the form below to create a new ingredients.
                </p>

                <form
                  id="information-general"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <div
                      className={cn(
                        'bg-white rounded-xl p-3',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      )}
                    >
                      <div
                        className={cn(
                          isLoading && 'pointer-events-none opacity-50',
                          'mt-6 px-2',
                        )}
                      >
                        <div className="w-full mb-6 grid grid-cols-1 gap-4">
                          <div className="w-full grid grid-cols-2 gap-4">
                            <ImageUpload
                              selectedImage={selectedImage}
                              setSelectedImage={setSelectedImage}
                            />

                            <TextInput
                              id="name"
                              fieldName="Ingredient"
                              required
                              register={register('name', {
                                required:
                                  "Please fill in the ingredient's name",
                              })}
                              error={errors?.name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-center w-full pt-4 sm:px-0">
                      <button
                        type="submit"
                        className={cn(
                          isLoading ? 'cursor-not-allowed opacity-50' : '',
                          'flex items-center justify-center px-8 text-sm font-semibold text-white py-1.5 bg-primary-400 rounded-md hover:bg-primary-500 focus:bg-primary-600 focus:outline-none transition-all duration-300 shadow-primary-btn gap-4',
                        )}
                        disabled={isLoading}
                      >
                        Submit
                        {isLoading && (
                          <svg
                            className="inline-flex w-4 h-4 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        )}
                      </button>

                      <div
                        onClick={() => setIsModalOpen(false)}
                        className="px-8 py-3 ml-3 text-sm rounded cursor-pointer focus:outline-none transition duration-150 ease-in-out text-primary-500"
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <style jsx>{`
        .hasImage:hover section {
          background-color: rgba(5, 5, 5, 0.4);
        }

        .hasImage:hover button:hover {
          background: rgba(5, 5, 5, 0.45);
        }

        .group:hover .group-hover\:text-blue-800 {
          color: #2b6cb0;
        }
      `}</style>
    </>
  );
}
