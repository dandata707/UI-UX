import React from 'react';
import {
  BookOpen,
  Compass,
  MousePointer,
  Smartphone,
  Layers,
  Sparkles,
  Clock,
  Cpu,
  ArrowRightLeft,
} from 'lucide-react';

interface UxLawsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UxLawsModal: React.FC<UxLawsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const laws = [
    {
      number: '01',
      name: "Hick's Law",
      tagline: 'Càng nhiều lựa chọn phức tạp → Càng khó quyết định',
      summary:
        'Giảm tải nhận thức bằng cách tinh gọn lựa chọn, nhóm các trường nhập và cung cấp đề xuất thông minh.',
      appApplication: [
        'Màn 1: Form tìm kiếm 1 lần cuộn, có chip chọn sẵn thời gian 2 ngày (CN - T3) và điểm đến quen thuộc (Chợ Đêm, Ga Đà Lạt).',
        'Màn 2: Bộ lọc phân loại rõ ràng (Đề xuất / Giá trọn gói thấp / Miễn phí giao), tránh tràn lan lựa chọn.',
        'Màn 4: Giới hạn so sánh tối đa đúng 3 phương án để người dùng không bị quá tải cân nhắc.',
      ],
      icon: Compass,
      color: 'bg-blue-50 text-blue-900 border-blue-800',
    },
    {
      number: '02',
      name: "Fitts's Law",
      tagline: 'Target càng lớn và càng dễ tiếp cận → Càng dễ thao tác',
      summary:
        'Kích thước vùng bấm tối thiểu 44×44px, đặt các thao tác cốt lõi trong "Vùng ngón cái" (Natural Thumb Zone) ở đáy màn hình.',
      appApplication: [
        'Thanh Bottom Navigation 3 tab cố định ở đáy điện thoại, dễ chạm một tay khi đang di chuyển.',
        'Nút Primary CTA full-width ("TÌM XE", "SO SÁNH", "Gọi shop") to rõ, dễ bấm chính xác.',
        'Thanh nổi dưới Màn 2 và Màn 3 luôn nằm trọn trong vùng ngón cái thoải mái.',
      ],
      icon: MousePointer,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-800',
    },
    {
      number: '03',
      name: "Jakob's Law",
      tagline: 'Đừng bắt người dùng học lại • Mental Model quen thuộc',
      summary:
        'Người dùng dành phần lớn thời gian trên các app thông dụng, họ mong đợi cấu trúc điều hướng quen thuộc.',
      appApplication: [
        'Cấu trúc thanh Bottom Bar 3 tab tinh giản: TÌM XE · SO SÁNH (3) · ĐÃ LƯU.',
        'Header có nút Back (< Tìm kiếm, < Kết quả) góc trái trên, giỏ so sánh và định dạng giá quen thuộc.',
        'Bảng so sánh 3 cột vuốt ngang tương đồng với các bảng thông số kỹ thuật thương mại điện tử.',
      ],
      icon: Smartphone,
      color: 'bg-purple-50 text-purple-900 border-purple-800',
    },
    {
      number: '04',
      name: "Miller's Law",
      tagline: 'Working memory có giới hạn (7±2) • Đừng bắt nhớ quá nhiều',
      summary:
        'Chunking (chia nhỏ nhóm dữ liệu) giúp người dùng dễ đọc, dễ đối chiếu và không bị căng thẳng tâm lý.',
      appApplication: [
        'Chia nhỏ chi phí trọn gói thành các dòng rõ ràng: Giá thuê 2 ngày + Phí giao + Mũ bảo hiểm/Áo mưa = Tổng thanh toán.',
        'Tách bạch dòng "Tổng thanh toán 2 ngày" và "Tổng cần chuẩn bị (gồm tiền cọc hoàn lại)".',
        'Phân tách thông tin cửa hàng thành các khối độc lập: Địa chỉ, giờ nhận/trả, quy định cọc xe.',
      ],
      icon: Layers,
      color: 'bg-amber-50 text-amber-900 border-amber-800',
    },
    {
      number: '05',
      name: 'Von Restorff Effect',
      tagline: 'Khác biệt giúp dễ được nhớ • Visual Hierarchy phân cấp rõ',
      summary:
        'Yếu tố nổi bật về màu sắc hoặc kiểu dáng sẽ thu hút sự chú ý trước (Primary vs Secondary vs Tertiary).',
      appApplication: [
        'Primary CTA sử dụng nền đen chữ trắng tương phản mạnh nhất, nút phụ viền mảnh hoặc xám.',
        'Badge số lượng "3" nổi bật trên tab So sánh, báo hiệu đã chọn đủ 3 phương án để so sánh.',
        'Nút ✓ ĐÃ THÊM chuyển sang trạng thái đã chọn nổi bật với dấu tick rõ ràng.',
      ],
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-900 border-rose-800',
    },
    {
      number: '06',
      name: 'Zeigarnik Effect',
      tagline: 'Việc chưa hoàn thành dễ chiếm sự chú ý',
      summary:
        'Thúc đẩy người dùng hoàn thiện chu trình chọn xe và chia sẻ quyết định với bạn bè.',
      appApplication: [
        'Thanh nổi Màn 2 thông báo tiến độ: "ĐÃ CHỌN 3 PHƯƠNG ÁN (Tối đa 3 phương án)" với nút SO SÁNH trực tiếp.',
        'Màn 4 khuyến khích bước cuối: "GỬI BẠN BÈ DUYỆT, không cần đăng nhập" qua nút CHIA SẺ SO SÁNH.',
        'Bảng tóm tắt trong link chia sẻ giúp nhóm bạn ra quyết định nhanh chóng.',
      ],
      icon: Clock,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-800',
    },
    {
      number: '07',
      name: "Parkinson's Law",
      tagline: 'Đừng khiến người dùng tốn nhiều thời gian hơn mức cần thiết',
      summary:
        'Tự động gợi ý, điền sẵn thông tin và tối ưu quy trình để giảm thiểu thời gian thao tác từ 60-90s xuống vài giây.',
      appApplication: [
        'Người nhận link chia sẻ không cần đăng nhập vẫn xem được toàn bộ bảng so sánh và giá trọn gói.',
        'Tab "ĐÃ LƯU" lưu trữ sẵn bảng so sánh gần nhất, cho phép Xem lại hoặc Gửi lại link trong 1 chạm.',
        'Hệ thống tự động tính tổng tiền thuê 2 ngày và phí giao xe theo thời gian thực.',
      ],
      icon: Cpu,
      color: 'bg-teal-50 text-teal-900 border-teal-800',
    },
    {
      number: '08',
      name: 'Serial Position Effect',
      tagline: 'Con người nhớ tốt hơn ở vị trí đầu và vị trí cuối',
      summary:
        'Primacy Effect (mục đầu tiên) và Recency Effect (mục cuối cùng) là 2 vị trí vàng trên thanh điều hướng.',
      appApplication: [
        'Vị trí 1 (Đầu thanh Bottom Bar): TÌM XE (Chức năng cốt lõi người dùng cần khi mở app).',
        'Vị trí giữa: SO SÁNH (3) (Nơi tập hợp các phương án đang cân nhắc).',
        'Vị trí cuối (Đuôi thanh Bottom Bar): ĐÃ LƯU (Nơi lưu lại các bảng so sánh đã duyệt).',
      ],
      icon: ArrowRightLeft,
      color: 'bg-slate-100 text-slate-900 border-slate-800',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-mono">
      <div className="bg-white border-2 border-slate-900 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-3.5 bg-[var(--color-primary-deep)] text-white flex items-center justify-between border-b-2 border-blue-900 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-400" />
            <div>
              <div className="font-bold text-sm uppercase tracking-tight">
                ĐỐI CHIẾU 8 NGUYÊN TẮC UX LAWS (SLIDE BÀI HỌC)
              </div>
              <div className="text-[11px] text-slate-300 font-sans">
                Cách wireframe ứng dụng thuê xe máy Đà Lạt áp dụng chuẩn mực UX Law
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-7 h-7 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          <div className="border border-slate-700 bg-slate-50 p-2.5 text-xs text-slate-800 font-sans">
            <span className="font-bold font-mono">ĐỐI CHIẾU TRỰC TIẾP: </span>
            Dựa trên bộ slide <span className="font-bold">"07 UX LAWS - Quoc Chung UIUX"</span>,
            chúng tôi đã thiết kế hệ thống wireframe với{' '}
            <span className="font-bold text-slate-950 underline">Thanh điều hướng dưới 3 tab (TÌM XE · SO SÁNH (3) · ĐÃ LƯU)</span>{' '}
            và các quy chuẩn công thái học:
          </div>

          <div className="space-y-3">
            {laws.map((law) => {
              return (
                <div
                  key={law.number}
                  className={`border-2 p-3 ${law.color} space-y-1.5 shadow-2xs`}
                >
                  <div className="flex items-center justify-between border-b border-current/20 pb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs px-1.5 py-0.5 border border-current bg-white/70 font-mono">
                        #{law.number}
                      </span>
                      <span className="font-bold text-sm tracking-tight">{law.name}</span>
                    </div>
                    <span className="text-[10px] font-sans italic opacity-85">{law.tagline}</span>
                  </div>

                  <p className="text-xs font-sans leading-relaxed opacity-95">{law.summary}</p>

                  <div className="bg-white/80 border border-current/30 p-2 text-[11px] font-sans space-y-1 mt-1">
                    <div className="font-bold font-mono text-[10px] uppercase tracking-wide opacity-80">
                      Ứng dụng thực tế trong app:
                    </div>
                    {law.appApplication.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-800">
                        <span className="font-mono font-bold shrink-0 text-slate-900">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t-2 border-slate-900 flex items-center justify-between shrink-0">
          <div className="text-[10px] text-slate-600 font-sans">
            ✓ Tuân thủ 100% tài liệu UX Law với 5 màn hình chuẩn công thái học và Bottom Navigation
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[var(--color-primary)] text-white font-bold text-xs hover:bg-[var(--color-primary-hover)] uppercase cursor-pointer"
          >
            Đã hiểu &amp; Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
