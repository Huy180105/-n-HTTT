import { useCallback, useEffect, useRef } from "react"
import { UploadIcon } from "lucide-react"
import { toast } from "sonner"

import { useFileUpload, useUpload, useImageCrop } from "@/hooks"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ImageUploadArea } from "@/components/custom/image-upload-area"
import { ImageCropDialog } from "@/components/custom/image-crop-dialog"
import { siteConfig } from "@/config"

interface MedicineUploadImageProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicineId: string
  onUploadSuccess?: () => void
}

export function MedicineUploadImage({ 
  open, 
  onOpenChange, 
  medicineId,
  onUploadSuccess 
}: MedicineUploadImageProps) {
  // File upload hook
  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
  })

  // Image crop hook
  const {
    zoom,
    isCropDialogOpen,
    finalImageUrl,
    handleCropChange,
    setZoom,
    openCropDialog,
    closeCropDialog,
    applyCrop,
    removeFinalImage,
    reset: resetCrop,
  } = useImageCrop()

  // Upload hook
  const { isUploading, upload, reset: resetUpload } = useUpload()

  const previewUrl = files[0]?.preview || null
  const fileId = files[0]?.id

  // Ref to track the previous file ID to detect new uploads
  const previousFileIdRef = useRef<string | undefined | null>(null)

  // Handle crop application
  const handleApplyCrop = useCallback(async () => {
    if (!previewUrl) {
      toast.error("Không có ảnh để cắt")
      return
    }

    try {
      await applyCrop(previewUrl)
      toast.success("Cắt ảnh thành công!")
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý ảnh: " + (error as Error).message)
    }
  }, [previewUrl, applyCrop])

  // Handle image removal
  const handleRemoveFinalImage = useCallback(() => {
    removeFinalImage()
    if (fileId) {
      removeFile(fileId)
    }
  }, [removeFinalImage, fileId, removeFile])

  // Handle upload
  const handleUpload = useCallback(async () => {
    if (!finalImageUrl || !fileId) {
      toast.error("Vui lòng chọn và crop ảnh trước khi upload")
      return
    }

    try {
      // Convert blob URL back to blob
      const response = await fetch(finalImageUrl)
      const blob = await response.blob()

      const baseUrl = siteConfig.backend.base_api_url
      const uploadUrl = `${baseUrl}/v1/admin/medicines/${medicineId}/upload-image`

      await upload(blob, {
        url: uploadUrl,
        fieldName: 'thumbnail',
        fileName: 'medicine-thumbnail.jpg',
        invalidateQueries: [
          ["medicines"],
          ["medicines-stats"],
          ["medicine", medicineId]
        ],
        onSuccess: () => {
          toast.success("Upload ảnh thành công!")
          handleRemoveFinalImage()
          resetCrop()
          onOpenChange(false)
          onUploadSuccess?.()
        },
        onError: (error) => {
          toast.error(error.message || "Có lỗi xảy ra khi upload ảnh")
        }
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Có lỗi xảy ra khi upload ảnh")
    }
  }, [
    finalImageUrl, 
    fileId, 
    medicineId, 
    upload, 
    handleRemoveFinalImage, 
    resetCrop,
    onOpenChange,
    onUploadSuccess
  ])

  // Handle cancel
  const handleCancel = useCallback(() => {
    handleRemoveFinalImage()
    resetCrop()
    resetUpload()
    onOpenChange(false)
  }, [handleRemoveFinalImage, resetCrop, resetUpload, onOpenChange])

  // Effect to open crop dialog when a new file is ready
  useEffect(() => {
    if (fileId && fileId !== previousFileIdRef.current) {
      openCropDialog()
    }
    previousFileIdRef.current = fileId
  }, [fileId, openCropDialog])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Upload ảnh thuốc
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Chọn ảnh để upload làm hình đại diện cho thuốc
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <ImageUploadArea
              finalImageUrl={finalImageUrl}
              isDragging={isDragging}
              onOpenFileDialog={openFileDialog}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onRemoveImage={handleRemoveFinalImage}
              getInputProps={getInputProps}
              uploadText="Chọn hoặc kéo thả ảnh"
              uploadSubText="Nhấp để duyệt file"
              supportText="Hỗ trợ: JPEG, PNG, JPG • Tối đa 5MB"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isUploading}
              className="border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!finalImageUrl || isUploading}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Đang upload...
                </>
              ) : (
                <>
                  <UploadIcon className="size-4 mr-2" />
                  Upload ảnh
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cropper Dialog */}
      <ImageCropDialog
        open={isCropDialogOpen}
        onOpenChange={closeCropDialog}
        imageUrl={previewUrl}
        zoom={zoom}
        onZoomChange={setZoom}
        onCropChange={handleCropChange}
        onApplyCrop={handleApplyCrop}
        title="Cắt và chỉnh sửa ảnh"
        description="Di chuyển và zoom để có được khu vực ảnh mong muốn"
        applyButtonText="Áp dụng"
      />
    </>
  )
}