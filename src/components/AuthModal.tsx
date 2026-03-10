import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Camera } from "lucide-react";
import AvatarCropModal from "@/components/AvatarCropModal";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode: "login" | "signup";
}

const AuthModal = ({ open, onOpenChange, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup" | "role-select">(
    initialMode === "signup" ? "role-select" : "login"
  );

  // Sync mode when dialog opens with a new initialMode
  React.useEffect(() => {
    if (open) {
      setMode(initialMode === "signup" ? "role-select" : "login");
    }
  }, [open, initialMode]);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarCropOpen, setAvatarCropOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    optionalSubject: "",
    mainsAttempts: "",
    interviewAppearances: "",
    bio: "",
  });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const resetState = () => {
    setMode(initialMode === "signup" ? "role-select" : "login");
    setSelectedRole(null);
    setStep(1);
    setAvatarUrl(null);
    setFormData({ name: "", email: "", password: "", optionalSubject: "", mainsAttempts: "", interviewAppearances: "", bio: "" });
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  const handleLogin = () => {
    login(formData.email, formData.password, selectedRole || "aspirant");
    handleOpenChange(false);
    navigate(selectedRole === "mentor" ? "/mentor-dashboard" : "/aspirant-dashboard");
  };

  const handleSignup = () => {
    signup({ name: formData.name, email: formData.email, role: selectedRole!, photo: avatarUrl || undefined });
    handleOpenChange(false);
    navigate(selectedRole === "mentor" ? "/mentor-dashboard" : "/aspirant-dashboard");
  };

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <>
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Role Selection */}
        {mode === "role-select" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Join UPSCMentor</DialogTitle>
              <DialogDescription className="text-center text-sm">Choose how you want to use the platform</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <button
                onClick={() => { setSelectedRole("aspirant"); setMode("signup"); }}
                className="flex flex-col items-center gap-3 rounded-lg border-2 border-border p-6 transition-all hover:border-gold hover:shadow-card"
              >
                <Users className="h-10 w-10 text-navy" />
                <span className="font-semibold text-foreground">I'm an Aspirant</span>
                <span className="text-xs text-muted-foreground text-center">Find mentors for UPSC prep</span>
              </button>
              <button
                onClick={() => { setSelectedRole("mentor"); setMode("signup"); }}
                className="flex flex-col items-center gap-3 rounded-lg border-2 border-border p-6 transition-all hover:border-gold hover:shadow-card"
              >
                <GraduationCap className="h-10 w-10 text-navy" />
                <span className="font-semibold text-foreground">I'm a Mentor</span>
                <span className="text-xs text-muted-foreground text-center">Guide UPSC aspirants</span>
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button className="text-navy font-medium hover:underline" onClick={() => setMode("login")}>
                Sign In
              </button>
            </p>
          </>
        )}

        {/* Login */}
        {mode === "login" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Welcome Back</DialogTitle>
              <DialogDescription className="text-center text-sm">Sign in to your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Button
                  variant={selectedRole === "aspirant" ? "default" : "outline"}
                  className={`flex-1 ${selectedRole === "aspirant" ? "bg-gradient-navy text-primary-foreground" : ""}`}
                  size="sm"
                  onClick={() => setSelectedRole("aspirant")}
                >
                  Aspirant
                </Button>
                <Button
                  variant={selectedRole === "mentor" ? "default" : "outline"}
                  className={`flex-1 ${selectedRole === "mentor" ? "bg-gradient-navy text-primary-foreground" : ""}`}
                  size="sm"
                  onClick={() => setSelectedRole("mentor")}
                >
                  Mentor
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="you@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
              </div>
              <Button className="w-full bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleLogin}>
                Sign In
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button className="text-navy font-medium hover:underline" onClick={() => setMode("role-select")}>
                  Sign Up
                </button>
              </p>
            </div>
          </>
        )}

        {/* Signup - Aspirant */}
        {mode === "signup" && selectedRole === "aspirant" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Create Aspirant Account</DialogTitle>
              <DialogDescription className="text-center text-sm">Start your UPSC preparation journey</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Your name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="you@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
              </div>
              <Button className="w-full bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleSignup}>
                Create Account
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <button className="text-navy font-medium hover:underline" onClick={() => setMode("login")}>
                  Sign In
                </button>
              </p>
            </div>
          </>
        )}

        {/* Signup - Mentor (Multi-step) */}
        {mode === "signup" && selectedRole === "mentor" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Mentor Registration {step === 1 ? "(1/2)" : "(2/2)"}
              </DialogTitle>
              <DialogDescription className="text-center text-sm">
                {step === 1 ? "Enter your basic details" : "Complete your mentor profile"}
              </DialogDescription>
            </DialogHeader>
            {step === 1 ? (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="you@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Optional Subject</Label>
                  <Input placeholder="e.g. Public Administration" value={formData.optionalSubject} onChange={(e) => updateField("optionalSubject", e.target.value)} />
                </div>
                <Button className="w-full bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={() => setStep(2)}>
                  Next →
                </Button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Mains Attempts *</Label>
                    <Input type="number" min="0" placeholder="e.g. 3" value={formData.mainsAttempts} onChange={(e) => updateField("mainsAttempts", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Interview Appearances *</Label>
                    <Input type="number" min="0" placeholder="e.g. 2" value={formData.interviewAppearances} onChange={(e) => updateField("interviewAppearances", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Brief Bio</Label>
                  <Textarea placeholder="Tell aspirants about your UPSC journey..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="h-14 w-14 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border">
                        <Camera className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <Button type="button" variant="outline" size="sm" onClick={() => setAvatarCropOpen(true)}>
                      {avatarUrl ? "Change Photo" : "Upload & Crop"}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Verification Document</Label>
                  <Input type="file" accept=".pdf,.jpg,.png" />
                  <p className="text-xs text-muted-foreground">Upload marksheet or hall ticket for verification</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    ← Back
                  </Button>
                  <Button className="flex-1 bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleSignup}>
                    Register
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
    <AvatarCropModal open={avatarCropOpen} onOpenChange={setAvatarCropOpen} onCropComplete={setAvatarUrl} />
    </>
  );
};

export default AuthModal;
