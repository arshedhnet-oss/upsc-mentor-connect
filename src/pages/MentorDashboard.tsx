import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, DollarSign, BookOpen, TrendingUp, Plus, Trash2, Crown, Camera, Loader2 } from "lucide-react";
import { indianLanguages, proficiencyLevels, type MentorLanguage, type SubscriptionPlan } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import AvatarCropModal from "@/components/AvatarCropModal";
import { toast } from "sonner";

const MentorDashboard = () => {
  const { isAuthenticated, role, profile, updateProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarCropOpen, setAvatarCropOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Profile fields
  const [profileName, setProfileName] = useState("");
  const [optionalSubject, setOptionalSubject] = useState("");
  const [mainsAttempts, setMainsAttempts] = useState(0);
  const [interviewAppearances, setInterviewAppearances] = useState(0);
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<MentorLanguage[]>([
    { language: "English", proficiency: "Fluent" },
    { language: "Hindi", proficiency: "Native" },
  ]);

  // Pricing fields
  const [audioPerMinute, setAudioPerMinute] = useState(15);
  const [videoPerMinute, setVideoPerMinute] = useState(25);
  const [audioPerHour, setAudioPerHour] = useState(750);
  const [videoPerHour, setVideoPerHour] = useState(1200);

  // Plans
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  // Load profile data
  useEffect(() => {
    if (profile) {
      setProfileName(profile.name || "");
      setOptionalSubject(profile.optional_subject || "");
      setMainsAttempts(profile.mains_attempts || 0);
      setInterviewAppearances(profile.interview_appearances || 0);
      setBio(profile.bio || "");
      setAudioPerMinute(profile.audio_per_minute || 15);
      setVideoPerMinute(profile.video_per_minute || 25);
      setAudioPerHour(profile.audio_per_hour || 750);
      setVideoPerHour(profile.video_per_hour || 1200);
      if (profile.languages && Array.isArray(profile.languages) && profile.languages.length > 0) {
        setLanguages(profile.languages as MentorLanguage[]);
      }
      if (profile.subscription_plans && Array.isArray(profile.subscription_plans) && profile.subscription_plans.length > 0) {
        setPlans(profile.subscription_plans as SubscriptionPlan[]);
      }
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      name: profileName,
      optional_subject: optionalSubject,
      mains_attempts: mainsAttempts,
      interview_appearances: interviewAppearances,
      bio,
      languages: languages as any,
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  const handleSavePricing = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      audio_per_minute: audioPerMinute,
      video_per_minute: videoPerMinute,
      audio_per_hour: audioPerHour,
      video_per_hour: videoPerHour,
      starting_price: Math.min(audioPerMinute, videoPerMinute),
    } as any);
    setSaving(false);
    if (error) {
      toast.error("Failed to save pricing");
    } else {
      toast.success("Pricing updated!");
    }
  };

  const handleSavePlans = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      subscription_plans: plans as any,
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to save plans");
    } else {
      toast.success("Plans saved!");
    }
  };

  const handleAvatarCrop = async (url: string) => {
    await updateProfile({ photo_url: url } as any);
    toast.success("Photo updated!");
  };

  // Language helpers
  const addLanguage = () => {
    const available = indianLanguages.find((l) => !languages.some((ml) => ml.language === l));
    if (available) setLanguages([...languages, { language: available, proficiency: "Conversational" }]);
  };
  const removeLanguage = (index: number) => setLanguages(languages.filter((_, i) => i !== index));
  const updateLanguage = (index: number, field: keyof MentorLanguage, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  // Plan helpers
  const addPlan = () => {
    setPlans([...plans, { id: "sp-" + Date.now(), name: "", type: "monthly", price: 0, description: "", features: [""], isActive: true }]);
  };
  const removePlan = (index: number) => setPlans(plans.filter((_, i) => i !== index));
  const updatePlan = (index: number, field: keyof SubscriptionPlan, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };
  const addFeature = (planIndex: number) => {
    const updated = [...plans];
    updated[planIndex] = { ...updated[planIndex], features: [...updated[planIndex].features, ""] };
    setPlans(updated);
  };
  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...plans];
    const features = [...updated[planIndex].features];
    features[featureIndex] = value;
    updated[planIndex] = { ...updated[planIndex], features };
    setPlans(updated);
  };
  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...plans];
    updated[planIndex] = { ...updated[planIndex], features: updated[planIndex].features.filter((_, i) => i !== featureIndex) };
    setPlans(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated || role !== "mentor") return <Navigate to="/" />;

  const mockBookings = [
    { id: "b1", aspirant: "Priya M.", date: "2026-03-10", time: "10:00 AM", type: "Video", status: "Upcoming" },
    { id: "b2", aspirant: "Rahul K.", date: "2026-03-08", time: "2:00 PM", type: "Audio", status: "Completed" },
    { id: "b3", aspirant: "Sneha D.", date: "2026-03-05", time: "11:00 AM", type: "Chat", status: "Completed" },
  ];
  const mockEarnings = { total: 45600, thisMonth: 12400, sessions: 38 };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {profile?.name}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 max-w-xl">
              <h3 className="font-semibold text-foreground">Edit Profile</h3>
              <div className="flex items-center gap-4">
                {profile?.photo_url ? (
                  <img src={profile.photo_url} alt="Avatar" className="h-20 w-20 rounded-full object-cover border-2 border-border" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="space-y-1">
                  <Button variant="outline" size="sm" onClick={() => setAvatarCropOpen(true)}>
                    {profile?.photo_url ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <p className="text-xs text-muted-foreground">Square photo recommended</p>
                </div>
              </div>
              <div className="space-y-2"><Label>Full Name</Label><Input value={profileName} onChange={(e) => setProfileName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Optional Subject</Label><Input value={optionalSubject} onChange={(e) => setOptionalSubject(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Mains Attempts</Label><Input type="number" value={mainsAttempts} onChange={(e) => setMainsAttempts(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Interview Appearances</Label><Input type="number" value={interviewAppearances} onChange={(e) => setInterviewAppearances(Number(e.target.value))} /></div>
              </div>
              <div className="space-y-2"><Label>Bio</Label><Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} /></div>
              
              {/* Languages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Languages & Proficiency</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addLanguage} className="gap-1 text-xs" disabled={languages.length >= indianLanguages.length}>
                    <Plus className="h-3 w-3" /> Add Language
                  </Button>
                </div>
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Select value={lang.language} onValueChange={(v) => updateLanguage(i, "language", v)}>
                      <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {indianLanguages.filter((l) => l === lang.language || !languages.some((ml) => ml.language === l)).map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={lang.proficiency} onValueChange={(v) => updateLanguage(i, "proficiency", v)}>
                      <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLanguage(i)} className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive" disabled={languages.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleSaveProfile} disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 max-w-xl">
              <h3 className="font-semibold text-foreground">Session Pricing (₹)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Audio Per Minute</Label><Input type="number" value={audioPerMinute} onChange={(e) => setAudioPerMinute(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Video Per Minute</Label><Input type="number" value={videoPerMinute} onChange={(e) => setVideoPerMinute(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Audio Per Hour</Label><Input type="number" value={audioPerHour} onChange={(e) => setAudioPerHour(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Video Per Hour</Label><Input type="number" value={videoPerHour} onChange={(e) => setVideoPerHour(Number(e.target.value))} /></div>
              </div>
              <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleSavePricing} disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Update Pricing"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Subscription Plans</h3>
                <Button variant="outline" size="sm" onClick={addPlan} className="gap-1 text-xs"><Plus className="h-3 w-3" /> Add Plan</Button>
              </div>
              {plans.map((plan, i) => (
                <div key={plan.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2"><Crown className="h-4 w-4 text-gold-dark" /><span className="text-sm font-semibold text-foreground">Plan {i + 1}</span></div>
                    <Button variant="ghost" size="icon" onClick={() => removePlan(i)} className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2"><Label className="text-xs">Plan Name</Label><Input value={plan.name} onChange={(e) => updatePlan(i, "name", e.target.value)} placeholder="e.g. Mains Mastery" /></div>
                    <div className="space-y-2"><Label className="text-xs">Type</Label>
                      <Select value={plan.type} onValueChange={(v) => updatePlan(i, "type", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="one-time">One-time</SelectItem></SelectContent></Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2"><Label className="text-xs">Price (₹)</Label><Input type="number" value={plan.price} onChange={(e) => updatePlan(i, "price", Number(e.target.value))} /></div>
                    <div className="space-y-2 flex items-end">
                      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={plan.isActive} onChange={(e) => updatePlan(i, "isActive", e.target.checked)} className="rounded border-border" /> Active</label>
                    </div>
                  </div>
                  <div className="space-y-2"><Label className="text-xs">Description</Label><Textarea rows={2} value={plan.description} onChange={(e) => updatePlan(i, "description", e.target.value)} placeholder="Describe what this plan includes..." /></div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between"><Label className="text-xs">Features</Label><button onClick={() => addFeature(i)} className="text-xs text-muted-foreground hover:text-foreground">+ Add feature</button></div>
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <Input value={f} onChange={(e) => updateFeature(i, fi, e.target.value)} placeholder="e.g. 4 sessions/month" className="text-sm" />
                        <Button variant="ghost" size="icon" onClick={() => removeFeature(i, fi)} className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive" disabled={plan.features.length <= 1}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {plans.length > 0 && (
                <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90" onClick={handleSavePlans} disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save All Plans"}
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm max-w-xl space-y-4">
                <h3 className="font-semibold text-foreground">Create New Post</h3>
                <div className="space-y-2"><Label>Title</Label><Input placeholder="Post title" /></div>
                <div className="space-y-2"><Label>Category</Label><Input placeholder="e.g. Strategy, Answer Writing" /></div>
                <div className="space-y-2"><Label>Content</Label><Textarea rows={5} placeholder="Write your post..." /></div>
                <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90">Publish Post</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Aspirant</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Time</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((b) => (
                      <tr key={b.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-medium text-foreground">{b.aspirant}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.time}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.type}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "Upcoming" ? "bg-gold/15 text-gold-dark" : "bg-secondary text-muted-foreground"}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              {[
                { label: "Total Earnings", value: `₹${mockEarnings.total.toLocaleString()}`, icon: TrendingUp },
                { label: "This Month", value: `₹${mockEarnings.thisMonth.toLocaleString()}`, icon: DollarSign },
                { label: "Total Sessions", value: mockEarnings.sessions.toString(), icon: BookOpen },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10"><s.icon className="h-5 w-5 text-gold-dark" /></div>
                    <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold text-foreground">{s.value}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {[
                { name: "Priya M.", rating: 5, comment: "Amazing session! Very helpful.", date: "2026-02-28" },
                { name: "Rahul K.", rating: 4, comment: "Good insights on answer writing.", date: "2026-02-25" },
              ].map((r, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-gold text-gold" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <AvatarCropModal open={avatarCropOpen} onOpenChange={setAvatarCropOpen} onCropComplete={handleAvatarCrop} />
    </div>
  );
};

export default MentorDashboard;
