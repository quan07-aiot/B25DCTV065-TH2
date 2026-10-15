# Bài tập Lập trình Web: Thư viện lớp
Website quản lý thư viện lớp (xem, tìm kiếm, lọc, yêu thích, thêm sách mới). Bài tập gồm hai phiên bản để so sánh phương pháp lập trình.

## Cấu trúc dự án
*   `phan-a-typescript/`: Làm bằng HTML, CSS và TypeScript (biên dịch ra JavaScript thuần).
*   `phan-b-react/`: Làm bằng React cơ bản (khởi tạo bằng Vite).

---

## Phần A: JavaScript / TypeScript Thuần
*   **Chức năng & Đặc điểm:**
    *   Tải dữ liệu từ `books.json` (Fetch API, Async/Await).
    *   Thao tác DOM thủ công (`createElement`, `textContent`).
    *   Xử lý logic tìm kiếm, lọc thể loại, validate form thêm sách.
    *   Sử dụng *Event Delegation* cho các nút bấm tương tác.
    *   Giao diện responsive bằng Flexbox.
    *   **Nâng cao:** Viết bằng TypeScript, có chế độ Sáng/Tối (Dark Theme).

---

## Phần B: React Cơ Bản
*   **Cấu trúc & Đặc điểm:**
    *   Dữ liệu được lấy từ file cứng `data/books.js`.
    *   Giao diện chia nhỏ thành các **Components** dễ tái sử dụng (Header, BookList, BookCard, GenreFilter...).
    *   Dữ liệu truyền từ trên xuống qua `props`. Vòng lặp hiển thị danh sách dùng `map` với `key`.
    *   Quản lý trạng thái (như danh sách yêu thích) bằng hook `useState`. 

---

## So sánh nhanh Phần A và Phần B

| Tiêu chí | Phần A (TypeScript thuần) | Phần B (React) |
| :--- | :--- | :--- |
| **Xây dựng UI** | Tự tạo thủ công từng thẻ (`createElement`) | Viết cú pháp JSX mô tả giao diện |
| **Cập nhật UI** | Phải tự gọi hàm `render()` mỗi khi đổi dữ liệu | Tự động cập nhật giao diện khi đổi `state` |
| **Tổ chức code** | Chia theo file chức năng (API, logic, render) | Chia theo mảnh giao diện (Components) |
| **Ưu / Nhược** | Hiểu sâu lõi DOM, nhưng code dài, dễ lỗi đồng bộ | Code ngắn gọn, dễ tái sử dụng, tự động hóa cao |
