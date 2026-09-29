export type ScreenName =
  | 'dashboard'
  | 'entry'
  | 'capture'
  | 'results'
  | 'profile'
  | 'login'
  | 'register'
  | 'verify'
  | 'history'
  | 'sync';

export interface UserProfile {
  name: string;
  email: string;
  inspectorId: string;
  terminal: string;
  role: string;
  avatarUrl?: string;
  active: boolean;
}

export type ContainerSize = "20'" | "40'" | "40' HC" | "45' HC";

export interface QueueItem {
  id: string;
  code: string;
  status: 'draft' | 'validation_required' | 'synced';
  capturedTime: string;
  location: string;
  dataWeight: string;
  imageUrl: string;
  warningNote?: string;
  sealId?: string;
  size: ContainerSize;
}

export interface DefectItem {
  id: string;
  title: string;
  location: string;
  depth?: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  type: 'dent' | 'corrosion' | 'seal' | 'hole' | 'scratch';
  x: number; // percentage in image
  y: number;
  width: number;
  height: number;
}

export interface InspectionStep {
  id: number;
  name: string;
  label: string;
  completed: boolean;
  photoUrl?: string;
  timestamp?: string;
}

export interface InspectionReport {
  id: string;
  containerCode: string;
  isoType: ContainerSize;
  inspectorName: string;
  inspectorId: string;
  terminal: string;
  timestamp: string;
  status: 'Damaged' | 'Passed' | 'Pending Repair';
  confidenceScore: number;
  defects: DefectItem[];
  imageUrl: string;
  notes: string;
}
