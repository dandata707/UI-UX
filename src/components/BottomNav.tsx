import React from 'react';
import { Search, ArrowRightLeft, Bookmark } from 'lucide-react';
import { ScreenId } from '../types/wireframe';

interface BottomNavProps {
  activeScreenId: ScreenId;
  onNavigate: (screenId: ScreenId) => void;
  compareCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreenId,
  onNavigate,
  compareCount = 0,
}) => {
  // Tab Bar 3 tab: TÌM XE · SO SÁNH (n) · ĐÃ LƯU
  const isSearchActive =
    activeScreenId === 'search' ||
    activeScreenId === 'calendar' ||
    activeScreenId === 'location' ||
    activeScreenId === 'results' ||
    activeScreenId === 'results-dropdown' ||
    activeScreenId === 'detail' ||
    activeScreenId === 'share-single';

  const isCompareActive =
    activeScreenId === 'compare-1' ||
    activeScreenId === 'compare-2' ||
    activeScreenId === 'compare-3' ||
    activeScreenId === 'share';

  const isSavedActive = activeScreenId === 'saved';

  const navItems = [
    {
      id: 'search' as ScreenId,
      label: 'TÌM XE',
      icon: Search,
      isActive: isSearchActive,
      action: () => {
        if (activeScreenId === 'search') {
          onNavigate('results');
        } else {
          onNavigate('search');
        }
      },
    },
    {
      id: 'compare-3' as ScreenId,
      label: `SO SÁNH`,
      countBadge: compareCount,
      icon: ArrowRightLeft,
      isActive: isCompareActive,
      action: () =>
        onNavigate(
          compareCount === 1
            ? 'compare-1'
            : compareCount === 2
            ? 'compare-2'
            : 'compare-3'
        ),
    },
    {
      id: 'saved' as ScreenId,
      label: 'ĐÃ LƯU',
      icon: Bookmark,
      isActive: isSavedActive,
      action: () => onNavigate('saved'),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="shrink-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 z-30 select-none shadow-[0_-4px_16px_rgba(0,0,0,0.03)]"
    >
      <div className="grid grid-cols-3 gap-2 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isActive;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.action}
              className={`min-h-[50px] py-1 px-2 flex flex-col items-center justify-center relative rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-blue-950/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-100/80 active:scale-95'
              }`}
              title={`Chuyển đến tab ${item.label}`}
            >
              <div className="relative">
                <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
                {item.countBadge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-3 text-[10px] font-bold px-1.5 min-w-[18px] h-4 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-white ring-2 ring-[var(--color-primary)]'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {item.countBadge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold mt-1 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
