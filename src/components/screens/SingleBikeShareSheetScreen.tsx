import React, { useState } from 'react';
import { Share2, Copy, Check, Download, Send } from 'lucide-react';
import { MotorbikeOption, Shop, EditableTextMap } from '../../types/wireframe';
import { EditableText } from '../EditableText';
import { WireframeImagePlaceholder } from '../WireframeBox';

interface SingleBikeShareSheetScreenProps {
  option: MotorbikeOption;
  shop: Shop;
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  onClose: () => void;
}

export const SingleBikeShareSheetScreen: React.FC<SingleBikeShareSheetScreenProps> = ({
  option,
  shop,
  isEditMode,
  editableTexts,
  onTextChange,
  isPlaceholderMode,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [savedImage, setSavedImage] = useState(false);
  const shareUrl = `https://dalatride.vn/x/${option.id}`;

  const formatPrice = (price: number) => {
    if (isPlaceholderMode) return '000.000đ';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveImage = () => {
    setSavedImage(true);
    setTimeout(() => setSavedImage(false), 3000);
  };

  return (
    <div className="w-full min-w-0 bg-white p-4 space-y-3.5 select-none">
        {/* Grabber Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />

        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 pr-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
              <Share2 size={14} />
            </div>
            <EditableText
              id="share_single_title"
              defaultText="Chia sẻ xe này"
              isEditMode={isEditMode}
              value={editableTexts['share_single_title']}
              onChange={onTextChange}
              className="font-bold text-xs uppercase block text-[var(--text-primary)] tracking-wide"
            />
          </div>
        </div>

        {/* Preview Card với ẢNH THẬT */}
        <div className="border border-slate-200 bg-slate-50/70 p-3 rounded-2xl flex items-start gap-3 shadow-2xs">
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-2xs">
            <WireframeImagePlaceholder
              label="ẢNH"
              imageUrl={option.imageUrl}
              alt={option.bikeName}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-xs font-bold uppercase text-[var(--text-primary)] truncate">
              {option.bikeName}
            </div>
            <div className="text-[10px] text-slate-500 truncate font-medium">{shop.name}</div>
            <div className="text-xs font-bold text-[var(--text-primary)] border-t border-dashed border-slate-200 pt-1">
              Giá trọn gói: {formatPrice(option.dailyRate)}/ngày
            </div>
            <div className="text-[9px] text-slate-400">
              Cập nhật: {option.lastUpdated}
            </div>
          </div>
        </div>

        {/* Link & Sao chép Box */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase text-slate-600">
            <span>ĐƯỜNG DẪN XEM XE:</span>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-200 focus-within:border-[var(--color-primary)] p-1.5 pl-3 rounded-xl bg-slate-50">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none select-all"
            />
            <button
              onClick={handleCopy}
              type="button"
              className="px-3 py-1.5 rounded-lg border border-slate-500 bg-white text-[var(--text-primary)] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={12} strokeWidth={3} />
                  <span>ĐÃ CHÉP</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>SAO CHÉP</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action: Lưu thành ảnh & Gửi Zalo / SMS */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={handleSaveImage}
            type="button"
            className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-2xs ${
              savedImage
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
            }`}
          >
            <Download size={13} className="text-[var(--color-primary)]" />
            <span>{savedImage ? 'ĐÃ LƯU ẢNH' : 'LƯU THÀNH ẢNH'}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: option.bikeName,
                  text: `Xem xe thuê ${option.bikeName} tại Đà Lạt:`,
                  url: shareUrl,
                });
              } else {
                handleCopy();
              }
            }}
            type="button"
            className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <Send size={13} className="text-[var(--color-primary)]" />
            <span>GỬI ZALO / SMS</span>
          </button>
        </div>

        {/* Nút chính duy nhất: [ HOÀN TẤT & ĐÓNG ] MÀU CAM */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[48px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/25 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-wider"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>HOÀN TẤT &amp; ĐÓNG</span>
          </button>
        </div>
    </div>
  );
};
