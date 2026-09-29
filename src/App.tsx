import React, { useState } from 'react';
import {
  ContainerSize,
  InspectionReport,
  InspectionStep,
  QueueItem,
  ScreenName,
  UserProfile,
} from './types';
import {
  INITIAL_CREDITS,
  INITIAL_DEFECTS,
  INITIAL_QUEUE,
  INITIAL_REPORTS,
  INITIAL_STEPS,
  IMAGES,
} from './mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/Screens/DashboardScreen';
import { EntryScreen } from './components/Screens/EntryScreen';
import { CaptureScreen } from './components/Screens/CaptureScreen';
import { ResultsScreen } from './components/Screens/ResultsScreen';
import { ProfileScreen } from './components/Screens/ProfileScreen';
import { LoginScreen } from './components/Screens/LoginScreen';
import { RegisterScreen } from './components/Screens/RegisterScreen';
import { VerifyScreen } from './components/Screens/VerifyScreen';
import { HistoryScreen } from './components/Screens/HistoryScreen';
import { SyncScreen } from './components/Screens/SyncScreen';
import { PdfReportModal } from './components/Modals/PdfReportModal';
import { PurchaseCreditsModal } from './components/Modals/PurchaseCreditsModal';
import { ProcessedImageModal } from './components/Modals/ProcessedImageModal';
import { OcrScannerModal } from './components/Modals/OcrScannerModal';
import { ResolveSealModal } from './components/Modals/ResolveSealModal';
import { OtpEmailToast } from './components/OtpEmailToast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('dashboard');
  const [activeContainerCode, setActiveContainerCode] = useState<string>('CNTR-992-X');
  const [activeSize, setActiveSize] = useState<ContainerSize>("40' HC");
  const [steps, setSteps] = useState<InspectionStep[]>(INITIAL_STEPS);
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [reports, setReports] = useState<InspectionReport[]>(INITIAL_REPORTS);
  const [activeReport, setActiveReport] = useState<InspectionReport>(INITIAL_REPORTS[0]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Authenticated User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'John Doe',
    email: 'inspector@northport.logistics',
    inspectorId: '8821',
    terminal: 'Port of Long Beach, CA',
    role: 'Certified Cargo Inspector',
    avatarUrl: IMAGES.avatar,
    active: true,
  });

  // Staged registration info awaiting OTP confirmation
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);

  // OTP Authentication state
  const [activeOtp, setActiveOtp] = useState<string>('849201');
  const [otpTargetEmail, setOtpTargetEmail] = useState<string>('inspector@northport.logistics');
  const [otpToast, setOtpToast] = useState<{
    email: string;
    otp: string;
    type: 'login' | 'registration' | 'resend';
  } | null>(null);

  // Active Modals
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [showImageViewerModal, setShowImageViewerModal] = useState<boolean>(false);
  const [showOcrModal, setShowOcrModal] = useState<boolean>(false);
  const [resolvingItem, setResolvingItem] = useState<QueueItem | null>(null);

  // Navigation Handler
  const handleNavigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
  const handleLoginSubmit = (email: string, otp: string) => {
    setOtpTargetEmail(email);
    setActiveOtp(otp);
    setPendingUser(null);
    setOtpToast({ email, otp, type: 'login' });
    handleNavigate('verify');
  };

  const handleRegisterSubmit = (profile: UserProfile, otp: string) => {
    setPendingUser(profile);
    setOtpTargetEmail(profile.email);
    setActiveOtp(otp);
    setOtpToast({ email: profile.email, otp, type: 'registration' });
    handleNavigate('verify');
  };

  const handleVerifySuccess = () => {
    if (pendingUser) {
      setUser(pendingUser);
      setPendingUser(null);
    } else {
      // Login with current email
      setUser((prev) => ({
        ...prev,
        email: otpTargetEmail,
      }));
    }
    setOtpToast(null);
    handleNavigate('dashboard');
  };

  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(newOtp);
    setOtpToast({ email: otpTargetEmail, otp: newOtp, type: 'resend' });
  };

  const handleLogOut = () => {
    handleNavigate('login');
  };

  // Session & Inspection Handlers
  const handleInitializeSession = (code: string, size: ContainerSize) => {
    setActiveContainerCode(code);
    setActiveSize(size);
    // Reset steps for new session
    const resetSteps: InspectionStep[] = [
      { id: 1, name: 'front', label: 'Front', completed: true, timestamp: '14:31:02' },
      { id: 2, name: 'back', label: 'Back', completed: true, timestamp: '14:32:15' },
      { id: 3, name: 'right', label: 'Right Side', completed: false },
      { id: 4, name: 'left', label: 'Left Side', completed: false },
      { id: 5, name: 'roof', label: 'Roof', completed: false },
      { id: 6, name: 'floor', label: 'Floor', completed: false },
      { id: 7, name: 'doors', label: 'Doors', completed: false },
    ];
    setSteps(resetSteps);
    handleNavigate('capture');
  };

  const handleCompleteStep = (stepId: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: true, timestamp: new Date().toLocaleTimeString() } : s))
    );
  };

  const handleStartAnalysis = () => {
    // Generate fresh report for the container
    const newReport: InspectionReport = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}-${activeContainerCode.slice(-1) || 'X'}`,
      containerCode: activeContainerCode,
      isoType: activeSize,
      inspectorName: user.name,
      inspectorId: user.inspectorId,
      terminal: user.terminal,
      timestamp: new Date().toLocaleString(),
      status: 'Damaged',
      confidenceScore: 98.4,
      defects: INITIAL_DEFECTS,
      imageUrl: IMAGES.corrosionDent,
      notes: 'Structural integrity compromised. Immediate repair requisition recommended prior to ocean staging.',
    };

    setActiveReport(newReport);
    setReports((prev) => [newReport, ...prev]);

    // Deduct 1 credit from corresponding size
    const sizeKey = activeSize === "20'" ? '20_std' : activeSize === "40'" ? '40_std' : activeSize === "40' HC" ? '40_hc' : '45_hc';
    setCredits((prev) => {
      const target = prev[sizeKey as keyof typeof prev];
      if (!target) return prev;
      return {
        ...prev,
        [sizeKey]: {
          ...target,
          remaining: Math.max(0, target.remaining - 1),
        },
      };
    });

    handleNavigate('results');
  };

  const handleSyncItem = (id: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      setQueue((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: 'synced' } : q))
      );
      setIsSyncing(false);
    }, 700);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setQueue((prev) =>
        prev.map((q) => (q.status === 'draft' ? { ...q, status: 'synced' } : q))
      );
      setIsSyncing(false);
    }, 1200);
  };

  const handleResolveWarning = (id: string, sealId: string) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: 'draft',
              sealId,
              warningNote: undefined,
            }
          : q
      )
    );
  };

  const handleAddCredits = (sizeKey: string, amount: number) => {
    setCredits((prev) => {
      const curr = prev[sizeKey as keyof typeof prev];
      if (!curr) return prev;
      return {
        ...prev,
        [sizeKey]: {
          ...curr,
          remaining: curr.remaining + amount,
          total: curr.total + amount,
        },
      };
    });
  };

  const pendingSyncCount = queue.filter((q) => q.status !== 'synced').length;

  return (
    <div className="min-h-screen bg-[#f9f9fe] text-[#1a1c1f] flex flex-col font-['Inter'] selection:bg-purple-200">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        syncCount={pendingSyncCount}
        onQuickSync={handleSyncAll}
        isSyncing={isSyncing}
      />

      {/* Real-time Email Dispatch Notification Toast */}
      {otpToast && (
        <OtpEmailToast
          email={otpToast.email}
          otp={otpToast.otp}
          type={otpToast.type}
          onClose={() => setOtpToast(null)}
          onAutoFill={() => {
            // Trigger auto-fill if on verify screen
          }}
        />
      )}

      {/* Main Screen Viewport */}
      <div className="flex-1 flex flex-col">
        {currentScreen === 'dashboard' && (
          <DashboardScreen
            queue={queue}
            onNavigate={handleNavigate}
            onSyncItem={handleSyncItem}
            onResolveItem={(item) => setResolvingItem(item)}
            reportsCount={reports.length + 39} // base of 42 reports
          />
        )}

        {currentScreen === 'entry' && (
          <EntryScreen
            onNavigate={handleNavigate}
            onInitializeSession={handleInitializeSession}
            onOpenOcr={() => setShowOcrModal(true)}
            activeContainerCode={activeContainerCode}
            setActiveContainerCode={setActiveContainerCode}
          />
        )}

        {currentScreen === 'capture' && (
          <CaptureScreen
            inspectionId={activeContainerCode}
            steps={steps}
            onCompleteStep={handleCompleteStep}
            onNavigate={handleNavigate}
            onStartAnalysis={handleStartAnalysis}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen
            report={activeReport}
            onNavigate={handleNavigate}
            onOpenPdfReport={() => setShowPdfModal(true)}
            onOpenImageViewer={() => setShowImageViewerModal(true)}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={user}
            credits={credits}
            onOpenPurchaseModal={() => setShowPurchaseModal(true)}
            onNavigate={handleNavigate}
            onLogOut={handleLogOut}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSubmit={handleLoginSubmit}
            onNavigate={handleNavigate}
            initialEmail={user.email}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            onRegisterSubmit={handleRegisterSubmit}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'verify' && (
          <VerifyScreen
            targetEmail={otpTargetEmail}
            expectedOtp={activeOtp}
            onVerifySuccess={handleVerifySuccess}
            onResendOtp={handleResendOtp}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen
            reports={reports}
            onSelectReport={(rep) => {
              setActiveReport(rep);
              setShowPdfModal(true);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'sync' && (
          <SyncScreen
            queue={queue}
            onSyncAll={handleSyncAll}
            onSyncItem={handleSyncItem}
            onNavigate={handleNavigate}
            isSyncing={isSyncing}
          />
        )}
      </div>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Interactive Modals */}
      {showPdfModal && (
        <PdfReportModal
          report={activeReport}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {showPurchaseModal && (
        <PurchaseCreditsModal
          onClose={() => setShowPurchaseModal(false)}
          onAddCredits={handleAddCredits}
        />
      )}

      {showImageViewerModal && (
        <ProcessedImageModal
          imageUrl={activeReport.imageUrl}
          defects={activeReport.defects}
          onClose={() => setShowImageViewerModal(false)}
        />
      )}

      {showOcrModal && (
        <OcrScannerModal
          onScanComplete={(code) => setActiveContainerCode(code)}
          onClose={() => setShowOcrModal(false)}
        />
      )}

      {resolvingItem && (
        <ResolveSealModal
          item={resolvingItem}
          onResolve={handleResolveWarning}
          onClose={() => setResolvingItem(null)}
        />
      )}
    </div>
  );
}
