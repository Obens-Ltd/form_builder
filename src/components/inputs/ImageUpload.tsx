/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { useDropzone } from 'react-dropzone';

import ImageFallback from '@components/common/ImageFallback';

export default function ImageUpload({
  defaultFile = null,
  selectedImage,
  setSelectedImage,
  setShouldRemove,
}: {
  defaultFile?: { name: string; url: string } | null;
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  setShouldRemove?: (status: boolean) => void;
}) {
  const [modalDataImage, setModalDataImage] = useState(defaultFile);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/*,application/pdf',
    maxSize: 1024 * 1024 * 2,
    onDropAccepted: (acceptedFiles: any) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

  return (
    <>
      {!selectedImage && !modalDataImage?.url ? (
        <div
          className="relative flex flex-col items-center justify-center p-4 border-2 border-gray-400 border-dashed rounded cursor-pointer group col-span-2 bg-[#e7eaef] h-44 max-h-44"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <ImageFallback
            src="/assets/images/image-upload.png"
            className="w-auto h-full"
            alt="upload"
          />
          <div className="absolute w-full h-full bg-black border-2 border-gray-200 border-dashed rounded opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="relative w-full text-transparent bg-gray-100 border border-gray-200 group hasImage h-44 max-h-44 rounded-md focus:outline-none focus:shadow-outline hover:text-white shadow-sm col-span-2">
          <ImageFallback
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : modalDataImage?.url
            }
            alt="upload preview"
            className="sticky object-cover w-full h-full bg-fixed img-preview rounded-md"
          />

          <section className="absolute top-0 z-20 flex flex-col w-full h-full px-3 py-2 text-xs break-words rounded-md">
            <h1 className="flex-1">
              {selectedImage ? selectedImage.name : modalDataImage?.name}
            </h1>
            <div className="flex">
              <span className="p-1">
                <i>
                  <svg
                    className="w-4 h-4 ml-auto fill-current pt-"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                  </svg>
                </i>
              </span>

              <p className="p-1 text-xs size">
                {selectedImage
                  ? selectedImage.size > 1024
                    ? selectedImage.size > 1048576
                      ? Math.round(selectedImage.size / 1048576) + 'mb'
                      : Math.round(selectedImage.size / 1024) + 'kb'
                    : selectedImage.size + 'b'
                  : '- b'}
              </p>
              <button
                type="button"
                className="p-1 ml-auto delete focus:outline-none hover:bg-gray-300 rounded-md"
                onClick={() => {
                  setSelectedImage(null);
                  setModalDataImage(null);
                  setShouldRemove && setShouldRemove(true);
                }}
              >
                <svg
                  className="w-4 h-4 ml-auto pointer-events-none fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="pointer-events-none"
                    d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      )}

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
