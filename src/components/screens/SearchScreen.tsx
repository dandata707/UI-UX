import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ChevronDown,
  Search,
} from 'lucide-react';
import { EditableText } from '../EditableText';
import { EditableTextMap, SearchFilterState } from '../../types/wireframe';
import brandBanner from '../../assets/dalat-ride-banner.png';

interface SearchScreenProps {
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  onOpenCalendar: () => void;
  onOpenLocation: () => void;
  onSearchSubmit: (params: SearchFilterState) => void;
  isPlaceholderMode: boolean;
  pickupLocation: string;
  deliveryMode: 'delivery' | 'pickup';
  isLocationChosen: boolean;
  screenBadge?: string;
  wireframeStyle?: 'wireframe' | 'realistic';
  pickupDateProp?: string;
  pickupTimeProp?: string;
  returnDateProp?: string;
  returnTimeProp?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  isEditMode,
  editableTexts,
  onTextChange,
  onOpenCalendar,
  onOpenLocation,
  onSearchSubmit,
  pickupLocation,
  deliveryMode,
  isLocationChosen,
  pickupDateProp = '18/10/2026',
  pickupTimeProp = '08:00',
  returnDateProp = '20/10/2026',
  returnTimeProp = '08:00',
}) => {
  const [pickupDate, setPickupDate] = useState(pickupDateProp);
  const [pickupTime, setPickupTime] = useState(pickupTimeProp);
  const [returnDate, setReturnDate] = useState(returnDateProp);
  const [returnTime, setReturnTime] = useState(returnTimeProp);
  const [selectedType, setSelectedType] = useState('Tất cả xe');
  const [quantity, setQuantity] = useState(1);
  const toDate = (value: string) => {
    const [day, month, year] = value.split('/').map(Number);
    return Date.UTC(year, month - 1, day);
  };
  const totalDays = Math.max(1, Math.round((toDate(returnDate) - toDate(pickupDate)) / 86400000));

  React.useEffect(() => {
    setPickupDate(pickupDateProp);
    setPickupTime(pickupTimeProp);
    setReturnDate(returnDateProp);
    setReturnTime(returnTimeProp);
  }, [pickupDateProp, pickupTimeProp, returnDateProp, returnTimeProp]);

  const bikeOptions = [
    'Tất cả xe',
    'Xe tay ga',
    'Xe số',
    'Xe côn – Cào cào',
  ];

  const handleSearchClick = () => {
    if (!isLocationChosen) {
      onOpenLocation();
    } else {
      onSearchSubmit({
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        bikeType: selectedType,
        quantity,
        pickupLocation: pickupLocation || 'Khách sạn / Homestay tại Trung tâm Đà Lạt',
        deliveryMode,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Brand banner stays visible while the search form scrolls. */}
      <div className="sticky top-0 z-20 -mx-3.5 -mt-3.5 bg-[var(--surface-app-bg)] px-3.5 pb-2 pt-3.5">
        <div className="relative h-[102px] overflow-hidden rounded-2xl bg-[var(--color-primary)] shadow-sm">
          <img
            src={brandBanner}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/30 via-transparent to-transparent" />
          <div className="relative z-10 flex h-full w-[65%] flex-col justify-center gap-0.5 pl-5 text-left">
            <EditableText
              id="search_app_title"
              defaultText="ĐÀ LẠT RIDE"
              isEditMode={isEditMode}
              value={editableTexts['search_app_title']}
              onChange={onTextChange}
              tag="h1"
              className="whitespace-nowrap text-[21px] font-extrabold leading-tight tracking-tight text-white"
            />
            <EditableText
              id="search_app_subtitle"
              defaultText="Thuê xe máy"
              isEditMode={isEditMode}
              value={editableTexts['search_app_subtitle']}
              onChange={onTextChange}
              className="text-[14px] font-normal leading-tight text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Banner nhỏ: "So sánh giá trọn gói và phí giao theo thời gian thực" */}
      <div className="mb-1">
        <div className="border border-blue-900/20 bg-blue-50/80 p-2.5 rounded-xl text-xs flex items-center gap-2.5 shadow-2xs hover:bg-blue-50 transition-colors">
          <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
            !
          </div>
          <div className="text-[11px] leading-tight text-[var(--text-primary)] font-medium">
            <EditableText
              id="search_banner_tip"
              defaultText="So sánh giá trọn gói và phí giao theo thời gian thực"
              isEditMode={isEditMode}
              value={editableTexts['search_banner_tip']}
              onChange={onTextChange}
            />
          </div>
        </div>
      </div>

      {/* Main Single Form Body */}
      <div className="flex-1 space-y-3 py-1">
        {/* Khối 1: Thời gian nhận & trả xe */}
        <div className="border border-slate-200 hover:border-blue-900/40 p-3 bg-white rounded-2xl shadow-xs transition-all duration-200 space-y-2.5">
          <div className="text-xs font-bold text-[var(--text-primary)] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
            <Calendar size={14} className="text-[var(--text-primary)]" />
            <span className="uppercase tracking-wide">THỜI GIAN NHẬN &amp; TRẢ XE</span>
          </div>

          {/* 2 ô Nhận xe và Trả xe mở popup chọn ngày */}
          <button
            type="button"
            aria-label="Chọn ngày nhận và trả xe"
            aria-haspopup="dialog"
            onClick={onOpenCalendar}
            className="w-full grid grid-cols-2 gap-2.5 text-left text-xs cursor-pointer group"
          >
            <div className="border border-slate-200 group-hover:border-[var(--color-primary)] p-2 rounded-xl bg-slate-50 group-hover:bg-blue-50/40 transition-all duration-200 group-hover:shadow-xs">
              <div className="text-[10px] text-slate-500 font-medium mb-0.5">Nhận xe:</div>
              <div className="font-bold text-[12px] text-[var(--text-primary)]">{pickupDate}</div>
              <div className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                <Clock size={11} className="text-[var(--color-primary)]" />
                <span className="font-semibold text-[var(--color-primary)]">{pickupTime}</span>
              </div>
            </div>

            <div className="border border-slate-200 group-hover:border-[var(--color-primary)] p-2 rounded-xl bg-slate-50 group-hover:bg-blue-50/40 transition-all duration-200 group-hover:shadow-xs">
              <div className="text-[10px] text-slate-500 font-medium mb-0.5">Trả xe:</div>
              <div className="font-bold text-[12px] text-[var(--text-primary)]">{returnDate}</div>
              <div className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                <Clock size={11} className="text-[var(--color-primary)]" />
                <span className="font-semibold text-[var(--color-primary)]">{returnTime}</span>
              </div>
            </div>
          </button>

          {/* Tổng thời gian cập nhật theo ngày đã xác nhận */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Tổng thời gian thuê:</span>
            <span className="px-2 py-0.5 font-bold bg-[var(--color-primary)] text-white rounded-lg text-[10px] shadow-2xs">
              {totalDays} ngày
            </span>
          </div>
        </div>

        {/* Khối 2: Loại xe & số lượng */}
        <div className="border border-slate-200 hover:border-blue-900/40 p-3 bg-white rounded-2xl shadow-xs transition-all duration-200 space-y-2.5">
          <div className="text-xs font-bold text-[var(--text-primary)] border-b border-slate-100 pb-1.5 uppercase tracking-wide">
            LOẠI XE &amp; SỐ LƯỢNG
          </div>

          {/* Loại xe: DROPDOWN */}
          <div>
            <label className="text-[11px] text-slate-600 font-medium block mb-1">
              Chọn loại xe:
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none border border-slate-200 hover:border-[var(--color-primary)] focus:border-[var(--color-primary)] bg-slate-50 hover:bg-white px-3 py-2 text-xs font-semibold text-[var(--text-primary)] rounded-xl outline-none cursor-pointer pr-8 transition-colors"
              >
                {bikeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)] pointer-events-none"
              />
            </div>
          </div>

          {/* Số lượng dùng stepper [-] 1 [+], ghi chú "Kèm 2 mũ/xe" */}
          <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
            <div>
              <div className="text-xs font-bold text-[var(--text-primary)]">Số lượng xe:</div>
              <div className="text-[10px] text-slate-500">(Kèm 2 mũ/xe)</div>
            </div>
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-blue-50 hover:text-[var(--text-primary)] active:scale-95 transition-all"
              >
                -
              </button>
              <span className="font-bold text-xs w-5 text-center text-[var(--text-primary)]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-blue-50 hover:text-[var(--text-primary)] active:scale-95 transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Khối 3: Điểm nhận xe */}
        <div className="border border-slate-200 hover:border-blue-900/40 p-3 bg-white rounded-2xl shadow-xs transition-all duration-200 space-y-1.5">
          <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            ĐIỂM NHẬN XE
          </div>

          <button
            type="button"
            aria-label="Chọn điểm nhận xe"
            aria-haspopup="dialog"
            onClick={onOpenLocation}
            className={`w-full border rounded-xl p-2.5 flex items-center justify-between text-left cursor-pointer transition-all duration-200 ${
              isLocationChosen
                ? 'border-blue-900/40 bg-blue-50/60 hover:bg-blue-50'
                : 'border-slate-200 bg-slate-50 hover:bg-blue-50/30 hover:border-[var(--color-primary)]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-1">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin size={14} />
              </div>
              <div className="min-w-0">
                {isLocationChosen ? (
                  <>
                    <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {pickupLocation}
                    </div>
                    <div className="text-[10px] text-orange-600 font-bold mt-0.5">
                      {deliveryMode === 'delivery' ? '• Giao tận nơi' : '• Đến cửa hàng nhận xe'}
                    </div>
                  </>
                ) : (
                  <div className="text-xs font-medium text-slate-500">
                    Chọn điểm nhận xe tại Đà Lạt...
                  </div>
                )}
              </div>
            </div>
            <ChevronRight size={16} className="text-[var(--text-primary)] shrink-0 ml-1" />
          </button>
        </div>
      </div>

      {/* NÚT CHÍNH DUY NHẤT: [ TÌM XE ] -> MÀU CAM NỔI BẬT với Hover & Shadow mượt mà */}
      <div className="pt-2 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={handleSearchClick}
          className="w-full min-h-[50px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm uppercase tracking-wider"
        >
          <Search size={16} strokeWidth={2.5} />
          <EditableText
            id="search_btn_cta"
            defaultText="TÌM XE"
            isEditMode={isEditMode}
            value={editableTexts['search_btn_cta']}
            onChange={onTextChange}
          />
        </button>
      </div>
    </div>
  );
};
