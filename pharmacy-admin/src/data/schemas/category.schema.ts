import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Tên danh mục là bắt buộc" })
    .min(3, { message: "Tên danh mục phải có ít nhất 3 ký tự" })
    .refine((val) => !/^\d+$/.test(val.trim()), {
      message: "Tên danh mục không được chỉ chứa chữ số",
    }),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  isEdit: z.boolean().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
