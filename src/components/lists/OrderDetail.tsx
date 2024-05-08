import React from 'react';

import { IoPencilOutline } from 'react-icons/io5';

const OrderDetail = ({
  title,
  value,
  onEdit,
  canEdit = true,
}: {
  title: string;
  value: any;
  onEdit: () => void;
  canEdit?: boolean;
}) => (
  <div className="px-8 py-4 border-b md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1">
    <p className="text-gray-600">{title}</p>
    <div className="flex flex-row items-center justify-between gap-4">
      <article className="flex flex-col gap-4">
        {value
          ? value
              .toString()
              .split('\n')
              .map((line, index) => (
                <p className="text-gray-800" key={index}>
                  {line}
                </p>
              ))
          : '-'}
      </article>
      {canEdit && (
        <button
          onClick={onEdit}
          className="flex items-center p-0 m-0 text-primary-400 hover:text-primary-600 transition-colors duration-150"
        >
          <span className="mr-1 text-xs leading-none">Edit</span>
          <IoPencilOutline className="w-3 h-3 !m-0" />
        </button>
      )}
    </div>
  </div>
);

export default OrderDetail;
