// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { cn } from '@/lib/utils';

// import 'overlayscrollbars/css/OverlayScrollbars.css';

type ScrollbarProps = {
  options?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  options,
  children,
  style,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'scrollbar scrollbar-thumb-base-100 scrollbar-track-base-200 overflow-y-scroll os-theme-thin',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Scrollbar;
