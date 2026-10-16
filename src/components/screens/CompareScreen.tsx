import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Star,
} from 'lucide-react';
import { MotorbikeOption, Shop, EditableTextMap } from '../../types/wireframe';
import { EditableText } from '../EditableText';
import { WireframeImagePlaceholder } from '../WireframeBox';

interface CompareScreenProps {
  options: MotorbikeOption[];
  shops: Shop[];
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  onRemoveOption?: (optionId: string) => void;
  onOpenShareSheet: () => void;
  onBack: () => void;
  onAddMoreOptions: () => void;
  forcedMode?: 'two' | 'three' | 'four' | 'single';
  wireframeStyle?: 'wireframe' | 'realistic';
  isSavedInitial?: boolean;
  onToggleSavedGlobal?: (isSaved: boolean) => void;
}

export const CompareScreen: React.FC<CompareScreenProps> = ({
  options,
  shops,
  isEditMode,
  editableTexts,
  onTextChange,
  isPlaceholderMode,
  onRemoveOption,
  onOpenShareSheet,
  onBack,
  forcedMode = 'two',
  isSavedInitial = false,
  onToggleSavedGlobal,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(isSavedInitial);

  let displayOptions: MotorbikeOption[] = options;
  if (forcedMode === 'two') {
    displayOptions = options.slice(0, 2);
  } else if (forcedMode === 'three') {
    displayOptions = options.slice(0, 3);
  } else if (forcedMode === 'four') {
    displayOptions = options.slice(0, 4);
  }

  const comparisonKey = displayOptions.map((option) => option.id).join('|');

  useEffect(() => {
    setIsSaved(isSavedInitial);
  }, [comparisonKey, isSavedInitial]);

  const count = displayOptions.length;
  const isTwo = count === 2;
  const isThree = count === 3;
  const isFour = count >= 4;
  const comparisonColumns = isTwo
    ? 'grid-cols-2'
    : isThree
    ? 'grid-cols-3'
    : 'grid-cols-4';

  const formatPrice = (price: number) => {
    if (isPlaceholderMode) return '000.000đ';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getShopForOption = (shopId: string) => {
    return shops.find((s) => s.id === shopId) || shops[0];
  };

  const getPreparedAmount = (opt: MotorbikeOption) => {
    if (opt.preparationTotal) return opt.preparationTotal;
    if (opt.id === 'opt-1-1') return '280.000đ';
    if (opt.id === 'opt-2-1') return '535.000đ';
    if (opt.id === 'opt-3-1') return '320.000đ';
    if (opt.id === 'opt-4-1') return '1.400.000đ';
    return formatPrice(opt.totalEstimate);
  };

  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    if (onToggleSavedGlobal) onToggleSavedGlobal(next);
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Top Header */}
      <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center sticky top-0 z-30 bg-white shadow-2xs">
        <button
          onClick={onBack}
          type="button"
          aria-label="Quay lại kết quả tìm kiếm"
          className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-primary)] hover:text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors"
        >
          <ArrowLeft size={19} strokeWidth={2.4} />
        </button>

        <div className="flex-1 text-center">
          <EditableText
            id="compare_header_title"
            defaultText="BẢNG SO SÁNH"
            isEditMode={isEditMode}
            value={editableTexts.compare_header_title}
            onChange={onTextChange}
            className="text-xs font-bold uppercase block text-[var(--text-primary)] tracking-wide"
          />
        </div>
        <span className="w-9" aria-hidden="true" />
      </div>

      {/* Comparison Table: 8 DÒNG RÕ RÀNG */}
      <div
        className={`flex-1 overflow-y-auto pb-28 p-2.5 ${
          isFour ? 'overflow-x-auto' : 'overflow-x-hidden'
        }`}
      >
        <div
          className={`${isFour ? 'min-w-[480px]' : 'w-full'} border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs`}
        >
          {/* DÒNG 1: ẢNH XE - Ảnh xe thật */}
          <div className="border-b border-slate-100">
            <div className="bg-[var(--color-primary)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
              ẢNH XE
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 p-1.5 bg-slate-50/60`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 p-0.5 relative flex flex-col justify-center">
                  {onRemoveOption && count > 2 && (
                    <button
                      onClick={() => onRemoveOption(opt.id)}
                      type="button"
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 text-slate-700 hover:text-red-600 hover:bg-white flex items-center justify-center text-[10px] cursor-pointer z-10 font-bold shadow-xs transition-colors"
                      title="Bỏ khỏi so sánh"
                    >
                      ✕
                    </button>
                  )}
                  <div className={`w-full ${isThree ? 'h-16' : 'h-20'} rounded-lg overflow-hidden shadow-2xs`}>
                    <WireframeImagePlaceholder
                      label="ẢNH"
                      imageUrl={opt.imageUrl}
                      alt={opt.bikeName}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 2: TÊN XE + ĐỜI XE */}
          <div className="border-b border-slate-100">
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              TÊN XE + ĐỜI XE
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-xs py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5 font-bold text-[10px] text-[var(--text-primary)] leading-tight break-words">
                  {opt.bikeName}
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 3: TÊN SHOP + ĐÁNH GIÁ */}
          <div className="border-b border-slate-100">
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              TÊN SHOP + ĐÁNH GIÁ
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-[10px] py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => {
                const shop = getShopForOption(opt.shopId);
                return (
                  <div key={opt.id} className="min-w-0 px-1.5 text-slate-800 leading-tight">
                    <div className="font-bold text-[10px] text-[var(--text-primary)] truncate">{shop.name}</div>
                    <div className="text-[8px] text-amber-700 font-semibold mt-0.5 flex flex-wrap items-center gap-0.5 break-words">
                      <Star size={9} className="fill-amber-400 text-amber-500 shrink-0" />
                      {shop.rating} ({shop.reviewCount}) • {shop.distance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DÒNG 4: GIÁ THUÊ/NGÀY */}
          <div className="border-b border-slate-100">
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              GIÁ THUÊ / NGÀY
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-xs py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5">
                  <div className="font-extrabold text-[11px] text-[var(--color-primary)] break-words">
                    {formatPrice(opt.dailyRate)}
                    <span className="text-[9px] font-normal text-slate-500">/ngày</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 5: PHÍ GIAO XE */}
          <div className="border-b border-slate-100">
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              PHÍ GIAO XE
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-[10px] py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5 font-bold break-words">
                  {opt.deliveryFee === 0 ? (
                    <span className="inline-flex px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[8px] leading-tight text-center">
                      Miễn phí giao
                    </span>
                  ) : (
                    <span className="text-slate-800">+{formatPrice(opt.deliveryFee)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 6: TIỀN CỌC */}
          <div className="border-b border-slate-100">
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              TIỀN CỌC
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-[10px] py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5 text-slate-700 leading-tight break-words">
                  {opt.deposit}
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 7: TỔNG TIỀN CẦN CHUẨN BỊ (NỔI BẬT NHẤT) */}
          <div className="border-b border-blue-200 bg-blue-50">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white flex items-center justify-between gap-2">
              <span className="flex items-center gap-1">★ TỔNG CẦN CHUẨN BỊ</span>
              <span className="text-[8px] font-semibold text-blue-100 whitespace-nowrap">ĐỦ CỌC + PHÍ</span>
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-blue-200 text-xs py-2.5 px-1 bg-gradient-to-br from-blue-50 to-indigo-50`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5">
                  <div className="font-extrabold text-[11px] text-blue-800 leading-snug break-words">
                    {getPreparedAmount(opt)}
                  </div>
                  <div className="text-[8px] text-slate-500 mt-0.5">
                    (Tiền thuê 2 ngày + Phí giao + Cọc)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DÒNG 8: TRANG BỊ & CHÍNH SÁCH */}
          <div>
            <div className="bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
              TRANG BỊ &amp; CHÍNH SÁCH
            </div>
            <div
              className={`grid ${comparisonColumns} divide-x divide-slate-100 text-[9px] py-2 px-1 bg-white`}
            >
              {displayOptions.map((opt) => (
                <div key={opt.id} className="min-w-0 px-1.5 space-y-0.5 text-slate-600 leading-tight break-words">
                  2 mũ BH, 2 áo mưa, cứu hộ 24/7, đổi xe nếu hỏng
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THANH DƯỚI CỐ ĐỊNH: Nút [LƯU] và Nút chính [CHIA SẺ SO SÁNH] MÀU CAM */}
      <div className="sticky bottom-0 px-3 z-20 mt-auto pb-2 bg-gradient-to-t from-white via-white to-transparent pt-3 shrink-0">
        <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-lg flex items-center gap-2">
          {/* Nút lưu */}
          <button
            type="button"
            onClick={handleToggleSave}
            aria-label={isSaved ? 'Bỏ lưu bảng so sánh' : 'Lưu bảng so sánh'}
            className={`min-h-[46px] py-2 rounded-xl text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
              isSaved
                ? 'px-3.5 gap-1.5 bg-[var(--color-primary)] text-white border border-[var(--color-primary)] shadow-sm shadow-blue-900/20'
                : 'px-3.5 gap-1.5 border border-slate-200 hover:border-[var(--color-primary)] bg-white text-slate-700 hover:text-[var(--color-primary)]'
            }`}
            title="Bấm để lưu hoặc bỏ lưu bảng so sánh"
          >
            {isSaved ? (
              <>
                <Check size={16} strokeWidth={3} aria-hidden="true" />
                <span>ĐÃ LƯU</span>
              </>
            ) : (
              <>
                <Bookmark size={14} strokeWidth={2} />
                <span>LƯU</span>
              </>
            )}
          </button>

          {/* Nút chính [ CHIA SẺ SO SÁNH ] -> MÀU CAM NỔI BẬT */}
          <button
            type="button"
            onClick={onOpenShareSheet}
            className="flex-1 min-w-0 min-h-[46px] py-2.5 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
          >
            <span>CHIA SẺ SO SÁNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
