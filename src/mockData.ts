import { QueueItem, DefectItem, InspectionStep, InspectionReport } from './types';

// Images directly extracted from the user's provided HTML mockups
export const IMAGES = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtAXJEKQzHza9Tg6dXuIT_pElNHxAv79zL9qf6vIaeiSvjqreQ-QfU0D2g87ael6Cb6zBhltIiAwtwLv8KU7jQtGuMNRxEqdBGSWnwZqQqtEzFWu3ToVHNf-2PBJqJlDPv0hVQmBqUGvLRw-JegY-XlwJu6a0KtidwwXEeg5KpTr-7rMV_hYJwp7QFUpJgvCTTZL49_w4xaWimSz2KYWXjz32HgOvAB7S98QitDC3ZD-pBfiAhvki5V13ZidyazygBi_ZJ4TZBsfIT',
  corrosionDent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlSuKLQ6mTFtctD_-bm-cIvvxaOQuj6N1YkB_4Dqj0BAVu7XARtTC2m-jwDB4P86mV9ahg-j6KXCD2KZwpTNpClXkg3_SjYXkh-A0JWZUaXQ1XCyjpzzFEJD7RogZgpMndDPV9G4Ii0A_vMXsvYvz3iEF0q7HX_q_kiRlBhTC8gXG0qXZoHsHs4gpgzV9mN1qnwGkyxDEofIPQWVLoIL84FaTS9QANS_UIfAEhxs-fP8NmXdIebaVR3tzVeZrnetPHOK37w3GQo8JW',
  securityBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHoHKlQuwsKbZA70lzBvepDLhmPCHIpMzBalkMu8x3k2MAEv8yQ3NnUCl3dD8MZzicFUDH7U4izSXQcCNBmvMRRGsiZ-RPNVVsBymIX1jGfQ-L5bd9FlS1wiVegoRX6BCehPpb6XS-Rc5ETm1oS_fmv9K7xsDYxtABPs9LqiU8Q-rJOTdQdjcvf3uw-vG9jlrO-A9gZQn_I305kdBW0_q2jpnTgm3ke54FgMeXm6c0x9oL090adOPYuRKw719AzPEiqXdN_-h-S8NC',
  containerExterior: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQt9ZEi9kdEW6a7lrhtGnOkcKlusOhH1BgBciwOdDndUZtfWfkoNKOfdBiDsMPhpXCC68p_i1uZnjkOQxmf2WsbF163H4oIg1Q2bvrERK0e4o4GcxgJlI9MMq8Lj3KYJNORRTITXefzu8EmOF7FB50hYwMCyR2MbCezfF7p8LXcKKQl7yk0ZfYv1ukKxNezzkpKsxc92n_Iel77sFp5O20nZ-YK5ik0BUgM-dygXBNupyqpp1yLB0gpeuX3o07yH-KPskQ9flspL5',
  lockSeal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHq_Dk0oidSAtUwQQLG2I4LBd9ZW5IQGxdFFGX6q33kyDYvAgh07s70zQVTc2cvCNHKiMUdk3IQjskiHa1SKGbrjVS2quKhgoPa1JndHP0buV4uKlyHT93Oas8IdPOuiMRvhSRihubOYCczRz0vrAhmh3lU-bN9xrucWXD_9hq7rv-Z8-Hdghj8G2DhS6Xg6gnMxeo_Rr7-g-CY2JBpOp0PoUOEjvffCXKZHRJig9evk_ZPWz1WNdGc_Gv8Wa8U08S_mSAIwk_C43q',
  cameraPortView: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAKwzQGJHG41G0HGBtqCFtLr03e8m-L7fyyM7cxA4WvGT5WlU2sZyFWIku4BzKxPnl0nJ_avnMbWg6hbHK9o0o_v2qlWWNW9QD3rq2kZJEvLPWs3Up_1zKoNnA5zEKw9sFH604gWhyljtEG89n60BYUFTs5CXjKnGC2lyF49nAgFtI8sCympuVM5yFxPTUso9h156U5HF7LHio9JMwMd7QVl3EX8R5FOrDjAMVfpo-7YyuOJCVjFHe-Yu2-6wHpA1koxQNOAzdkM4p',
  calibrationYard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR2Qad_i0tbjicj5uaJaX6aec9hSNRvnUVyHFyj6QwBmqC0IujtQSbPTJ20xf6ezn6T8DHO6qKmYTYLAPAUGYdu2YCP7YjXGCSlBPmHy2jV0zqAYtyhQrnm4E2DafHGdVEjl5bf5iRDUdtO8Wbha3AVMgWjwLpzrsfYTo5stVfFQcXj1aUoHrxEynUvRgPI-EtyRP0qglxwqBaK4vPyN8mZERTHB35UWvnKAieifta4IUhOOMkKAA2iq9_xKa1QjO84_sU836ezCdY',
};

