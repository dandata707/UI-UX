export type ScreenId =
  | 'search' // MÀN 1
  | 'calendar' // MÀN 1a
  | 'location' // MÀN 1b
  | 'results' // MÀN 2
  | 'results-dropdown' // MÀN 2a
  | 'detail' // MÀN 3
  | 'share-single' // MÀN 3a
  | 'compare-1' // MÀN 4a
  | 'compare-2' // MÀN 4b
  | 'compare-3' // MÀN 4c
  | 'share' // MÀN 5
  | 'saved'; // MÀN 6

export interface CommentItem {
  id: string;
  screenId: ScreenId;
  xPercent: number; // 0 to 100 on the 390x844 frame
  yPercent: number;
  author: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

export interface MotorbikeOption {
  id: string;
  shopId: string;
  bikeName: string;
  bikeType: 'Xe số' | 'Tay ga' | 'Xe côn/Cào cào';
  engine: string;
  dailyRate: number; // e.g. 140000
  deliveryFee: number; // e.g. 0 or 15000
  totalEstimate: number;
  preparationTotal?: string; // Tổng cần chuẩn bị
  lastUpdated: string; // e.g. "5 phút trước"
  deposit: string; // e.g. "Giữ giấy tờ (không cọc tiền)"
  requirements: string[];
  pickupHours: string;
  returnHours: string;
  imageUrl: string;
  isRecommended?: boolean;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  distance: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  highlight: string;
  options: MotorbikeOption[];
  phone: string;
  freeCancellation: boolean;
}

export interface SearchFilterState {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  bikeType: string;
  quantity: number;
  pickupLocation: string;
  deliveryMode: 'delivery' | 'pickup'; // Giao tận nơi hoặc Đến cửa hàng nhận
}

export interface EditableTextMap {
  [key: string]: string;
}
