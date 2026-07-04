# ND STORE - Cộng đồng & Thương mại Điện tử

Chào mừng bạn đến với dự án **ND STORE** - Nền tảng website hiện đại, tập trung vào trải nghiệm người dùng (UX) và tối ưu hóa hiệu năng.

## 🚀 Tổng quan dự án
Dự án được xây dựng nhằm tạo ra một hệ sinh thái kết nối cộng đồng người dùng với các đợt mở bán sản phẩm giới hạn. Website kết hợp giữa tư duy thiết kế tối giản, hiệu ứng chuyển động mượt mà và hệ thống tự động hóa dữ liệu phía sau hậu trường.

## 🛠 Công nghệ sử dụng

* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+).
* **Công cụ & Môi trường:** Node.js (Build-tool), Git/GitHub (Quản lý mã nguồn).
* **Tự động hóa:** Tích hợp Webhook thông qua **Make.com** để xử lý dữ liệu đăng ký theo thời gian thực.
* **Triển khai:** Vercel

## ✨ Các tính năng nổi bật

* **Scrollytelling & Parallax:** Hiệu ứng cuộn trang mượt mà giúp dẫn dắt người dùng qua từng khối nội dung.
* **Mini E-commerce:** Hỗ trợ giỏ hàng, danh sách yêu thích và lịch sử sản phẩm đã xem (sử dụng Local Storage).
* **Data Tracking:** Cơ chế ghi nhận hành vi người dùng (click, scroll) và gửi về Webhook tự động hóa.
* **Chatbot tích hợp**: Hỗ trợ giải đáp khách hàng tự động thông qua API.
* **Bảo mật:** Tuân thủ các tiêu chuẩn bảo mật mã nguồn, loại bỏ thông tin nhạy cảm (secrets) thông qua GitHub Push Protection.
* **Giao diện:** Thiết kế Glassmorphism hiện đại, responsive trên mọi thiết bị.

## 🛡️ Lưu ý về Bảo mật (Security)
Dự án có tích hợp Chatbot thông qua API bên thứ ba. Để đảm bảo an toàn cho tài khoản cá nhân:

1. **Không đẩy (push) API Key:** Tuyệt đối không để lộ API Key trực tiếp trong mã nguồn khi đẩy lên GitHub.
2. **Sử dụng biến môi trường:** Tạo một tệp `.env` trong thư mục gốc của dự án và khai báo khóa API của bạn theo định dạng sau:   API_KEY=YOUR_API_KEY_HERE

## 📦 Quy trình phát triển (Workflow)
1. **Quản lý mã nguồn:** Sử dụng Git để kiểm soát phiên bản và GitHub để lưu trữ tập trung.
2. **Đồng bộ hóa:** Quy trình *Pull-before-Push* đảm bảo tính nhất quán của mã nguồn.
3. **Tự động hóa:** Dữ liệu từ biểu mẫu đăng ký được đóng gói và gửi tới Make.com để xử lý tự động (lưu Google Sheets/Gửi Email).

## 💡 Cấu trúc dự án
```text
ND_STORE/
├── assets             # Nơi chứa ảnh và icon
├── js/
│   ├── main.js        # Logic điều khiển hiệu ứng & tương tác
│   └── chatbot.js     # Tích hợp API Chatbot
├── css/
│   ├── style.css      # CSS tùy chỉnh & Tailwind directives
|   └── tailwind-prod.css      
├── index.html         # Trang chủ
└── README.md          # Tài liệu dự án