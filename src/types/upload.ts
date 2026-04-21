export interface UploadFileItem {
  id: number;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
  uploadedBy?: string;
}
