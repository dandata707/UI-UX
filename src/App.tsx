import React, { useCallback, useState } from 'react';
import {
  INITIAL_SHOPS,
} from './data/mockData';
import {
  ScreenId,
  MotorbikeOption,
  Shop,
  SearchFilterState,
} from './types/wireframe';
import { PhoneFrame } from './components/PhoneFrame';
import { ScreenPopup } from './components/ScreenPopup';
import { SearchScreen } from './components/screens/SearchScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { LocationScreen } from './components/screens/LocationScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { SingleBikeShareSheetScreen } from './components/screens/SingleBikeShareSheetScreen';
import { CompareScreen } from './components/screens/CompareScreen';
import { ShareSheetScreen } from './components/screens/ShareSheetScreen';
import { SavedScreen } from './components/screens/SavedScreen';
import { BottomNav } from './components/BottomNav';
import {
  Smartphone,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // Active Screen ID in interactive prototype
  const [activeScreenId, setActiveScreenId] = useState<ScreenId>('search');
  const [activePopup, setActivePopup] = useState<'calendar' | 'location' | 'share' | 'share-single' | null>(null);
  const closePopup = useCallback(() => setActivePopup(null), []);

  const navigateToScreen = (id: ScreenId) => {
    if (id === 'calendar' || id === 'location') {
      setActiveScreenId('search');
      setActivePopup(id);
    } else if (id === 'share' || id === 'share-single') {
      setActiveScreenId(id === 'share' ? 'compare-2' : 'detail');
      setActivePopup(id);
    } else {
      closePopup();
      setActiveScreenId(id);
    }
  };

  // Search & delivery preferences
  const [pickupDate, setPickupDate] = useState<string>('18/10/2026');
  const [pickupTime, setPickupTime] = useState<string>('08:00');
  const [returnDate, setReturnDate] = useState<string>('20/10/2026');
  const [returnTime, setReturnTime] = useState<string>('08:00');
  const [pickupLocation, setPickupLocation] = useState<string>(
    'Khách sạn Colline, 10 Phan Bội Châu, Đà Lạt'
  );
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isLocationChosen, setIsLocationChosen] = useState<boolean>(true);

  // Rental comparison selection (Default pre-selects 3 options: Vision, Sirius, Lead)
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([
    'opt-1-1', // Honda Vision - Shop 1
    'opt-2-1', // Yamaha Sirius - Shop 2
    'opt-3-1', // Honda Lead - Shop 3
  ]);

  // Selected option for Detail view (Màn 3)
  const [selectedDetailOptionId, setSelectedDetailOptionId] = useState<string>('opt-1-1');
  const [selectedDetailShopId, setSelectedDetailShopId] = useState<string>('shop-1');

  // Saved state for Màn 4 & Màn 5
  const [savedOptionIds, setSavedOptionIds] = useState<string[]>([]);

  // Compare selection toggling (Tối đa 3 phương án)
  const handleToggleCompare = (option: MotorbikeOption) => {
    setSelectedOptionIds((prev) => {
      if (prev.includes(option.id)) {
        return prev.filter((id) => id !== option.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), option.id];
      }
      return [...prev, option.id];
    });
  };

  const handleRemoveCompareOption = (optionId: string) => {
    setSelectedOptionIds((prev) => prev.filter((id) => id !== optionId));
  };

  // Detail item lookup
  const currentDetailShop =
    INITIAL_SHOPS.find((s) => s.id === selectedDetailShopId) || INITIAL_SHOPS[0];
  const currentDetailOption =
    currentDetailShop.options.find((o) => o.id === selectedDetailOptionId) ||
    currentDetailShop.options[0];

  // Options for comparison
  const allOptions: MotorbikeOption[] = INITIAL_SHOPS.flatMap((s) => s.options);
  const compareOptionsList: MotorbikeOption[] = selectedOptionIds
    .map((id) => allOptions.find((o) => o.id === id))
    .filter((o): o is MotorbikeOption => Boolean(o));

  const savedOptionsList: MotorbikeOption[] = savedOptionIds
    .map((id) => allOptions.find((o) => o.id === id))
    .filter((o): o is MotorbikeOption => Boolean(o));

  const isCurrentComparisonSaved =
    selectedOptionIds.length >= 2 &&
    selectedOptionIds.length === savedOptionIds.length &&
    selectedOptionIds.every((id) => savedOptionIds.includes(id));

  const fullCompareList: MotorbikeOption[] =
    compareOptionsList.length > 0
      ? compareOptionsList
      : [allOptions[0], allOptions[2], allOptions[3]];

  // Interactive flow handlers
  const handleLocationSubmit = (loc: string, mode: 'delivery' | 'pickup') => {
    setPickupLocation(loc);
    setDeliveryMode(mode);
    setIsLocationChosen(true);
    closePopup();
  };

  const handleCalendarConfirm = (dates: {
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
  }) => {
    setPickupDate(dates.pickupDate);
    setPickupTime(dates.pickupTime);
    setReturnDate(dates.returnDate);
    setReturnTime(dates.returnTime);
    closePopup();
  };

  const handleSearchSubmit = (_params: SearchFilterState) => {
    setActiveScreenId('results');
  };

  const handleSelectOptionForDetail = (option: MotorbikeOption, shop: Shop) => {
    setSelectedDetailOptionId(option.id);
    setSelectedDetailShopId(shop.id);
    setActiveScreenId('detail');
  };

  const handleGoToCompareScreen = () => {
    const count = selectedOptionIds.length;
    if (count <= 2) setActiveScreenId('compare-1');
    else if (count === 3) setActiveScreenId('compare-2');
    else setActiveScreenId('compare-3');
  };

  const handleToggleComparisonSaved = (nextSaved: boolean) => {
    setSavedOptionIds(nextSaved ? [...selectedOptionIds] : []);
  };

  const handleOpenSavedComparison = () => {
    if (savedOptionIds.length < 2) return;
    setSelectedOptionIds([...savedOptionIds]);
    setActiveScreenId(savedOptionIds.length === 2 ? 'compare-1' : 'compare-2');
  };

  const handleShareSavedComparison = () => {
    if (savedOptionIds.length < 2) return;
    setSelectedOptionIds([...savedOptionIds]);
    setActivePopup('share');
  };

  // Quick jump presets for easy navigation testing
  const screenPresets: { id: ScreenId; label: string }[] = [
    { id: 'search', label: '1. Tìm xe' },
    { id: 'calendar', label: '1a. Chọn ngày' },
    { id: 'location', label: '1b. Điểm nhận' },
    { id: 'results', label: '2. Danh sách xe' },
    { id: 'detail', label: '3. Chi tiết xe' },
    { id: 'share-single', label: '3a. Chia sẻ xe' },
    { id: 'compare-2', label: '4. So sánh 3 xe' },
    { id: 'share', label: '4c. Chia sẻ so sánh' },
    { id: 'saved', label: '5. Đã lưu' },
  ];

  // Render the active screen content inside the phone
  const renderScreenContent = () => {
    switch (activeScreenId) {
      case 'search':
        return (
          <SearchScreen
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            onOpenCalendar={() => setActivePopup('calendar')}
            onOpenLocation={() => setActivePopup('location')}
            onSearchSubmit={handleSearchSubmit}
            isPlaceholderMode={false}
            pickupLocation={pickupLocation}
            deliveryMode={deliveryMode}
            isLocationChosen={isLocationChosen}
            pickupDateProp={pickupDate}
            pickupTimeProp={pickupTime}
            returnDateProp={returnDate}
            returnTimeProp={returnTime}
          />
        );

      case 'results':
      case 'results-dropdown':
        return (
          <ResultsScreen
            shops={INITIAL_SHOPS}
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            isPlaceholderMode={false}
            selectedOptionIds={selectedOptionIds}
            onToggleCompare={handleToggleCompare}
            onSelectOptionForDetail={handleSelectOptionForDetail}
            onGoToCompare={handleGoToCompareScreen}
            onBackToSearch={() => setActiveScreenId('search')}
            deliveryMode={deliveryMode}
            deliveryAddress={pickupLocation}
            onOpenLocation={() => setActivePopup('location')}
          />
        );

      case 'detail':
        return (
          <DetailScreen
            shop={currentDetailShop}
            option={currentDetailOption}
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            isPlaceholderMode={false}
            isCompared={selectedOptionIds.includes(currentDetailOption.id)}
            compareCount={selectedOptionIds.length}
            onToggleCompare={handleToggleCompare}
            onOpenShareSheet={() => setActivePopup('share-single')}
            onBack={() => setActiveScreenId('results')}
            onGoToCompare={handleGoToCompareScreen}
          />
        );

      case 'compare-1':
        return (
          <CompareScreen
            options={fullCompareList}
            shops={INITIAL_SHOPS}
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            isPlaceholderMode={false}
            onRemoveOption={handleRemoveCompareOption}
            onOpenShareSheet={() => setActivePopup('share')}
            onBack={() => setActiveScreenId('results')}
            onAddMoreOptions={() => setActiveScreenId('results')}
            forcedMode="two"
            isSavedInitial={isCurrentComparisonSaved}
            onToggleSavedGlobal={handleToggleComparisonSaved}
          />
        );

      case 'compare-2':
      case 'compare-3':
        return (
          <CompareScreen
            options={fullCompareList}
            shops={INITIAL_SHOPS}
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            isPlaceholderMode={false}
            onRemoveOption={handleRemoveCompareOption}
            onOpenShareSheet={() => setActivePopup('share')}
            onBack={() => setActiveScreenId('results')}
            onAddMoreOptions={() => setActiveScreenId('results')}
            forcedMode="three"
            isSavedInitial={isCurrentComparisonSaved}
            onToggleSavedGlobal={handleToggleComparisonSaved}
          />
        );

      case 'saved':
        return (
          <SavedScreen
            isEditMode={false}
            editableTexts={{}}
            onTextChange={() => {}}
            isPlaceholderMode={false}
            savedOptions={savedOptionsList}
            pickupDate={pickupDate}
            returnDate={returnDate}
            onDeleteSaved={() => setSavedOptionIds([])}
            onGoToCompare={handleOpenSavedComparison}
            onOpenShare={handleShareSavedComparison}
            onGoToSearch={() => setActiveScreenId('search')}
            isSaved={savedOptionsList.length >= 2}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="grid h-dvh min-h-[520px] w-full grid-rows-[auto_minmax(0,1fr)_auto] justify-items-center gap-3 overflow-y-auto bg-[var(--canvas-bg)] p-3 text-slate-100 antialiased selection:bg-orange-500 selection:text-white md:p-6">
      {/* Top Floating Screen Quick-Switcher Bar (Trực quan, tinh gọn) */}
      <header className="prototype-switcher flex w-full max-w-2xl flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-blue-900/40 px-4 py-2 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-200 mr-2 shrink-0">
          <Smartphone size={14} className="text-orange-400" />
          <span>Màn hình:</span>
        </div>
        {screenPresets.map((screen) => {
          const isActive = activePopup
            ? activePopup === screen.id
            : activeScreenId === screen.id ||
              (screen.id === 'compare-2' && (activeScreenId === 'compare-1' || activeScreenId === 'compare-3'));
          return (
            <button
              key={screen.id}
              onClick={() => navigateToScreen(screen.id)}
              className={`px-3 py-1 text-xs font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-800 font-bold shadow-md shadow-blue-950/20 scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {screen.label}
            </button>
          );
        })}
      </header>

      {/* Main Single Centered Mobile Phone Prototype */}
      <div className="relative flex min-h-0 w-full items-center justify-center">
        <PhoneFrame
          screenId={activeScreenId}
          title="Đà Lạt Ride"
          bottomNav={
            <BottomNav
              activeScreenId={activeScreenId}
              onNavigate={navigateToScreen}
              compareCount={selectedOptionIds.length}
            />
          }
          overlay={activePopup ? (
            <ScreenPopup
              key={activePopup}
              label={
                activePopup === 'calendar' ? 'Chọn ngày' :
                activePopup === 'location' ? 'Chọn điểm nhận' :
                activePopup === 'share' ? 'Chia sẻ bảng so sánh' : 'Chia sẻ xe'
              }
              onClose={closePopup}
            >
              {activePopup === 'calendar' ? (
                <CalendarScreen
                  isEditMode={false}
                  editableTexts={{}}
                  onTextChange={() => {}}
                  onConfirm={handleCalendarConfirm}
                  initialPickupDate={pickupDate}
                  initialPickupTime={pickupTime}
                  initialReturnDate={returnDate}
                  initialReturnTime={returnTime}
                />
              ) : activePopup === 'location' ? (
                <LocationScreen
                  isEditMode={false}
                  editableTexts={{}}
                  onTextChange={() => {}}
                  onSubmit={handleLocationSubmit}
                  currentLocation={pickupLocation}
                  currentDeliveryMode={deliveryMode}
                />
              ) : activePopup === 'share' ? (
                <ShareSheetScreen
                  options={fullCompareList}
                  shops={INITIAL_SHOPS}
                  isEditMode={false}
                  editableTexts={{}}
                  onTextChange={() => {}}
                  isPlaceholderMode={false}
                  pickupDate={pickupDate}
                  returnDate={returnDate}
                  onClose={closePopup}
                />
              ) : (
                <SingleBikeShareSheetScreen
                  shop={currentDetailShop}
                  option={currentDetailOption}
                  isEditMode={false}
                  editableTexts={{}}
                  onTextChange={() => {}}
                  isPlaceholderMode={false}
                  onClose={closePopup}
                />
              )}
            </ScreenPopup>
          ) : undefined}
        >
          {renderScreenContent()}
        </PhoneFrame>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-blue-200/60">
        <Sparkles size={12} className="text-orange-400" />
        <span>Tương tác trực tiếp trên màn hình điện thoại như ứng dụng mobile thật</span>
      </div>
    </main>
  );
}
