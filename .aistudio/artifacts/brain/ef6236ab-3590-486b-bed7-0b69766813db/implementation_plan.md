# Kế hoạch Nâng cấp Prototype Mobile Thuê Xe Máy Đà Lạt

Chuyển đổi toàn diện hệ thống Wireframe Lo-Fi thành một Prototype Mobile tương tác trực quan, thanh lịch và mượt mà; loại bỏ toàn bộ công cụ và bảng điều khiển xung quanh để tập trung 100% vào trải nghiệm ứng dụng mobile với bảng màu Xanh Navy đậm và Cam nổi bật.

---

> [!IMPORTANT]
> **Các quyết định chính đã được xác nhận:**
> - **Bố cục hiển thị:** Tập trung vào một khung điện thoại mobile ở chính giữa màn hình (chuẩn tỷ lệ iPhone 390×844px), tương tác chuyển cảnh liền mạch như ứng dụng thật; loại bỏ thanh công cụ bên ngoài (Toolbar, CommentDrawer, UxLawsModal, chế độ Canvas lưới).
> - **Hệ màu chủ đạo (60-30-10):**
>   - **Màu nền & bề mặt (60%):** Nền canvas ngoài tối lịch thiệp tôn điện thoại, giao diện app mobile nền sáng sạch sẽ (`#F8FAFC` / `#FFFFFF`).
>   - **Màu nhận diện & cấu trúc (30%):** Xanh Navy đậm (`#0F2547` / `#1E3A8A`) cho header, thanh điều hướng, card tiêu đề, icon định vị và trạng thái chọn.
>   - **Màu nhấn hành động (10%):** Cam rực rỡ (`#FF6B00` / `#F97316`) cho các nút bấm chính (CTA: "Tìm xe ngay", "Thuê xe này", "Xem so sánh", "Xác nhận"), huy hiệu giảm giá/ưu đãi.
> - **Hiệu ứng tương tác:** Tích hợp chuyển động hover mượt mà (`hover:scale-[1.02]`, `hover:shadow-md`, `active:scale-[0.98]`, `transition-all duration-200`) cho mọi nút bấm, thẻ xe, bộ lọc và thẻ tương tác.

---

## 1. Tổng quan & Mục tiêu Trải nghiệm (UI/UX)

- **Mục tiêu:** Mang lại cảm giác sử dụng chân thực như một ứng dụng iOS native chuyên nghiệp dành cho du khách thuê xe máy tại Đà Lạt (tìm kiếm theo địa điểm/thời gian, so sánh chi tiết giữa các nhà xe, kiểm tra chi phí giao tận nơi, đặt xe nhanh chóng).
- **Trọng tâm tinh gọn:** Gỡ bỏ các công cụ hỗ trợ wireframe (thước đo, ghi chú, sửa chữ trực tiếp, danh sách comment) để người dùng chỉ tập trung vào prototype tương tác của sản phẩm cuối cùng.

---

## 2. Thiết kế Giao diện & Trải nghiệm Người dùng

### 2.1. Bảng màu & Visual Identity
- **Primary Navy:** `#0F2444` (Xanh navy trầm sang trọng, mang lại cảm giác tin cậy cho dịch vụ di chuyển).
- **Accent Orange:** `#FF6B00` & `#F97316` (Cam năng động, tạo điểm nhấn thị giác rõ ràng cho các nút kêu gọi hành động then chốt).
- **Neutral Light:** `#F8FAFC` (Canvas nền app), `#FFFFFF` (Surface card xe), `#E2E8F0` (Viền hairline tinh tế).
- **Semantic Badges:** Xanh lá cỏ (`#10B981`) cho trạng thái "Giao miễn phí" và "Còn xe", Vàng hổ phách (`#F59E0B`) cho đánh giá sao.

### 2.2. Trải nghiệm Tương tác & Micro-interactions
- **Card xe & Phương án thuê:** Hover nhẹ nổi khối, viền highlight navy nhạt khi di chuột, nhấp chọn để xem chi tiết.
- **Nút bấm CTA (Cam nổi bật):** Hiệu ứng hover bóng cam (`hover:shadow-orange-500/25`), nhấn nhẹ `active:scale-[0.97]` tạo phản hồi xúc giác.
- **Thanh Bottom Navigation:** 4 tab cốt lõi (Khám phá / Tìm kiếm, Đã lưu, So sánh, Đơn thuê) có chỉ báo tab active màu xanh navy + điểm nhấn cam.

---

## 3. Kiến trúc Luồng Tương tác (Interactive Flow)