export const INITIAL_QUEUE: QueueItem[] = [
  {
    id: 'queue-1',
    code: 'CONT-8829-X',
    status: 'draft',
    capturedTime: '14:22',
    location: 'Warehouse A',
    dataWeight: '12.4 MB',
    imageUrl: IMAGES.containerExterior,
    size: "20'",
  },
  {
    id: 'queue-2',
    code: 'CONT-4412-B',
    status: 'draft',
    capturedTime: '15:05',
    location: 'Loading Dock 4',
    dataWeight: '8.1 MB',
    imageUrl: IMAGES.lockSeal,
    size: "40'",
  },
  {
    id: 'queue-3',
    code: 'CONT-1002-K',
    status: 'validation_required',
    capturedTime: '15:40',
    location: 'Gate 2 Inbound',
    dataWeight: '14.9 MB',
    imageUrl: IMAGES.corrosionDent,
    warningNote: 'Missing Seal ID verification',
    size: "40' HC",
  },
];

export const INITIAL_DEFECTS: DefectItem[] = [
  {
    id: 'def-1',
    title: 'Structural Dent (Rear Left)',
    location: 'Rear Left Corner Flange',
    depth: '4.2cm',
    severity: 'High',
    description: 'Deep mechanical impact deformation exceeding ISO 1496-1 tolerance limits.',
    type: 'dent',
    x: 42,
    y: 35,
    width: 32,
    height: 28,
  },
  {
    id: 'def-2',
    title: 'Surface Corrosion',
    location: 'Roof Perimeter Seal',
    depth: '0.8mm',
    severity: 'Medium',
    description: 'Minor oxidation and coating blistering along roof seals.',
    type: 'corrosion',
    x: 25,
    y: 12,
    width: 50,
    height: 18,
  },
];

export const INITIAL_STEPS: InspectionStep[] = [
  { id: 1, name: 'front', label: 'Front', completed: true, timestamp: '14:31:02' },
  { id: 2, name: 'back', label: 'Back', completed: true, timestamp: '14:32:15' },
  { id: 3, name: 'right', label: 'Right Side', completed: false },
  { id: 4, name: 'left', label: 'Left Side', completed: false },
  { id: 5, name: 'roof', label: 'Roof', completed: false },
  { id: 6, name: 'floor', label: 'Floor', completed: false },
  { id: 7, name: 'doors', label: 'Doors', completed: false },
];

export const INITIAL_CREDITS = {
  '20_std': { remaining: 45, total: 60, label: "20' STD", icon: 'inventory_2', color: '#6750a4' },
  '40_std': { remaining: 12, total: 40, label: "40' STD", icon: 'conveyor_belt', color: '#006d44' },
  '40_hc': { remaining: 8, total: 50, label: "40' HC", icon: 'box_add', color: '#dc2626' },
  '45_hc': { remaining: 3, total: 40, label: "45' HC", icon: 'pallet', color: '#dc2626' },
};

export const INITIAL_REPORTS: InspectionReport[] = [
  {
    id: 'REP-992-X',
    containerCode: 'CNTR-992-X',
    isoType: "40' HC",
    inspectorName: 'John Doe',
    inspectorId: '8821',
    terminal: 'Port of Long Beach, CA',
    timestamp: '2026-09-28 14:35:10',
    status: 'Damaged',
    confidenceScore: 98.4,
    defects: INITIAL_DEFECTS,
    imageUrl: IMAGES.corrosionDent,
    notes: 'Structural integrity compromised. Immediate repair requisition recommended prior to ocean staging.',
  },
  {
    id: 'REP-881-A',
    containerCode: 'MSKU-7719-2',
    isoType: "20'",
    inspectorName: 'John Doe',
    inspectorId: '8821',
    terminal: 'Port of Long Beach, CA',
    timestamp: '2026-09-28 11:20:04',
    status: 'Passed',
    confidenceScore: 99.2,
    defects: [],
    imageUrl: IMAGES.containerExterior,
    notes: 'Container verified in pristine operating condition. CSC safety plate verified.',
  },
  {
    id: 'REP-740-K',
    containerCode: 'CMAU-4401-9',
    isoType: "40'",
    inspectorName: 'John Doe',
    inspectorId: '8821',
    terminal: 'Port of Oakland, CA',
    timestamp: '2026-09-27 16:45:22',
    status: 'Passed',
    confidenceScore: 97.8,
    defects: [],
    imageUrl: IMAGES.lockSeal,
    notes: 'Bolt seal intact, high-security ISO 17712 compliant.',
  },
];
