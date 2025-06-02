import {ReactNode} from "react";

interface BottomBarProps {
  children: ReactNode;
  className?: string;
}

export const BottomBar = ({ children, className }: BottomBarProps) => {
  return (
    <div className={`fixed bottom-0 pb-5 pt-2 px-4 w-full bg-bw ${className}`}>
      {children}
    </div>
  );
};
