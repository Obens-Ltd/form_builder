import cn from 'classnames';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function AsyncLoading({ size = 100 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <ScaleLoader color="#228896" loading={true} size={size} />
      <span
        className={cn(
          'font-semibold leading-none',
          size > 50 ? 'text-sm' : 'text-xs',
        )}
      ></span>
    </div>
  );
}
