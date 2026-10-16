import React from 'react';
import { Bookmark, Clock, Share2, ArrowRightLeft, Trash2 } from 'lucide-react';
import { EditableText } from '../EditableText';
import { EditableTextMap, MotorbikeOption } from '../../types/wireframe';
import { WireframeImagePlaceholder } from '../WireframeBox';

interface SavedScreenProps {
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  savedOptions: MotorbikeOption[];
  pickupDate: string;
  returnDate: string;
  onDeleteSaved: () => void;
  onGoToCompare: () => void;
  onOpenShare: () => void;
  onGoToSearch: () => void;
  wireframeStyle?: 'wireframe' | 'realistic';
  forcedEmptyState?: boolean;
  isSaved?: boolean;
}

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('vi-VN').format(price)}đ`;

const formatShortDate = (date: string) => date.split('/').slice(0, 2).join('/');

export const SavedScreen: React.FC<SavedScreenProps> = ({
  isEditMode,
  editableTexts,
  onTextChange,
  isPlaceholderMode,
  savedOptions,
  pickupDate,
  returnDate,
  onDeleteSaved,
  onGoToCompare,
  onOpenShare,
  onGoToSearch,
  forcedEmptyState,
  isSaved = false,
}) => {
  const isEmpty = forcedEmptyState || !isSaved || savedOptions.length < 2;
  const bikeNames = savedOptions.map((option) => option.bikeName.split(' (')[0]);
  const totals = savedOptions.map((option) => option.totalEstimate);
  const minTotal = totals.length ? Math.min(...totals) : 0;
  const maxTotal = totals.length ? Math.max(...totals) : 0;
  const priceRange =
    minTotal === maxTotal
      ? formatPrice(minTotal)
      : `${formatPrice(minTotal)} - ${formatPrice(maxTotal)}`;
  const comparisonTitle = `SO SÁNH ${formatShortDate(pickupDate)} - ${formatShortDate(returnDate)}`;

  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-app-bg)] text-slate-900 select-none">
      <div className="bg-white border-b border-slate-200 px-3.5 py-2.5 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Bookmark size={16} />
            </div>
            <div>
              <EditableText
                id="saved_header_title"
                defaultText="ĐÃ LƯU"
                isEditMode={isEditMode}
                value={editableTexts.saved_header_title}
                onChange={onTextChange}
                className="text-xs font-bold uppercase block text-[var(--text-primary)] tracking-wide"
              />
              <span className="text-[10px] text-slate-500 font-medium">
                Các bảng so sánh xe Đà Lạt đã lưu
              </span>
            </div>
          </div>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-900/10 font-bold">
            {isEmpty ? '0 bảng' : '1 bảng'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-12">
            <div className="w-20 h-20 mb-3">
              <WireframeImagePlaceholder label="ẢNH" />
            </div>
            <div className="font-bold text-xs uppercase text-[var(--text-primary)]">
              CHƯA CÓ BẢNG SO SÁNH NÀO
            </div>
            <p className="text-[11px] text-slate-500 mt-1 max-w-[260px] leading-relaxed">
              Bạn chưa lưu bảng so sánh nào. Hãy chọn xe, mở bảng so sánh và bấm Lưu để xem lại tại đây.
            </p>
            <button
              type="button"
              onClick={onGoToSearch}
              className="mt-5 min-h-[46px] px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.03] active:scale-95 transition-all"
            >
              TÌM XE
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-end text-[10px] font-medium">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-900/10 font-bold">
                ✓ ĐÃ LƯU
              </span>
            </div>

            <div className="border border-slate-200 hover:border-blue-900/40 bg-white p-3.5 rounded-2xl space-y-3 shadow-xs hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold uppercase text-[var(--text-primary)]">
                    {comparisonTitle}
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5 truncate">
                    {savedOptions.length} xe: {bikeNames.join(', ')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-900/10 font-bold">
                    {savedOptions.length}/3 XE
                  </span>
                  <button
                    type="button"
                    onClick={onDeleteSaved}
                    className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center cursor-pointer transition-colors shadow-2xs hover:scale-105 active:scale-95"
                    title="Xóa bảng so sánh này"
                    aria-label="Xóa bảng so sánh này"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className={`grid ${savedOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2 py-1`}>
                {savedOptions.map((option) => (
                  <div
                    key={option.id}
                    className="border border-slate-100 rounded-xl p-1.5 bg-slate-50/70 text-center shadow-2xs min-w-0"
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden mb-1">
                      <WireframeImagePlaceholder
                        label="ẢNH"
                        imageUrl={option.imageUrl}
                        alt={option.bikeName}
                      />
                    </div>
                    <div className="text-[9px] font-bold text-[var(--text-primary)] truncate">
                      {option.bikeName}
                    </div>
                    <div className="text-[8px] text-slate-500 font-medium truncate">
                      {formatPrice(option.dailyRate)}/ngày
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-slate-200 pt-2 text-[10px] text-slate-700 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-600">Khoảng giá trọn gói:</span>
                  <span className="font-extrabold text-xs text-[var(--color-primary)] text-right">
                    {isPlaceholderMode ? '000.000đ - 000.000đ' : priceRange}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-slate-500">
                  <Clock size={11} className="text-[var(--color-primary)]" />
                  <span>Đã lưu trong phiên này</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onGoToCompare}
                  className="py-2.5 px-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-tight shadow-md shadow-blue-900/25 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ArrowRightLeft size={13} />
                  <span>XEM LẠI</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenShare}
                  className="py-2.5 px-2 border border-slate-200 hover:border-[var(--color-primary)] bg-white hover:bg-blue-50/50 text-[var(--color-primary)] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-tight transition-all hover:scale-[1.02] active:scale-95 shadow-2xs"
                >
                  <Share2 size={13} />
                  <span>CHIA SẺ</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
