# quanly88.com

Web tĩnh React + Vite, deploy lên Cloudflare Pages. Mã đăng nhập và mã kích hoạt
được lưu trong Cloudflare KV và sửa được qua trang admin, không cần deploy lại.

Cách hoạt động phía web (`src/lib/codes.ts`): khi mở web, fetch `/api/codes` **1 lần**.
Fetch được thì lưu vào bộ nhớ + `localStorage` và so sánh ngay trên client.
Fetch lỗi thì dùng mã đã lưu lần trước, không có thì dùng mặc định `1122` / `123890`.

## Lệnh

```bash
yarn dev                  # dev UI (không có API -> dùng mã mặc định)
yarn dev:cf               # build + chạy Pages Functions local tại http://localhost:8788
yarn build                # tsc + vite build -> dist/
yarn typecheck:functions  # typecheck thư mục functions/
yarn deploy               # build + deploy production (nhánh main)
```

Lần đầu trên máy mới: `npx wrangler login`.

## Trang admin

- URL: `/admin`
- Đăng nhập bằng mật khẩu admin (biến môi trường `ADMIN_PASSWORD` của Pages project).
- Sửa **Mã 1** (mã phần mềm khi đăng nhập) và **Mã 2** (mã kích hoạt gói), bấm Lưu. Có hiệu lực ngay.

Đổi mật khẩu admin:

```bash
printf 'MAT_KHAU_MOI' | npx wrangler pages secret put ADMIN_PASSWORD --project-name=quanly88
```

hoặc trên Dashboard: Workers & Pages → quanly88 → Settings → Variables and Secrets.

## API (Pages Functions, thư mục `functions/`)

| Method | Path               | Auth                     | Mô tả                                   |
|--------|--------------------|--------------------------|-----------------------------------------|
| GET    | `/api/codes`       | không                    | Trả `{code1, code2}` (web gọi khi mở trang) |
| GET    | `/api/admin/codes` | header `x-admin-password` | Trả `{code1, code2}`                    |
| PUT    | `/api/admin/codes` | header `x-admin-password` | Body `{code1, code2}`, lưu vào KV       |

KV namespace `quanly88-config` (binding `CONFIG`) khai báo trong `wrangler.jsonc`.
Key `code1`, `code2`. Nếu key chưa có, mặc định là `1122` và `123890`.

## Local dev với API

`yarn dev:cf` dùng KV local (rỗng, nên dùng mã mặc định). Để có mật khẩu admin
local, tạo file `.dev.vars` (đã gitignore):

```
ADMIN_PASSWORD=admin88
```
