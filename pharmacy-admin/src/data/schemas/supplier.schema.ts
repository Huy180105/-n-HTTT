import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, { message: "Tên nhà cung cấp là bắt buộc" }),
  address: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
  contactPhone: z.string()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(/^0[0-9]{9}$/, { message: "Số điện thoại phải có đúng 10 chữ số (bắt đầu bằng số 0)" }),
  contactEmail: z.string().email({ message: "Email không hợp lệ" }),
  isEdit: z.boolean().optional(),
})

export type SupplierSchema = z.infer<typeof supplierSchema>;