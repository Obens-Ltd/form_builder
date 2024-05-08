import { Tooltip } from '@mui/material';
import classNames from 'classnames';
import { IoReloadOutline } from 'react-icons/io5';

export const RefreshButton = (props: {
  onClick: () => void;
  isLoading: boolean;
}) => (
  <Tooltip title="Refresh">
    <button
      className="p-2 rounded-full hover:bg-gray-100 text-primary-500 hover:text-primary-800 max-w-max"
      onClick={props.onClick}
    >
      <IoReloadOutline
        className={classNames(
          props.isLoading && 'animate-spin cursor-not-allowed',
          'w-5 h-5',
        )}
      />
    </button>
  </Tooltip>
);

export const ButtonLayout = (props: {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  isLoading: boolean;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}) => (
  <div
    className={classNames(props.className, 'flex flex-row justify-end gap-x-3')}
  >
    {props.icon}
    <Tooltip title={props.title}>
      <button
        className={classNames(
          'p-2 bg-gray-100 rounded-full text-primary-500 hover:text-primary-800 max-w-max ',
          props.isActive && 'bg-primary-500',
          props.isLoading && 'cursor-not-allowed',
        )}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </Tooltip>
  </div>
);
