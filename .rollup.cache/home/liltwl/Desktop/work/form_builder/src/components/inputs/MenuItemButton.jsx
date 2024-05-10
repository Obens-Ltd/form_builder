import { Menu } from '@headlessui/react';
export var MenuItemButton = function (_a) {
    var setModalData = _a.setModalData, setIsModalEditOpen = _a.setIsModalEditOpen, ingredient = _a.ingredient, text = _a.text, children = _a.children, setFetchData = _a.setFetchData;
    var dict = {
        'Harvest Template': 'lot',
        'Supply Mapping Template': 'supplyMappingTemplate',
        'Traceability Template': 'trace_defalut_template',
    };
    return (<Menu.Item>
      {function (_a) {
            var active = _a.active;
            return (<button className={"".concat(active ? 'bg-primary-500 text-white' : 'text-gray-900', " group flex rounded-md items-center px-2 py-1 text-xs w-full")} onClick={function () {
                    setModalData(ingredient);
                    if (setIsModalEditOpen !== null) {
                        setIsModalEditOpen(true);
                    }
                    // else setFetchData(dict[text]);
                }}>
          {children}
          <span className="whitespace-nowrap">{text}</span>
        </button>);
        }}
    </Menu.Item>);
};
export default MenuItemButton;
//# sourceMappingURL=MenuItemButton.jsx.map