```
┌──────────────────────────────────────────────────────────────┐
│                    KHUNG MOBILE PROTOTYPE                    │
│                                                              │
│  [Màn 1: Tìm kiếm xe & Địa điểm]                             │
│       │                                                      │
│       ├──► [Màn 1a: Chọn ngày & giờ nhận - trả xe]          │
│       │         └── Trở về Màn 1 với ngày đã chọn            │
│       │                                                      │
│       ├──► [Màn 1b: Chọn điểm giao xe / Homestay]            │
│       │         └── Trở về Màn 1 với địa chỉ cập nhật        │
│       │                                                      │
│       └──► [Nút CTA Cam: "Tìm xe ngay"]                     │
│                 │                                            │
│                 ▼                                            │
│  [Màn 2: Danh sách kết quả & Lọc xe]                         │
│       │                                                      │
│       ├──► [Màn 3: Chi tiết xe & Đặt thuê]                   │
│       │         └──► [Màn 3a: Bottom Sheet chia sẻ xe lẻ]    │
│       │                                                      │
│       ├──► [Chọn checkbox so sánh xe (tối đa 3)]             │
│       │         │                                            │
│       │         ▼                                            │
│       ├──► [Màn 4a: Bảng So sánh thông số 3 xe]              │
│       │         ├──► [Màn 4b: Lưu bảng so sánh]              │
│       │         └──► [Màn 4c: Sheet chia sẻ link so sánh]    │
│       │                                                      │
│       └──► [Bottom Nav: Màn 5 Đã lưu / Màn 6 Đơn thuê]       │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Kế hoạch Triển khai Chi tiết

1. **Dọn dẹp môi trường ngoài (Clean Canvas):**
   - Loại bỏ `Toolbar`, `CommentDrawer`, `UxLawsModal`, chế độ canvas lưới, chế độ chỉnh sửa chữ và thanh bình luận khỏi `src/App.tsx`.
   - Giữ lại khung thiết bị mobile cao cấp (`PhoneFrame`) đặt chính giữa viewport với thanh trạng thái iOS sắc nét, dynamic notch và vạch Home bar.
   - Thêm nút chuyển màn hình/quay lại trực quan tinh gọn để người dùng có thể thoải mái thử nghiệm mọi kịch bản.

2. **Cập nhật hệ màu & Visual Styling cho các màn hình:**
   - **`PhoneFrame.tsx`**: Tinh chỉnh khung viền kim loại sang trọng, hiệu ứng đổ bóng đa tầng.
   - **`SearchScreen.tsx`**: Thiết kế lại giao diện hiện đại với màu Xanh Navy đậm chủ đạo, thanh tìm kiếm nổi bật, selector giao nhận trực quan, nút CTA cam rực rỡ với hover shadow.
   - **`CalendarScreen.tsx` & `LocationScreen.tsx`**: Tông màu xanh navy đồng bộ cho header, ô chọn địa điểm và lịch trực quan với trạng thái hover rõ rệt.
   - **`ResultsScreen.tsx`**: Thẻ danh sách xe thiết kế hiện đại, hình ảnh chân thực, huy hiệu tiện ích, nút "So sánh" và "Chọn xe" tương tác tức thì.
   - **`DetailScreen.tsx`**: Trang chi tiết xe với ảnh lớn, thông số dung tích/cốp xe/xăng, chính sách giao nhận và thanh CTA cam cố định ở đáy.
   - **`CompareScreen.tsx`**: Bảng so sánh 3 cột trực quan với màu sắc thương hiệu, thanh tiến trình highlight xe tối ưu nhất.
   - **`ShareSheetScreen.tsx` & `SingleBikeShareSheetScreen.tsx`**: Bottom sheet bo cong mượt mà theo chuẩn iOS.
   - **`SavedScreen.tsx` & `BottomNav.tsx`**: Giao diện danh sách xe yêu thích và thanh điều hướng đáy đạt chuẩn ngón tay cái (Thumb-zone).

3. **Hoàn thiện hiệu ứng Hover & Active States:**
   - Bổ sung hiệu ứng hover chuyển màu, phóng to nhẹ, đổ bóng đổ mượt cho tất cả thẻ xe, nút bấm, bộ lọc danh mục và item danh sách.

4. **Kiểm tra & Biên dịch (Verification):**
   - Kiểm tra toàn bộ mã nguồn TypeScript, đảm bảo không còn lỗi import hay cảnh báo cú pháp, chạy `compile_applet` xác nhận thành công.
