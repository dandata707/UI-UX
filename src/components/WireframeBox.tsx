import React, { useState } from 'react';
import { Bike } from 'lucide-react';

interface WireframeImagePlaceholderProps {
  className?: string;
  label?: string;
  sublabel?: string;
  aspectRatio?: string;
  height?: string | number;
  imageUrl?: string;
  alt?: string;
}

/**
 * Universal Mobile Prototype Image Component
 * Renders real high-res motorbike imagery with hover zoom effect and resilient SVG fallback.
 */
export const WireframeImagePlaceholder: React.FC<WireframeImagePlaceholderProps> = ({
  className = '',
  label = 'ẢNH',
  imageUrl,
  alt = 'Xe máy Đà Lạt',
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // If real image URL is available and hasn't errored
  if (imageUrl && !imageFailed) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden rounded-md bg-slate-100 border border-slate-200 group/img ${className}`}
      >
        <img
          src={imageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/img:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Graceful fallback with the primary brand color
  return (
    <div
      className={`relative w-full h-full border border-blue-900/30 rounded-md bg-gradient-to-br from-blue-950/10 via-slate-100 to-slate-200 flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-200 hover:border-blue-800 ${className}`}
    >
      {/* Subtle background motorbike watermark */}
      <div className="text-blue-900/20 mb-1">
        <Bike size={24} />
      </div>
      <div className="relative z-10 px-2 py-0.5 bg-white/90 border border-blue-900/20 rounded shadow-xs text-center">
        <div className="text-[9px] font-mono font-bold text-blue-950 tracking-wider">
          {label || 'ẢNH XE'}
        </div>
      </div>
    </div>
  );
};
