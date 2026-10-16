import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Plus,
  Check,
  ShieldCheck,
  ArrowRightLeft,
  Star,
} from 'lucide-react';
import { Shop, MotorbikeOption, EditableTextMap } from '../../types/wireframe';
import { EditableText } from '../EditableText';
import { WireframeImagePlaceholder } from '../WireframeBox';

interface ResultsScreenProps {
  shops: Shop[];
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  selectedOptionIds: string[];
  onToggleCompare: (option: MotorbikeOption) => void;
  onSelectOptionForDetail: (option: MotorbikeOption, shop: Shop) => void;
  onGoToCompare: () => void;
  onBackToSearch: () => void;
  showEmptyState?: boolean;
  deliveryMode?: 'delivery' | 'pickup';
  isDeliveryDetailView?: boolean;
  deliveryAddress?: string;
  onOpenLocation?: () => void;
  wireframeStyle?: 'wireframe' | 'realistic';
  initialDropdownOpen?: boolean;
  isSubframeView?: boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  shops,
  isEditMode,
  editableTexts,
  onTextChange,
  isPlaceholderMode: _isPlaceholderMode,
  selectedOptionIds,
  onToggleCompare,
  onSelectOptionForDetail,
  onGoToCompare,
  onBackToSearch,
  showEmptyState = false,
  deliveryMode = 'delivery',
  isDeliveryDetailView = false,
  initialDropdownOpen = false,
  isSubframeView = false,
}) => {
  const [activeSort, setActiveSort] = useState<
    'recommended' | 'price' | 'rating' | 'distance'
  >('recommended');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(
    initialDropdownOpen
  );

  const sortLabels: Record<'recommended' | 'price' | 'rating' | 'distance', string> = {
    recommended: 'Đề xuất',
    price: 'Giá tăng dần',
    rating: 'Đánh giá cao',
    distance: 'Gần nhất',
  };

  const sortedShops = [...shops].sort((a, b) => {
    if (activeSort === 'rating') return b.rating - a.rating;
    if (activeSort === 'price') {
      const priceA = a.options[0]?.dailyRate || 0;
      const priceB = b.options[0]?.dailyRate || 0;
      return priceA - priceB;
    }
    if (activeSort === 'distance') {
      const distA = parseFloat(a.distance.replace(/[^\d.]/g, '')) || 0;
      const distB = parseFloat(b.distance.replace(/[^\d.]/g, '')) || 0;
      return distA - distB;
    }
    return 0;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const isDelivery = deliveryMode === 'delivery' || isDeliveryDetailView;
  const isMaxReached = selectedOptionIds.length >= 3;
  const canCompare = selectedOptionIds.length >= 2;

  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Top Sticky Header */}
      <div className="bg-white border-b border-slate-200 px-3.5 py-2.5 sticky top-0 z-30 shadow-2xs">
        <div className="relative mb-2 flex min-h-9 items-center justify-center">
          <button
            type="button"
            aria-label="Quay lại màn Tìm xe"
            onClick={onBackToSearch}
            className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-primary)] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] cursor-pointer transition-colors"
          >
            <ArrowLeft size={19} strokeWidth={2.25} />
          </button>
          <div className="text-center">
            <EditableText
              id="results_header_title"
              defaultText="KẾT QUẢ TÌM XE ĐÀ LẠT"
              isEditMode={isEditMode}
              value={editableTexts['results_header_title']}
              onChange={onTextChange}
              className="text-xs font-bold uppercase block text-[var(--text-primary)] tracking-wide"
            />
            <div className="text-[10px] text-slate-500 font-medium">
              18/10 – 20/10 • 1 xe
            </div>
          </div>
        </div>

        {/* DROPDOWN "Sắp xếp theo: Đề xuất ▾" */}
        <div className="relative pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 font-medium">Sắp xếp theo:</span>
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                isSortDropdownOpen
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-[var(--color-primary)]'
              }`}
            >
              <span>{sortLabels[activeSort]}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Mở dropdown 4 lựa chọn */}
          {isSortDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              {(['recommended', 'price', 'rating', 'distance'] as const).map(
                (sortKey) => {
                  const isSelected = activeSort === sortKey;
                  return (
                    <button
                      key={sortKey}
                      type="button"
                      onClick={() => {
                        setActiveSort(sortKey);
                        if (!isSubframeView) {
                          setIsSortDropdownOpen(false);
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-left text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-white font-bold'
                          : 'bg-white hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">
                          {isSelected ? '●' : '○'}
                        </span>
                        <span>{sortLabels[sortKey]}</span>
                      </span>
                      {isSelected && (
                        <span className="font-bold text-[10px] text-orange-400">✓ Đang chọn</span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {showEmptyState ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 mb-3">
            <WireframeImagePlaceholder label="ẢNH" />
          </div>
          <h3 className="font-bold text-xs uppercase text-[var(--text-primary)]">KHÔNG TÌM THẤY XE PHÙ HỢP</h3>
          <p className="text-[11px] text-slate-500 mt-1 max-w-[240px]">
            Không tìm thấy xe phù hợp với bộ lọc
          </p>
          <button
            onClick={onBackToSearch}
            className="mt-4 px-4 py-2 rounded-xl border border-[var(--color-primary)] bg-white hover:bg-blue-50 text-[var(--color-primary)] text-xs font-bold cursor-pointer transition-all"
          >
            ĐỔI BỘ LỌC
          </button>
        </div>
      ) : (
        <div className="flex-1 p-3 space-y-3 pb-24">
          {/* Danh sách các card cửa hàng */}
          {sortedShops.map((shop) => {
            const [shopDistance, ...shopLocationParts] = shop.distance.split(' • ');
            const shopLocation = shopLocationParts.join(' • ');
            const representativeOption = shop.options[0];
            const isCompared = selectedOptionIds.includes(representativeOption.id);
            const isButtonDisabled = !isCompared && isMaxReached;

            const days = 2;
            const rentalSubtotal = representativeOption.dailyRate * days;
            const deliveryFee = isDelivery ? representativeOption.deliveryFee : 0;
            const totalPrice = rentalSubtotal + deliveryFee;

            return (
              <div
                key={shop.id}
                className="border border-slate-200 hover:border-blue-900/40 bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                {/* Shop header information */}
                <div className="p-2.5 border-b border-slate-100 bg-slate-50/80 group-hover:bg-blue-50/20 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 truncate font-bold text-xs uppercase text-[var(--text-primary)] tracking-tight">
                      {shop.name}
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-blue-900/10 bg-white px-2 py-0.5 text-[9px] text-slate-500 shadow-2xs">
                      <Clock size={10} className="text-[var(--color-primary)]" />
                      <span>Cập nhật 5 phút trước</span>
                    </div>
                  </div>
                  <div className="mt-1 flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[10px] text-slate-600">
                    <span className="flex shrink-0 items-center gap-0.5 font-bold text-amber-600">
                      <Star size={11} className="fill-amber-400 text-amber-500" />
                      {shop.rating} ({shop.reviewCount})
                    </span>
                    <span className="shrink-0">•</span>
                    <span className="shrink-0 font-semibold text-slate-800">{shopDistance}</span>
                    {shopLocation && (
                      <>
                        <span className="shrink-0">•</span>
                        <span className="min-w-0 truncate font-semibold text-slate-800" title={shopLocation}>
                          {shopLocation}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Nội dung xe & giá: Hiển thị ẢNH THẬT */}
                <div className="p-3">
                  <div className="flex items-start gap-3">
                    {/* Ảnh xe máy thật */}
                    <div className="w-24 h-20 shrink-0 rounded-xl overflow-hidden shadow-2xs">
                      <WireframeImagePlaceholder
                        label="ẢNH"
                        imageUrl={representativeOption.imageUrl}
                        alt={representativeOption.bikeName}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[var(--text-primary)] leading-snug truncate">
                        {representativeOption.bikeName}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                        {representativeOption.bikeType}
                      </div>

                      {/* Giá thuê/ngày và tổng 2 ngày */}
                      <div className="mt-1.5 border-t border-dashed border-slate-200 pt-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] text-slate-500">Giá thuê:</span>
                          <span className="font-bold text-xs text-slate-800">
                            {formatPrice(representativeOption.dailyRate)}/ngày
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-[10px] font-bold text-[var(--color-primary)]">Tổng 2 ngày:</span>
                          <span className="font-extrabold text-sm text-[var(--color-primary)]">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trang bị đi kèm */}
                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[9px]">
                    <span className="px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                      2 mũ BH
                    </span>
                    <span className="px-2 py-0.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                      2 áo mưa
                    </span>
                    <span className="px-2 py-0.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-0.5">
                      <ShieldCheck size={10} />
                      Bảo hiểm xe máy
                    </span>
                  </div>

                  {/* 2 Nút: [+ SO SÁNH] và [CHI TIẾT] */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isButtonDisabled}
                      onClick={() => onToggleCompare(representativeOption)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isCompared
                          ? 'bg-[var(--color-primary)] text-white shadow-xs'
                          : isButtonDisabled
                          ? 'border border-slate-500 bg-slate-500 text-white cursor-not-allowed'
                          : 'border border-blue-900/30 bg-white hover:bg-blue-50/60 text-[var(--color-primary)] hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check size={13} strokeWidth={3} className="text-white" />
                          <span>ĐÃ CHỌN SO SÁNH</span>
                        </>
                      ) : isButtonDisabled ? (
                        <span>TỐI ĐA 3 PHƯƠNG ÁN</span>
                      ) : (
                        <>
                          <Plus size={13} strokeWidth={2.5} className="text-[var(--color-primary)]" />
                          <span>SO SÁNH</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectOptionForDetail(representativeOption, shop)}
                      className="py-1.5 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 hover:text-[var(--color-primary)] cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <span>CHI TIẾT</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Thanh so sánh cố định phía dưới */}
      <div className="sticky bottom-0 px-3 z-20 mt-auto pb-2 bg-gradient-to-t from-white via-white to-transparent pt-3">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-2.5 rounded-2xl border border-blue-500/50 shadow-xl shadow-blue-950/20 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 text-sm font-extrabold">
              {selectedOptionIds.length}
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="truncate text-xs font-bold text-white">
                Đã chọn {selectedOptionIds.length} phương án
              </div>
              <span className="text-[10px] font-semibold text-white/90">
                Tối đa 3 phương án
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToCompare}
            disabled={!canCompare}
            className={`min-h-[42px] py-1.5 px-3.5 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-all duration-200 ${
              canCompare
                ? 'bg-white hover:bg-blue-50 text-blue-800 shadow-lg shadow-blue-950/20 hover:scale-[1.03] active:scale-95'
                : 'bg-white/10 text-white/50 ring-1 ring-white/10 cursor-not-allowed'
            }`}
          >
            <ArrowRightLeft size={14} strokeWidth={2.5} />
            <span>SO SÁNH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
