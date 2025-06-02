import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { hapticFeedback } from '@/features/hooks/useTelegramFeature.ts';
import { CloseIcon } from '@/shared/icons/close_icon.tsx';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  return ReactDOM.createPortal(
    <BottomSheet
      open={isOpen}
      onDismiss={() => {
        hapticFeedback('light');
        onClose();
      }}
    >
      <div
        className={classNames('bg-bw w-full max-w-md rounded-t-lg', className)}
      >
        <button
          onClick={() => {
            hapticFeedback('light');
            onClose();
          }}
          className="flex items-center justify-center cursor-pointer active-click absolute z-10 bg-button-additional w-7 h-7 top-4 right-4 rounded-full text-primary"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </BottomSheet>,
    document.body
  );
};
