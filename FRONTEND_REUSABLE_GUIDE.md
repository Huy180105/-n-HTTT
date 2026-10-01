# Frontend Reusable Kit

Tài liệu này là bản đồ các phần có giá trị tái sử dụng từ `pharmacy-admin` và
`pharmacy-store` cho những project React/Vite khác.

## 1. Nền tảng nên kế thừa trước

| Nhóm | Thành phần hiện có | Giá trị tái sử dụng |
| --- | --- | --- |
| UI primitives | `src/components/ui` | Button, input, form, dialog, sheet, drawer, select, tabs, table, tooltip, skeleton, chart... |
| Style utilities | `src/lib/utils.ts`, `src/styles/global.sass`, Tailwind config | `cn()`, design token, dark mode, spacing và typography thống nhất |
| App providers | `src/providers` | Auth, router, theme, React Query và các context dùng toàn ứng dụng |
| Layout | `src/layouts`, `src/components/layouts` | Auth layout, dashboard layout, storefront layout, sidebar, header, navigation |
| API client | `src/services/api.ts` | Axios instance, JWT, locale, xử lý 401, chuyển snake_case/camelCase |
| Data fetching | `@tanstack/react-query`, `src/hooks` | Cache, loading, refetch, optimistic workflow và query theo feature |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` | Form typed, validation, error state, reusable field components |
| Global state | `src/atoms` với Jotai | Auth, cart, dialog và state nhỏ cần chia sẻ |
| Routing | `src/config/routes.ts`, `src/config/router.tsx` | Route constants, nested layouts, protected routes và fallback pages |
| Feedback | Sonner, alert-dialog, confirm-dialog, loading/skeleton | Toast, xác nhận hành động nguy hiểm, trạng thái loading/error/empty |
| Responsive UX | `use-mobile`, drawer/sheet, nav mobile | Mobile-first navigation và breakpoint behavior |

## 2. Bộ component nên tách thành package dùng chung

Nên gom thành một package nội bộ, ví dụ `@longchau/ui` hoặc `packages/ui`.

### Primitive components

- `Button`, `IconButton`, `Badge`, `Avatar`
- `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`
- `Form`, `Field`, `FieldError`
- `Card`, `Separator`, `ScrollArea`
- `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `DropdownMenu`, `Command`
- `Tabs`, `Breadcrumb`, `Tooltip`
- `Table`, `Pagination`
- `Skeleton`, `Progress`, `EmptyState`, `ErrorState`
- `Calendar`, `DateRangePicker`

Nguồn tốt nhất hiện tại: `pharmacy-admin/src/components/ui` vì có thêm table,
calendar và chart phù hợp cho các app quản trị. Có thể đồng bộ với bản tương tự
trong `pharmacy-store`.

### Composite components

- `ConfirmDialog`: xác nhận xóa, đổi trạng thái, logout
- `ImageUploadArea` + `ImageCropDialog`: upload, preview, crop và validate ảnh
- `PhoneInput`: input số điện thoại có format
- `SearchableInfiniteSelect`: select có search và infinite loading
- `Stepper` + `MultiStepLoader`: flow nhiều bước
- `DataTable`: columns, sorting, filtering, faceted filter, row actions, toolbar,
  pagination và view options
- `PageHeader`, `StatsCards`, `DetailToolbar`, `FilterBar`
- `LoadingState`, `EmptyState`, `ErrorState` cho một quy ước trạng thái thống nhất

Nguồn tham khảo: `pharmacy-admin/src/components/custom`,
`pharmacy-admin/src/components/table` và các component tương ứng trong
`pharmacy-store/src/components/pages`.

## 3. Kiến trúc thư mục nên dùng cho project mới

```text
src/
  app/
    providers/
    router/
    routes.ts
  components/
    ui/                 # primitive, không chứa nghiệp vụ
    shared/             # composite dùng ở nhiều feature
    layouts/
  features/
    <feature-name>/
      api/
      components/
      hooks/
      schemas/
      types.ts
      routes.tsx
  lib/
    api-client.ts
    query-client.ts
    utils.ts
    formatters.ts
  state/
  styles/
  pages/
```

