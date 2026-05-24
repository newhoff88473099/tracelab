// ─── Enums ──────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'lab_manager' | 'analyst' | 'viewer';

export type SampleStatus =
  | 'received'
  | 'in_analysis'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'archived';

export type AnalysisStatus = 'draft' | 'completed' | 'validated';

export type NotificationChannel = 'whatsapp' | 'email' | 'push';

export type NotificationStatus = 'queued' | 'sent' | 'failed';

export type ReportFormat = 'pdf' | 'xlsx';

export type ImageEntityType = 'sample' | 'product' | 'analysis';

// ─── Core Entities ───────────────────────────────────────────────────────────

export interface Laboratory {
  id: string;
  name: string;
  cnpj?: string;
  address?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  laboratoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  laboratoryId: string;
  name: string;
  document?: string;
  contact?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Product {
  id: string;
  laboratoryId: string;
  name: string;
  sku?: string;
  barcode?: string;
  qrcode?: string;
  category?: string;
  aiTags?: Record<string, unknown>;
  images?: string[];
  createdAt: string;
}

export interface Sample {
  id: string;
  laboratoryId: string;
  clientId: string;
  productId?: string;
  code: string;
  status: SampleStatus;
  receivedAt: string;
  collectedBy?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  // Relations (populated)
  client?: Client;
  product?: Product;
  collectedByUser?: User;
}

export interface Analysis {
  id: string;
  sampleId: string;
  analystId: string;
  type: string;
  result?: Record<string, unknown>;
  status: AnalysisStatus;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}

export interface Image {
  id: string;
  entityType: ImageEntityType;
  entityId: string;
  url: string;
  storageKey: string;
  ocrData?: Record<string, unknown>;
  aiLabels?: Record<string, unknown>;
  uploadedBy: string;
  createdAt: string;
}

export interface Report {
  id: string;
  laboratoryId: string;
  sampleId: string;
  generatedBy: string;
  format: ReportFormat;
  fileUrl: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  laboratoryId: string;
  recipientId: string;
  channel: NotificationChannel;
  template: string;
  payload: Record<string, unknown>;
  status: NotificationStatus;
  sentAt?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

// ─── API Response wrappers ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  laboratoryId: string;
  iat: number;
  exp: number;
}

// ─── AI Service Types ─────────────────────────────────────────────────────────

export interface AiIdentifyResult {
  labels: string[];
  category?: string;
  confidence: number;
  boundingBoxes?: BoundingBox[];
  autoSuggested: boolean; // true if confidence > threshold
}

export interface BoundingBox {
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OcrResult {
  rawText: string;
  confidence: number;
  blocks: OcrBlock[];
}

export interface OcrBlock {
  text: string;
  confidence: number;
  boundingBox?: BoundingBox;
}

export interface FaultDetectionResult {
  hasFault: boolean;
  faultType?: string;
  confidence: number;
  regions?: BoundingBox[];
}
