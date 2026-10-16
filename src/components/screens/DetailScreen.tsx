import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Clock,
  ChevronRight,
  Phone,
  ChevronLeft,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Shop, MotorbikeOption, EditableTextMap } from '../../types/wireframe';
import { BIKE_IMAGES } from '../../data/bikeImages';
import { WireframeImagePlaceholder } from '../WireframeBox';

interface DetailScreenProps {
  shop: Shop;
  option: MotorbikeOption;
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  isPlaceholderMode: boolean;
  isCompared: boolean;
  compareCount: number;
  onToggleCompare: (option: MotorbikeOption) => void;
  onOpenShareSheet: (isSingleBikeShare?: boolean) => void;
  onBack: () => void;
  onGoToCompare: () => void;
  wireframeStyle?: 'wireframe' | 'realistic';
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  shop,
  option,
  isEditMode: _isEditMode,
  editableTexts: _editableTexts,
  onTextChange: _onTextChange,
  isPlaceholderMode,
  isCompared,
  compareCount,
  onToggleCompare,
  onOpenShareSheet,
  onBack,
  onGoToCompare,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showCallPrompt, setShowCallPrompt] = useState(false);

  const formatPrice = (price: number) => {
    if (isPlaceholderMode) return '000.000đ';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Reuse the local bike collection for the detail gallery.
  const photoUrls = [
    option.imageUrl || BIKE_IMAGES[0],
    ...BIKE_IMAGES.filter((imageUrl) => imageUrl !== option.imageUrl).slice(0, 2),
  ];

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photoUrls.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photoUrls.length) % photoUrls.length);
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Top Header */}
      <div className="bg-white px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onBack}
          type="button"
          aria-label="Quay lại kết quả tìm kiếm"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-primary)] hover:bg-blue-50 cursor-pointer transition-colors"
        >
          <ArrowLeft size={19} strokeWidth={2.25} />
        </button>

        <span className="text-xs font-bold uppercase tracking-wide text-[var(--text-primary)]">CHI TIẾT PHƯƠNG ÁN</span>

        {/* Nút chia sẻ riêng xe này */}
        <button
          onClick={() => onOpenShareSheet(true)}
          type="button"
          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-[var(--color-primary)] bg-white text-[var(--color-primary)] text-[10px] font-bold flex items-center gap-1 hover:bg-blue-50/50 cursor-pointer transition-all hover:scale-105 active:scale-95"
          title="Chia sẻ xe này"
        >
          <Share2 size={12} className="text-[var(--color-primary)]" />
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto pb-24 p-3 space-y-3">
        {/* CAROUSEL VUỐT NGANG VỚI ẢNH THẬT */}
        <div className="space-y-1.5">
          <div className="relative aspect-16/10 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs group">
            <WireframeImagePlaceholder
              label="ẢNH XE"
              imageUrl={photoUrls[activePhotoIdx]}
              alt={option.bikeName}
            />

            {/* Left/Right Carousel Triggers */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold shadow-md hover:bg-white hover:scale-110 active:scale-95 cursor-pointer z-10 transition-all"
              title="Ảnh trước"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold shadow-md hover:bg-white hover:scale-110 active:scale-95 cursor-pointer z-10 transition-all"
              title="Ảnh tiếp theo"
            >
              <ChevronRight size={16} />
            </button>

            {/* Badge cập nhật */}
            <div className="absolute top-2.5 left-2.5 bg-[var(--color-primary)]/90 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold z-10 shadow-sm">
              <Clock size={11} className="text-orange-400" />
              <span>Cập nhật: {option.lastUpdated}</span>
            </div>
          </div>

          {/* Dấu chấm tròn nhỏ báo vị trí (• ○ ○) */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            {photoUrls.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activePhotoIdx === idx
                    ? 'w-6 bg-[var(--color-primary)]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Ảnh ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Khối shop (tên, địa chỉ, ★ 4.9, đặc điểm) */}
        <div className="border border-slate-200 p-3 bg-white rounded-2xl shadow-xs space-y-2">
          <div className="flex items-start justify-between border-b border-slate-100 pb-2">
            <div>
              <div className="text-xs font-bold uppercase text-[var(--text-primary)]">
                {shop.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Địa chỉ: {shop.address}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Star size={11} className="fill-amber-400 text-amber-500" />
                {shop.rating} ({shop.reviewCount})
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-secondary)] bg-blue-50/70 p-2 rounded-xl border border-blue-900/10 font-normal">
            <span>ĐẶC ĐIỂM:</span> {shop.highlight}
          </div>
        </div>

        {/* Khối xe & Bảng kê chi phí trọn gói */}
        <div className="border border-slate-200 p-3 bg-white rounded-2xl shadow-xs space-y-2.5">
          <div className="border-b border-slate-100 pb-1.5">
            <div className="text-sm font-bold uppercase text-[var(--text-primary)]">
              {option.bikeName}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Phân khúc: {option.bikeType} • Đời 2023–2024
            </div>
          </div>

          {/* Bảng kê chi phí trọn gói */}
          <div className="border border-blue-900/15 bg-blue-50/40 p-3 rounded-2xl space-y-2 text-xs">
            <div className="text-[11px] font-bold uppercase text-[var(--text-primary)] border-b border-blue-900/10 pb-1 flex items-center justify-between">
              <span>BẢNG KÊ CHI PHÍ TRỌN GÓI</span>
            </div>

            <div className="flex justify-between text-slate-700 text-[11px]">
              <span>- Giá thuê xe (2 ngày):</span>
              <span className="font-bold text-slate-900">{formatPrice(option.dailyRate * 2)}</span>
            </div>

            <div className="flex justify-between text-slate-700 text-[11px]">
              <span>- Phí giao nhận (Trung tâm):</span>
              <span className="font-bold text-emerald-700">0đ (Miễn phí)</span>
            </div>

            <div className="flex justify-between text-slate-700 text-[11px]">
              <span>- Mũ bảo hiểm + Áo mưa:</span>
              <span className="font-bold text-emerald-700">0đ (Đã bao gồm)</span>
            </div>

            <div className="pt-2 border-t border-blue-900/15 flex justify-between items-baseline font-bold text-slate-900 text-xs">
              <span className="uppercase text-[var(--text-primary)]">TỔNG THANH TOÁN:</span>
              <span className="text-base font-extrabold text-[var(--color-primary)]">
                {formatPrice(option.totalEstimate)}
              </span>
            </div>
            <div className="text-[9px] text-slate-500 text-right">
              * Thanh toán trực tiếp khi nhận bàn giao xe
            </div>
          </div>

          {/* Giờ nhận / trả & Quy định cọc */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="border border-slate-200 p-2.5 rounded-xl bg-slate-50/80">
              <div className="text-[9px] text-slate-500 font-bold uppercase">GIỜ NHẬN / TRẢ:</div>
              <div className="font-bold text-[11px] text-[var(--color-primary)] mt-0.5">Nhận: {option.pickupHours}</div>
              <div className="text-[10px] text-slate-600">Trả: {option.returnHours}</div>
            </div>

            <div className="border border-slate-200 p-2.5 rounded-xl bg-slate-50/80">
              <div className="text-[9px] text-slate-500 font-bold uppercase">QUY ĐỊNH CỌC XE:</div>
              <div className="font-bold text-[11px] text-[var(--color-primary)] mt-0.5 leading-tight">{option.deposit}</div>
            </div>
          </div>

          {/* Điều kiện & chính sách (checklist) */}
          <div className="space-y-1.5 text-[10px]">
            <div className="font-bold uppercase text-[var(--text-primary)]">ĐIỀU KIỆN &amp; CHÍNH SÁCH</div>
            {option.requirements.map((req, rIdx) => (
              <div key={rIdx} className="flex items-start gap-1.5 text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 1 Đánh giá gần đây */}
        <div className="border border-slate-200 p-3 bg-white rounded-2xl shadow-xs space-y-1.5 text-[10px]">
          <div className="flex items-center justify-between font-bold uppercase text-[var(--text-primary)]">
            <span>ĐÁNH GIÁ GẦN ĐÂY</span>
            <span className="text-amber-600">★ 4.9 (342 lượt)</span>
          </div>
          <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-1.5 text-[11px]">
            "Xe Vision máy êm, leo dốc Dinh 1 ngọt. Giao đúng giờ tận khách sạn, hợp đồng rõ ràng." - Hoàng Nam (TP.HCM) ★★★★★
          </p>
        </div>
      </div>

      {/* Call modal prompt */}
      {showCallPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-xs w-full space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="font-bold text-xs uppercase border-b border-slate-100 pb-2 flex items-center gap-2 text-[var(--text-primary)]">
              <Phone size={15} className="text-orange-500" />
              <span>GỌI SHOP THUÊ XE</span>
            </div>
            <div className="text-xs text-slate-800 space-y-1">
              <div className="font-bold text-sm text-[var(--text-primary)]">{shop.name}</div>
              <div className="text-xs font-semibold text-orange-600">Hotline: {shop.phone}</div>
              <div className="text-[11px] text-slate-500 pt-1">
                Xe: {option.bikeName} (2 ngày • 280.000đ)
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${shop.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-xl text-center uppercase tracking-wide transition-all shadow-sm active:scale-95"
              >
                Gọi ngay
              </a>
              <button
                type="button"
                onClick={() => setShowCallPrompt(false)}
                className="py-2.5 px-3 border border-slate-200 hover:bg-slate-100 text-xs font-bold rounded-xl uppercase cursor-pointer transition-all active:scale-95 text-slate-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thanh nút dưới:
          - 1 icon điện thoại nhỏ outline "Gọi shop" bên trái
          - 1 nút chính rộng MÀU CAM: [ THÊM VÀO SO SÁNH ] -> [ XEM SO SÁNH (n) > ] */}
      <div className="sticky bottom-0 px-3 z-20 mt-auto pb-2 bg-gradient-to-t from-white via-white to-transparent pt-3">
        <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-lg flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowCallPrompt(true)}
            className="min-h-[48px] py-2 px-3.5 rounded-xl border border-slate-200 hover:border-[var(--color-primary)] bg-slate-50 hover:bg-blue-50/50 text-[var(--color-primary)] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95 shadow-2xs"
            title="Gọi điện cho chủ cửa hàng"
          >
            <Phone size={15} className="text-[var(--color-primary)]" />
            <span>Gọi shop</span>
          </button>

          {isCompared ? (
            <button
              type="button"
              onClick={onGoToCompare}
              className="flex-1 min-h-[48px] py-2.5 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
            >
              <span>XEM SO SÁNH ({compareCount})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onToggleCompare(option)}
              className="flex-1 min-h-[48px] py-2.5 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
            >
              <span>THÊM VÀO SO SÁNH</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
