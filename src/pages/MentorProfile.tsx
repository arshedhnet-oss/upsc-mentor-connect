import { useParams, Link } from "react-router-dom";
import { Star, Phone, Video, ArrowLeft, Crown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mentors } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookSessionModal from "@/components/BookSessionModal";
import { useState } from "react";

const MentorProfile = () => {
  const { id } = useParams();
  const mentor = mentors.find((m) => m.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Mentor not found.</p>
          <Link to="/find-mentors"><Button variant="outline" className="mt-4">Browse Mentors</Button></Link>
        </div>
      </div>
    );
  }

  const avgRating = mentor.reviews.length > 0
    ? (mentor.reviews.reduce((s, r) => s + r.rating, 0) / mentor.reviews.length).toFixed(1)
    : mentor.rating.toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/find-mentors" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Mentors
        </Link>

        {/* Hero */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar className="h-24 w-24 ring-4 ring-border">
              <AvatarImage src={mentor.photo} alt={mentor.name} />
              <AvatarFallback className="text-2xl">{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">{mentor.name}</h1>
              <p className="mt-1 text-gold-dark font-semibold">{mentor.optionalSubject}</p>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-semibold text-foreground">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({mentor.totalReviews} reviews)</span>
              </div>
              <div className="mt-3 flex gap-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{mentor.mainsAttempts}</strong> Mains Attempts</span>
                <span><strong className="text-foreground">{mentor.interviewAppearances}</strong> Interview Appearances</span>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{mentor.bio}</p>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" className="w-full bg-gradient-navy text-primary-foreground hover:opacity-90 md:w-auto" onClick={() => setBookingOpen(true)}>
                Book Session
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="posts">Posts ({mentor.posts.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({mentor.reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Session Rates</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-5 w-5 text-navy" />
                    <h4 className="font-semibold text-foreground">Audio Call</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Per Minute</span><span className="font-semibold text-foreground">₹{mentor.pricing.audioPerMinute}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Per Hour</span><span className="font-semibold text-foreground">₹{mentor.pricing.audioPerHour}</span></div>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="h-5 w-5 text-navy" />
                    <h4 className="font-semibold text-foreground">Video Call</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Per Minute</span><span className="font-semibold text-foreground">₹{mentor.pricing.videoPerMinute}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Per Hour</span><span className="font-semibold text-foreground">₹{mentor.pricing.videoPerHour}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="availability">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Availability</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span
                    key={day}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      mentor.availability.includes(day)
                        ? "bg-gold/15 text-gold-dark"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
              />
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="space-y-4">
              {mentor.posts.length > 0 ? mentor.posts.map((post) => (
                <div key={post.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold-dark">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">{post.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.content}</p>
                </div>
              )) : (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No posts yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {mentor.reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{review.userName}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                    ))}
                    <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground capitalize">{review.sessionType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BookSessionModal open={bookingOpen} onOpenChange={setBookingOpen} mentor={mentor} />
      <Footer />
    </div>
  );
};

export default MentorProfile;
