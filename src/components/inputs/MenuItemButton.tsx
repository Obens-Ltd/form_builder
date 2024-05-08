import { Menu } from '@headlessui/react';

export const MenuItemButton = ({
  setModalData,
  setIsModalEditOpen,
  ingredient,
  text,
  children,
  setFetchData,
}: {
  setModalData: any;
  setIsModalEditOpen: any;
  ingredient: any;
  text: string;
  children: any;
  setFetchData?: any;
}) => {
  const dict = {
    'Harvest Template': 'lot',
    'Supply Mapping Template': 'supplyMappingTemplate',
    'Traceability Template': 'trace_defalut_template',
  };
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-primary-500 text-white' : 'text-gray-900'
          } group flex rounded-md items-center px-2 py-1 text-xs w-full`}
          onClick={() => {
            setModalData(ingredient);
            if (setIsModalEditOpen !== null) {
              setIsModalEditOpen(true);
            }
            // else setFetchData(dict[text]);
          }}
        >
          {children}
          <span className="whitespace-nowrap">{text}</span>
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItemButton;
