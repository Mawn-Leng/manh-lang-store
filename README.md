# Mạnh Lăng Store

Website tĩnh chia sẻ file IPA, thiết kế responsive cho iPhone, Android và máy tính.

## Đưa website lên GitHub Pages miễn phí
1. Đăng nhập GitHub và tạo repository mới, ví dụ `manh-lang-store`.
2. Tải lên các file trong thư mục này, gồm `index.html`, `style.css`, `apps.js`, `script.js`, và thư mục `apps`.
3. Vào **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**, branch `main`, folder `/ (root)`, rồi Save.
5. Đợi GitHub Pages xuất bản website và mở URL được cung cấp trong trang Pages.

## Lưu ý về dung lượng và cài đặt iOS
- GitHub giới hạn kích thước file khi tải lên qua giao diện web; file IPA lớn có thể cần Git LFS hoặc dịch vụ lưu trữ file riêng. Git LFS có giới hạn/quota riêng.
- File IPA chỉ là gói ứng dụng, không đảm bảo có thể cài đặt. Việc cài đặt phụ thuộc chữ ký hợp lệ, provisioning và phương thức phân phối của Apple. Với phân phối rộng rãi, hãy dùng phương thức chính thức phù hợp như TestFlight hoặc App Store.
- Chỉ chia sẻ ứng dụng bạn sở hữu hoặc có quyền phân phối. Không đăng công khai ứng dụng có bản quyền hoặc dữ liệu riêng tư khi chưa được phép.
- Website tĩnh này không có hệ thống đăng nhập/quản trị upload. Muốn thêm ứng dụng, bạn cập nhật `apps.js` và tải file lên hosting/repository.
