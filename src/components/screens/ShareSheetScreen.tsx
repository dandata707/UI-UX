import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Download,
  Send,
} from 'lucide-react';
import { MotorbikeOption, Shop, EditableTextMap } from '../../types/wireframe';
import { EditableText } from '../EditableText';

interface ShareSheetScreenProps {
  options: MotorbikeOption[];
  shops: Shop[];
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  onClose: () => void;
  customTitle?: string;
  wireframeStyle?: 'wireframe' | 'realistic';
}

export const ShareSheetScreen: React.FC<ShareSheetScreenProps> = ({
  options: _options,
  shops: _shops,
  isEditMode,
  editableTexts,
  onTextChange,
  isPlaceholderMode: _isPlaceholderMode,
  onClose,
  customTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [savedImage, setSavedImage] = useState(false);
  const shareUrl = 'https://dalatride.vn/c/8f3k2';

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

        {/* Tiêu đề nằm gọn trên một dòng, chừa chỗ cho nút đóng popup */}
        <div className="flex min-w-0 items-center gap-2 border-b border-slate-100 pb-2 pr-10">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-primary)]">
            <Share2 size={14} />
          </div>
          <EditableText
            id="share_sheet_title"
            defaultText={customTitle || "CHIA SẺ BẢNG SO SÁNH"}
            isEditMode={isEditMode}
            value={editableTexts['share_sheet_title']}
            onChange={onTextChange}
            className="block min-w-0 truncate whitespace-nowrap text-xs font-bold uppercase tracking-wide text-[var(--text-primary)]"
          />
        </div>

        {/* Link & Sao chép Box */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold uppercase text-slate-600 flex items-center justify-between">
            <span>ĐƯỜNG DẪN SO SÁNH TRỰC TIẾP:</span>
            <span className="text-[9px] text-[var(--color-primary)] font-bold">HIỆU LỰC 30 NGÀY</span>
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
            {savedImage ? (
              <>
                <Check size={13} strokeWidth={3} className="text-emerald-600" />
                <span>ĐÃ LƯU ẢNH</span>
              </>
            ) : (
              <>
                <Download size={13} className="text-[var(--color-primary)]" />
                <span>LƯU THÀNH ẢNH</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            type="button"
            className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 text-[var(--text-primary)] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <Send size={13} className="text-[var(--color-primary)]" />
            <span>GỬI ZALO / SMS</span>
          </button>
        </div>

        {/* Thẻ tóm tắt nội dung được chia sẻ */}
        <div className="border border-slate-200 bg-slate-50/80 p-2.5 rounded-xl space-y-1 text-[10px]">
          <div className="font-bold uppercase text-[var(--text-primary)] border-b border-slate-200 pb-1">
            TÓM TẮT SO SÁNH
          </div>
          <div className="space-y-0.5 text-slate-700">
            <div className="flex items-center justify-between">
              <span>- Số phương án so sánh:</span>
              <span className="font-bold text-[var(--color-primary)]">3 xe máy (Vision, Sirius, Lead)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>- Thời gian thuê:</span>
              <span>18/10/2026 - 20/10/2026 (2 ngày)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>- Khoảng giá trọn gói:</span>
              <span className="font-bold text-orange-600">235.000đ - 320.000đ</span>
            </div>
          </div>
        </div>

        {/* Nút Hoàn tất & Đóng: MÀU CAM NỔI BẬT */}
        <button
          onClick={onClose}
          type="button"
          className="w-full min-h-[48px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-lg shadow-blue-900/25 hover:scale-[1.02] active:scale-95 transition-all"
        >
          HOÀN TẤT &amp; ĐÓNG
        </button>
    </div>
  );
};