Quy tắc quan trọng: `components/ui` không import API hoặc model nghiệp vụ;
feature-specific code nằm trong `features/<feature-name>`; page chỉ phối hợp
layout và feature component.

## 4. Logic nền tảng nên kế thừa

### API và authentication

Kế thừa từ `src/services/api.ts`:

- Axios instance theo từng backend hoặc domain.
- Tự động gắn access token và locale.
- 401 đưa người dùng về login.
- Chuẩn hóa `camelCase` ở frontend và `snake_case` ở backend.
- Generic helpers cho `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

Nên cải thiện khi tách dùng chung: đưa `onUnauthorized`, token storage và
transformer vào options thay vì hard-code route/config của pharmacy.

### Data table

`pharmacy-admin/src/hooks/use-table.tsx` là phần có giá trị cao nhất cho app
quản trị: search, filter, page size và current page được đồng bộ với URL; query
được cache bằng TanStack Query; data cũ vẫn hiển thị khi chuyển trang.

Khi tái sử dụng, đổi `queryKey` và `dataFetcher` thành generic options, đồng thời
cho phép cấu hình tên query param (`s`, `page`, `limit`) theo backend.

### Form workflow

Mẫu nên giữ:

- schema Zod tách khỏi JSX;
- React Hook Form quản lý state;
- dialog chỉ chịu trách nhiệm mở/đóng và submit;
- API mutation nằm trong hook/service;
- invalidate query sau mutation;
- toast thành công/lỗi ở một nơi thống nhất.

### State

Jotai phù hợp cho state nhỏ, độc lập như auth, cart và dialog. Không đưa toàn bộ
server state vào atom; dữ liệu từ API nên để TanStack Query quản lý.

## 5. Phần nên giữ lại theo dạng feature, không copy mù quáng

- `components/pages/store`: product card, category filter, checkout, invoice,
  order timeline và consultation flow.
- `components/table/<domain>`: columns, row actions và filter theo medicine,
  order, invoice, account.
- `components/dialogs/<domain>`: dialog CRUD theo từng domain.
- `data/interfaces`, `data/dto`, `data/enums`: chỉ mang sang những type không
  gắn với medicine/order/invoice.
- Branding, hero, animated backgrounds và nội dung marketing: chỉ dùng khi
  project mới có cùng nhu cầu UX.

## 6. Các điểm nên chỉnh trước khi biến thành template

1. Đổi tên package `pharmacy-store` trong `pharmacy-admin/package.json` thành
   tên đúng của app, hoặc tên package generic.
2. Chuẩn hóa typo thư mục `components/dialogs/invocie` thành `invoice` và
   `components/table/suppiler` thành `supplier`.
3. Tách config backend, route login, site name và currency khỏi shared package.
4. Chuẩn hóa một thư viện query: hiện package có cả `@tanstack/react-query` và
   `react-query`; nên giữ TanStack Query v5.
5. Tách component UI khỏi component nghiệp vụ để tránh import ngược.
6. Thêm Error Boundary, 404/403/500 page và một quy ước `loading/empty/error`
   dùng chung.
7. Thêm test cho API transformer, protected route, `useTable` và các form nguy
   hiểm như delete/change status.
8. Tạo Storybook hoặc trang catalog nội bộ cho `components/ui` để project mới
   có thể xem và dùng component mà không phải đọc từng file.

## 7. Thứ tự lấy sang project mới

1. `components/ui`, `lib/utils`, global styles và Tailwind tokens.
2. Providers: theme, router, query client và auth.
3. API client + error handling + token storage.
4. Shared components: dialog, upload, stepper, state views.
5. Table framework và `useTable` nếu project có dashboard.
6. Layouts và navigation phù hợp với loại app.
7. Từng feature domain sau khi đã đổi model, API và wording.

## Kết luận

Nếu cần một “starter kit” thực sự dùng cho nhiều dự án, lõi nên là:

`ui primitives + design tokens + providers + API client + auth + query hooks +
form system + dialog/upload + data table + state views + layouts`.

`medicine`, `order`, `invoice`, `cart` và `consultation` là các feature mẫu tốt để
học cách tổ chức, nhưng không nên coi là phần core dùng chung.
