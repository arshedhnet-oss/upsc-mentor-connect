import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, DollarSign, BookOpen, TrendingUp, Plus, Trash2, Crown } from "lucide-react";
import { indianLanguages, proficiencyLevels, type MentorLanguage, type SubscriptionPlan } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const MentorDashboard = () => {
  const { isAuthenticated, role, user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [languages, setLanguages] = useState<MentorLanguage[]>([
    { language: "English", proficiency: "Fluent" },
    { language: "Hindi", proficiency: "Native" },
  ]);

  const addLanguage = () => {
    const available = indianLanguages.find((l) => !languages.some((ml) => ml.language === l));
    if (available) setLanguages([...languages, { language: available, proficiency: "Conversational" }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof MentorLanguage, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    { id: "sp1", name: "Mains Answer Review", type: "monthly", price: 4999, description: "Weekly answer review sessions with detailed feedback.", features: ["4 answer reviews/month", "Written feedback", "Priority booking"], isActive: true },
    { id: "sp2", name: "Complete Optional Package", type: "one-time", price: 14999, description: "End-to-end optional preparation with notes and mentoring.", features: ["Full syllabus coverage", "10 mock tests", "3 one-on-one sessions"], isActive: true },
  ]);

  const addPlan = () => {
    setPlans([...plans, {
      id: "sp-" + Date.now(),
      name: "",
      type: "monthly",
      price: 0,
      description: "",
      features: [""],
      isActive: true,
    }]);
  };

  const removePlan = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

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
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 max-w-xl">
              <h3 className="font-semibold text-foreground">Edit Profile</h3>
              <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
              <div className="space-y-2"><Label>Optional Subject</Label><Input defaultValue="Public Administration" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Mains Attempts</Label><Input type="number" defaultValue={3} /></div>
                <div className="space-y-2"><Label>Interview Appearances</Label><Input type="number" defaultValue={2} /></div>
              </div>
              <div className="space-y-2"><Label>Bio</Label><Textarea rows={4} defaultValue="AIR 45 in CSE 2019..." /></div>
              
              {/* Languages Section */}
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
                        {indianLanguages
                          .filter((l) => l === lang.language || !languages.some((ml) => ml.language === l))
                          .map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Select value={lang.proficiency} onValueChange={(v) => updateLanguage(i, "proficiency", v)}>
                      <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeLanguage(i)} className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive" disabled={languages.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90">Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 max-w-xl">
              <h3 className="font-semibold text-foreground">Session Pricing (₹)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Audio Per Minute</Label><Input type="number" defaultValue={15} /></div>
                <div className="space-y-2"><Label>Video Per Minute</Label><Input type="number" defaultValue={25} /></div>
                <div className="space-y-2"><Label>Audio Per Hour</Label><Input type="number" defaultValue={750} /></div>
                <div className="space-y-2"><Label>Video Per Hour</Label><Input type="number" defaultValue={1200} /></div>
              </div>
              <Button className="bg-gradient-navy text-primary-foreground hover:opacity-90">Update Pricing</Button>
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
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${b.status === "Upcoming" ? "bg-gold/15 text-gold-dark" : "bg-secondary text-muted-foreground"}`}>
                            {b.status}
                          </span>
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <s.icon className="h-5 w-5 text-gold-dark" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-bold text-foreground">{s.value}</p>
                    </div>
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
    </div>
  );
};

export default MentorDashboard;
