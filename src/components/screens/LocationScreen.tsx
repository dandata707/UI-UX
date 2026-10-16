import React, { useState } from 'react';
import {
  Search,
  Crosshair,
  Truck,
  Store,
  Check,
} from 'lucide-react';
import { EditableText } from '../EditableText';
import { EditableTextMap } from '../../types/wireframe';

interface LocationScreenProps {
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  onSubmit: (location: string, deliveryMode: 'delivery' | 'pickup') => void;
  currentLocation?: string;
  currentDeliveryMode?: 'delivery' | 'pickup';
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  isEditMode,
  editableTexts,
  onTextChange,
  onSubmit,
  currentLocation = 'Khách sạn / Homestay tại Trung tâm Đà Lạt',
  currentDeliveryMode = 'delivery',
}) => {
  const [locationInput, setLocationInput] = useState(currentLocation);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>(currentDeliveryMode);

  const handleUseGps = () => {
    setLocationInput('Vị trí hiện tại: Gần Chợ Đêm, Đà Lạt');
  };

  const handleConfirm = () => {
    onSubmit(locationInput.trim() || 'Trung tâm Đà Lạt', deliveryMode);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-2.5">
        <div className="bg-[var(--color-primary)] text-white p-3 pr-12 rounded-2xl shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wide">
            <EditableText
              id="loc_header_title"
              defaultText="Điểm giao nhận xe"
              isEditMode={isEditMode}
              value={editableTexts['loc_header_title']}
              onChange={onTextChange}
            />
          </h2>
          <p className="text-[10px] text-blue-200 mt-0.5">
            Chọn địa điểm để nhận xe máy tại Đà Lạt
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 space-y-3.5 py-3">
        {/* Ô tìm kiếm */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-primary)] block uppercase tracking-wide">
            1. ĐỊA CHỈ NHẬN XE:
          </label>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Nhập khách sạn, homestay hoặc địa chỉ…"
              className="w-full border border-slate-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 bg-white pl-9 pr-3 py-2.5 rounded-xl text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Nút nhỏ outline [ Dùng vị trí hiện tại ] */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={handleUseGps}
              className="py-1 px-2.5 rounded-lg border border-slate-200 hover:border-[var(--color-primary)] bg-white hover:bg-blue-50/50 text-[var(--color-primary)] text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs hover:scale-[1.02] active:scale-95"
            >
              <Crosshair size={12} className="text-[var(--color-primary)]" />
              <span>Dùng vị trí hiện tại</span>
            </button>
          </div>
        </div>

        {/* Mục "Hình thức giao nhận" với 2 thẻ radio lớn */}
        <div className="space-y-2 pt-1 border-t border-slate-200">
          <div className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            2. HÌNH THỨC GIAO NHẬN:
          </div>

          {/* Thẻ 1: Giao xe tận nơi */}
          <div
            onClick={() => setDeliveryMode('delivery')}
            className={`border rounded-2xl p-3 cursor-pointer transition-all duration-200 ${
              deliveryMode === 'delivery'
                ? 'border-blue-900/60 bg-blue-50/70 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] shrink-0 mt-0.5 transition-colors ${
                  deliveryMode === 'delivery'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-slate-400 bg-white'
                }`}
              >
                {deliveryMode === 'delivery' ? '✓' : ''}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-[var(--text-primary)]">
                  <Truck size={14} />
                  <span>Giao xe tận nơi</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5 font-normal">
                  "Nhận xe tại địa chỉ bạn đã nhập"
                </div>
              </div>
            </div>
          </div>

          {/* Thẻ 2: Đến cửa hàng nhận xe */}
          <div
            onClick={() => setDeliveryMode('pickup')}
            className={`border rounded-2xl p-3 cursor-pointer transition-all duration-200 ${
              deliveryMode === 'pickup'
                ? 'border-blue-900/60 bg-blue-50/70 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] shrink-0 mt-0.5 transition-colors ${
                  deliveryMode === 'pickup'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-slate-400 bg-white'
                }`}
              >
                {deliveryMode === 'pickup' ? '✓' : ''}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-[var(--text-primary)]">
                  <Store size={14} />
                  <span>Đến cửa hàng nhận xe</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5 font-normal">
                  "Nhận xe tại địa chỉ cửa hàng đối tác"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button hoàn tất: MÀU CAM NỔI BẬT */}
      <div className="pt-2 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full min-h-[50px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-wider"
        >
          <Check size={16} strokeWidth={2.5} />
          <span>XÁC NHẬN ĐỊA ĐIỂM</span>
        </button>
      </div>
    </div>
  );
};
