# Hướng dẫn tạo tài khoản Admin

## Bước 1: Đăng ký tài khoản
1. Truy cập trang đăng ký `/auth`
2. Tạo tài khoản mới với email và mật khẩu

## Bước 2: Thêm quyền Admin
Sau khi đăng ký, bạn cần thêm role admin cho tài khoản. 

### Cách 1: Sử dụng Lovable Cloud Dashboard
1. Mở Lovable Cloud dashboard
2. Vào phần "Database" 
3. Tìm bảng `user_roles`
4. Thêm một record mới:
   - `user_id`: ID của user (lấy từ bảng auth.users hoặc từ session)
   - `role`: chọn 'admin'

### Cách 2: Sử dụng SQL
Chạy câu lệnh SQL sau trong Lovable Cloud:

```sql
-- Thay YOUR_USER_ID bằng ID thật của user
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');
```

## Lấy User ID
Để lấy User ID của tài khoản:
1. Đăng nhập vào ứng dụng
2. Mở Developer Console (F12)
3. Chạy lệnh:
```javascript
supabase.auth.getUser().then(({data}) => console.log(data.user.id))
```

Hoặc kiểm tra trong Lovable Cloud Dashboard > Auth > Users

## Kiểm tra
Sau khi thêm role admin:
1. Đăng xuất và đăng nhập lại
2. Click vào avatar ở góc phải navbar
3. Bạn sẽ thấy menu "Dashboard" xuất hiện
4. Click vào để truy cập trang quản trị
