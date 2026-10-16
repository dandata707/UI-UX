import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ScreenPopupProps {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ScreenPopup: React.FC<ScreenPopupProps> = ({ label, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;

      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex="0"]'
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="relative flex max-h-full w-full min-w-0 flex-col overflow-y-auto overscroll-contain rounded-3xl border border-white/80 bg-[var(--surface-app-bg)] text-slate-900 shadow-2xl outline-none"
      >
        <button
          type="button"
          aria-label="Đóng popup"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-[var(--text-primary)] shadow-md transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
        {children}
      </div>
    </div>
  );
};
