import React from 'react';
import {
  LayoutGrid,
  Smartphone,
  Edit3,
  MessageSquare,
  Sparkles,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  BookOpen,
} from 'lucide-react';
import { ScreenId } from '../types/wireframe';

interface ToolbarProps {
  viewMode: 'canvas' | 'single';
  onViewModeChange: (mode: 'canvas' | 'single') => void;
  activeScreenId: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  isPlaceholderMode: boolean;
  onTogglePlaceholderMode: () => void;
  isCommentMode: boolean;
  onToggleCommentMode: () => void;
  commentCount: number;
  onOpenComments: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onResetAllEdits: () => void;
  onOpenUxLaws: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  activeScreenId,
  onSelectScreen,
  isEditMode,
  onToggleEditMode,
  isPlaceholderMode,
  onTogglePlaceholderMode,
  isCommentMode,
  onToggleCommentMode,
  commentCount,
  onOpenComments,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onResetAllEdits,
  onOpenUxLaws,
}) => {
  const screens: { id: ScreenId; label: string; num: string }[] = [
    { id: 'search', label: '1. Tìm xe', num: '1' },
    { id: 'calendar', label: '1a. Chọn thời gian', num: '1a' },
    { id: 'location', label: '1b. Chọn điểm giao nhận', num: '1b' },
    { id: 'results', label: '2. Kết quả tìm kiếm', num: '2' },
    { id: 'results-dropdown', label: '2a. Kết quả giao tận nơi', num: '2a' },
    { id: 'detail', label: '3. Chi tiết 1 phương án', num: '3' },
    { id: 'share-single', label: '3a. Chia sẻ 1 xe', num: '3a' },
    { id: 'compare-1', label: '4a. Bảng so sánh 2 xe', num: '4a' },
    { id: 'compare-2', label: '4b. Bảng so sánh 3 xe', num: '4b' },
    { id: 'compare-3', label: '4c. Bảng so sánh 4 xe', num: '4c' },
    { id: 'share', label: '5. Chia sẻ bảng so sánh', num: '5' },
    { id: 'saved', label: '6. Đã lưu', num: '6' },
  ];

  return (
    <header className="bg-[var(--color-primary-deep)] text-white border-b-2 border-blue-900 px-4 py-2 shrink-0 z-40 select-none font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Project Brand & IA Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded border-2 border-white bg-[var(--color-primary)] text-white font-black text-sm flex items-center justify-center font-mono">
              WF
            </span>
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>Đà Lạt Ride – Thuê xe máy</span>
                <span className="text-[10px] bg-slate-800 text-slate-200 px-1.5 py-0.2 rounded border border-slate-600 font-bold">
                  Khung 390×844
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                1 → 1a → 1b → 2 → 2a → 3 → 3a → 4a → 4b → 4c → 5 → 6 (12 khung)
              </div>
            </div>
          </div>

          <div className="hidden lg:block h-6 w-px bg-slate-800"></div>

          {/* View Mode Switcher: Canvas vs Single Screen Prototype */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              type="button"
              onClick={() => onViewModeChange('canvas')}
              className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'canvas'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Xem 12 khung liên hoàn trên mặt phẳng canvas"
            >
              <LayoutGrid size={13} />
              <span>Canvas Toàn Cảnh (12 Khung)</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('single')}
              className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Trải nghiệm tương tác từng màn hình trên 1 điện thoại"
            >
              <Smartphone size={13} />
              <span>Điện Thoại Tương Tác</span>
            </button>
          </div>
        </div>

        {/* Center: Screen Quick Nav (If in single view mode) */}
        {viewMode === 'single' && (
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700 text-xs overflow-x-auto max-w-xl">
            {screens.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer shrink-0 ${
                  activeScreenId === s.id
                    ? 'bg-white text-slate-900'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Right: Interactive Features Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* 8 UX Laws Inspector Button */}
          <button
            type="button"
            onClick={onOpenUxLaws}
            className="px-2.5 py-1.5 rounded font-bold flex items-center gap-1.5 transition-all cursor-pointer border-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white border-blue-200 shadow-xs"
            title="Xem bảng đối chiếu 8 nguyên tắc UX Law theo slide bài giảng"
          >
            <BookOpen size={13} className="text-blue-200" />
            <span>8 UX Laws</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            type="button"
            onClick={onToggleEditMode}
            className={`px-2.5 py-1.5 rounded font-bold flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              isEditMode
                ? 'bg-white text-slate-900 border-white shadow-sm ring-2 ring-slate-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Bật/Tắt chế độ nhấp chuột để sửa chữ trực tiếp trên Wireframe"
          >
            <Edit3 size={13} />
            <span>{isEditMode ? 'Đang sửa chữ' : 'Sửa chữ trực tiếp'}</span>
          </button>

          {/* Placeholder Toggle */}
          <button
            type="button"
            onClick={onTogglePlaceholderMode}
            className={`px-2.5 py-1.5 rounded font-bold flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              isPlaceholderMode
                ? 'bg-amber-950 text-amber-200 border-amber-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Chuyển đổi giữa Placeholder '000.000đ, thời điểm' và dữ liệu 6 shop thực tế Đà Lạt"
          >
            <Sparkles size={13} className={isPlaceholderMode ? 'text-amber-400' : 'text-slate-400'} />
            <span>
              {isPlaceholderMode ? 'Placeholder (000.000đ)' : 'Dữ liệu 6 shop'}
            </span>
          </button>

          {/* Comment Pin Mode Toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleCommentMode}
              className={`px-2.5 py-1.5 rounded font-bold flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
                isCommentMode
                  ? 'bg-white text-slate-900 border-white ring-2 ring-slate-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Bật chế độ nhấp vào màn hình để ghim góp ý"
            >
              <MessageSquare size={13} />
              <span>Ghim góp ý</span>
            </button>

            <button
              type="button"
              onClick={onOpenComments}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Mở danh sách tất cả bình luận"
            >
              <span>{commentCount}</span>
            </button>
          </div>

          {/* Canvas Zoom controls */}
          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded border border-slate-700">
              <button
                type="button"
                onClick={onZoomOut}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut size={13} />
              </button>
              <button
                type="button"
                onClick={onResetZoom}
                className="px-1.5 text-[10px] font-bold text-slate-300 hover:text-white cursor-pointer"
                title="Khôi phục 100%"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={onZoomIn}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          )}

          {/* Reset all edits */}
          <button
            type="button"
            onClick={onResetAllEdits}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 cursor-pointer"
            title="Khôi phục toàn bộ văn bản và dữ liệu gốc"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </header>
  );
};
