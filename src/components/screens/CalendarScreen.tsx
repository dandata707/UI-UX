import React, { useState } from 'react';
import { Clock, Calendar as CalendarIcon, Check } from 'lucide-react';
import { EditableText } from '../EditableText';
import { EditableTextMap } from '../../types/wireframe';

interface CalendarScreenProps {
  isEditMode: boolean;
  editableTexts: EditableTextMap;
  onTextChange: (id: string, text: string) => void;
  onConfirm: (dates: {
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    totalDays: number;
  }) => void;
  initialPickupDate?: string;
  initialPickupTime?: string;
  initialReturnDate?: string;
  initialReturnTime?: string;
}

const formatDateBadge = (date: string) => {
  const [day, month, year] = date.split('/').map(Number);
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')} (${weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]})`;
};

const parseDate = (date: string) => {
  const [day, month, year] = date.split('/').map(Number);
  return { day, monthIndex: month - 1, year };
};

const formatDate = (year: number, monthIndex: number, day: number) =>
  `${String(day).padStart(2, '0')}/${String(monthIndex + 1).padStart(2, '0')}/${year}`;

const getDateValue = (date: string) => {
  const { day, monthIndex, year } = parseDate(date);
  return Date.UTC(year, monthIndex, day);
};

const formatMonth = (date: Date) =>
  `THÁNG ${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  isEditMode,
  editableTexts,
  onTextChange,
  onConfirm,
  initialPickupDate = '18/10/2026',
  initialPickupTime = '08:00',
  initialReturnDate = '20/10/2026',
  initialReturnTime = '08:00',
}) => {
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [returnTime, setReturnTime] = useState(initialReturnTime);
  const [selectionStage, setSelectionStage] = useState<'start' | 'end'>('start');
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const { monthIndex, year } = parseDate(initialPickupDate);
    return new Date(Date.UTC(year, monthIndex, 1));
  });

  const visibleYear = visibleMonth.getUTCFullYear();
  const visibleMonthIndex = visibleMonth.getUTCMonth();
  const previousMonth = new Date(Date.UTC(visibleYear, visibleMonthIndex - 1, 1));
  const nextMonth = new Date(Date.UTC(visibleYear, visibleMonthIndex + 1, 1));
  const monthDayCount = new Date(Date.UTC(visibleYear, visibleMonthIndex + 1, 0)).getUTCDate();
  const daysInMonth = Array.from({ length: monthDayCount }, (_, i) => i + 1);
  const emptyDaysBefore = (new Date(Date.UTC(visibleYear, visibleMonthIndex, 1)).getUTCDay() + 6) % 7;
  const pickupDateValue = getDateValue(pickupDate);
  const returnDateValue = getDateValue(returnDate);

  const handleSelectDay = (day: number) => {
    const selectedDate = formatDate(visibleYear, visibleMonthIndex, day);
    const selectedDateValue = Date.UTC(visibleYear, visibleMonthIndex, day);

    if (selectionStage === 'start') {
      setPickupDate(selectedDate);
      setReturnDate(selectedDate);
      setSelectionStage('end');
    } else if (selectedDateValue < pickupDateValue) {
      setReturnDate(pickupDate);
      setPickupDate(selectedDate);
      setSelectionStage('start');
    } else {
      setReturnDate(selectedDate);
      setSelectionStage('start');
    }
  };

  const totalDays = Math.max(1, Math.round((returnDateValue - pickupDateValue) / 86400000));

  const handleDone = () => {
    onConfirm({
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      totalDays,
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 bg-[var(--surface-app-bg)] text-slate-900 select-none">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-2.5">
        <div className="bg-[var(--color-primary)] text-white p-3 pr-12 rounded-2xl shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
            <CalendarIcon size={14} className="text-white" />
            <EditableText
              id="calendar_header_title"
              defaultText="THỜI GIAN NHẬN & TRẢ XE"
              isEditMode={isEditMode}
              value={editableTexts['calendar_header_title']}
              onChange={onTextChange}
            />
          </h2>
          <p className="text-[10px] text-white/85 mt-0.5">
            Chọn khoảng ngày và giờ nhận/trả xe tại Đà Lạt
          </p>
        </div>
      </div>

      {/* Main Body: Calendar */}
      <div className="flex-1 space-y-3 py-2">
        {/* Month Navigation */}
        <div className="border border-slate-200 bg-white p-3 rounded-2xl shadow-xs">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 text-[9px] font-bold mb-2.5 pb-2 border-b border-slate-100 text-[var(--text-primary)]">
            <button
              type="button"
              aria-label={`Xem ${formatMonth(previousMonth)}`}
              onClick={() => setVisibleMonth(previousMonth)}
              className="min-w-0 truncate whitespace-nowrap text-left text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {formatMonth(previousMonth)}
            </button>
            <span className="whitespace-nowrap px-1.5 py-1 bg-blue-50 text-[var(--text-primary)] rounded-lg border border-blue-900/10 font-bold">
              {formatMonth(visibleMonth)}
            </span>
            <button
              type="button"
              aria-label={`Xem ${formatMonth(nextMonth)}`}
              onClick={() => setVisibleMonth(nextMonth)}
              className="min-w-0 truncate whitespace-nowrap text-right text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {formatMonth(nextMonth)}
            </button>
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 mb-1.5">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span className="text-orange-600">CN</span>
          </div>

          {/* Calendar Grid Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: emptyDaysBefore }).map((_, i) => (
              <span key={`blank-${i}`} className="p-1.5 text-slate-200">
                -
              </span>
            ))}
            {daysInMonth.map((day) => {
              const dateValue = Date.UTC(visibleYear, visibleMonthIndex, day);
              const isStart = dateValue === pickupDateValue;
              const isEnd = dateValue === returnDateValue;
              const isInRange = dateValue >= pickupDateValue && dateValue <= returnDateValue;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-150 cursor-pointer ${
                    isStart || isEnd
                      ? 'bg-[var(--color-primary)] text-white shadow-sm scale-105'
                      : isInRange
                      ? 'bg-blue-100/80 text-[var(--text-primary)]'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-[var(--text-primary)]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-slate-100 pt-2 text-[10px] text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 shrink-0 rounded bg-[var(--color-primary)]" aria-hidden="true" />
              Ngày bắt đầu/kết thúc
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 shrink-0 rounded bg-blue-100/80" aria-hidden="true" />
              Khoảng ngày thuê
            </span>
          </div>
        </div>

        {/* Ngày và giờ nhận/trả xe trong cùng một cặp ô */}
        <div className="grid grid-cols-2 gap-2.5" aria-live="polite">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="whitespace-nowrap text-[10px] font-bold text-[var(--color-primary)]">NHẬN XE</span>
              <span className="whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                {formatDateBadge(pickupDate)}
              </span>
            </div>
            <div className="mt-1.5 text-[13px] font-bold text-[var(--text-primary)]">{pickupDate}</div>
            <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-1.5 text-xs font-bold text-[var(--color-primary)]">
              <Clock size={13} className="shrink-0" />
              <select
                aria-label="Giờ nhận xe"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="min-w-0 bg-transparent font-bold outline-none cursor-pointer"
              >
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="14:00">14:00</option>
              </select>
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs">
            <div className="flex items-center justify-between gap-1">
              <span className="whitespace-nowrap text-[10px] font-bold text-[var(--color-pin-red)]">TRẢ XE</span>
              <span className="whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                {formatDateBadge(returnDate)}
              </span>
            </div>
            <div className="mt-1.5 text-[13px] font-bold text-[var(--text-primary)]">{returnDate}</div>
            <div className="mt-2 flex items-center gap-1.5 border-t border-slate-100 pt-1.5 text-xs font-bold text-[var(--color-primary)]">
              <Clock size={13} className="shrink-0" />
              <select
                aria-label="Giờ trả xe"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="min-w-0 bg-transparent font-bold outline-none cursor-pointer"
              >
                <option value="08:00">08:00</option>
                <option value="12:00">12:00</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
                <option value="22:00">22:00</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tổng kết ngày */}
        <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-900/10 flex flex-wrap items-center justify-between gap-1 text-[11px]">
          <span className="text-[var(--text-primary)] font-medium">Tổng thời gian:</span>
          <span className="font-bold text-[var(--text-primary)]">{totalDays} ngày ({pickupDate} - {returnDate})</span>
        </div>
      </div>

      {/* Button hoàn tất: MÀU CAM NỔI BẬT */}
      <div className="pt-2 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={handleDone}
          className="w-full min-h-[50px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-wider"
        >
          <Check size={16} strokeWidth={2.5} />
          <span>XÁC NHẬN NGÀY &amp; GIỜ</span>
        </button>
      </div>
    </div>
  );
};
