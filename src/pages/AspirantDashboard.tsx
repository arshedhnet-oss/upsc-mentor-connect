import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, MessageSquare, Phone, Video } from "lucide-react";
import { mockSessions, mentors } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const AspirantDashboard = () => {
  const { isAuthenticated, role, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("sessions");

  if (!isAuthenticated || role !== "aspirant") return <Navigate to="/" />;

  const totalSpent = mockSessions.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.cost, 0);
  const favoriteMentors = mentors.slice(0, 3);

  const typeIcon = (t: string) => {
    if (t === "video") return <Video className="h-4 w-4" />;
    if (t === "audio") return <Phone className="h-4 w-4" />;
    return <MessageSquare className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Aspirant Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">Leave Review</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <div className="space-y-4">
              {mockSessions.map((s) => (
                <div key={s.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    {typeIcon(s.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{s.mentorName}</p>
                    <p className="text-xs text-muted-foreground">{s.date} at {s.time} · {s.duration} min</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{s.cost}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      s.status === "upcoming" ? "bg-gold/15 text-gold-dark" :
                      s.status === "completed" ? "bg-secondary text-muted-foreground" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  {s.status === "upcoming" && (
                    <Button size="sm" variant="outline" className="text-xs">
                      Join
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spending">
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs text-muted-foreground">Sessions Completed</p>
                <p className="text-2xl font-bold text-foreground">{mockSessions.filter((s) => s.status === "completed").length}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs text-muted-foreground">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-foreground">{mockSessions.filter((s) => s.status === "upcoming").length}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteMentors.map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs text-gold-dark">{m.optionalSubject}</p>
                    </div>
                    <Heart className="h-4 w-4 fill-destructive text-destructive" />
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span className="text-sm font-medium">{m.rating}</span>
                  </div>
                  <Link to={`/mentor/${m.id}`}>
                    <Button size="sm" variant="outline" className="w-full text-xs">View Profile</Button>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="max-w-xl space-y-4">
              <p className="text-sm text-muted-foreground">You can leave reviews for completed sessions only.</p>
              {mockSessions.filter((s) => s.status === "completed").map((s) => (
                <div key={s.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
                  <p className="font-semibold text-foreground">{s.mentorName}</p>
                  <p className="text-xs text-muted-foreground">{s.date} · {s.type} · {s.duration} min</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 cursor-pointer text-border hover:fill-gold hover:text-gold transition-colors" />
                    ))}
                  </div>
                  <Textarea placeholder="Write your review..." rows={3} />
                  <Button size="sm" className="bg-gradient-navy text-primary-foreground hover:opacity-90">Submit Review</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AspirantDashboard;
