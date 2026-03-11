import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mentors as mockMentors, optionalSubjects, indianLanguages, type Mentor } from "@/data/mockData";
import MentorCard from "@/components/MentorCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const FindMentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [minMains, setMinMains] = useState(0);
  const [minInterviews, setMinInterviews] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("all");
  const [dbMentors, setDbMentors] = useState<Mentor[]>([]);

  // Fetch real mentors from database
  useEffect(() => {
    const fetchMentors = async () => {
      // Get user_ids that have the mentor role
      const { data: mentorRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "mentor");

      if (!mentorRoles || mentorRoles.length === 0) return;

      const mentorUserIds = mentorRoles.map((r) => r.user_id);

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", mentorUserIds);

      if (profiles) {
        const mapped: Mentor[] = profiles.map((p) => ({
          id: `db-${p.user_id}`,
          name: p.name,
          photo: p.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1e3a5f&color=fff&size=256`,
          optionalSubject: p.optional_subject || "General Studies",
          mainsAttempts: p.mains_attempts || 0,
          interviewAppearances: p.interview_appearances || 0,
          bio: p.bio || "",
          rating: Number(p.rating) || 0,
          totalReviews: p.total_reviews || 0,
          pricing: {
            audioPerMinute: p.audio_per_minute || 15,
            videoPerMinute: p.video_per_minute || 25,
            audioPerHour: p.audio_per_hour || 750,
            videoPerHour: p.video_per_hour || 1200,
          },
          availability: p.availability || [],
          startingPrice: Math.min(p.audio_per_minute || 15, p.video_per_minute || 25),
          languages: (p.languages as any[]) || [],
          subscriptionPlans: (p.subscription_plans as any[]) || [],
          posts: [],
          reviews: [],
        }));
        setDbMentors(mapped);
      }
    };
    fetchMentors();
  }, []);

  // Combine mock + DB mentors
  const allMentors = useMemo(() => [...mockMentors, ...dbMentors], [dbMentors]);

  const filtered = useMemo(() => {
    return allMentors.filter((m) => {
      if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.optionalSubject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (subjectFilter !== "all" && m.optionalSubject !== subjectFilter) return false;
      if (m.rating < minRating) return false;
      if (m.startingPrice > maxPrice) return false;
      if (m.mainsAttempts < minMains) return false;
      if (m.interviewAppearances < minInterviews) return false;
      if (languageFilter !== "all" && !m.languages.some((l) => l.language === languageFilter)) return false;
      return true;
    });
  }, [allMentors, searchQuery, subjectFilter, minRating, maxPrice, minMains, minInterviews, languageFilter]);

  const clearFilters = () => {
    setSubjectFilter("all");
    setMinRating(0);
    setMaxPrice(50);
    setMinMains(0);
    setMinInterviews(0);
    setLanguageFilter("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Find Your Mentor</h1>
          <p className="mt-1 text-muted-foreground">Browse verified UPSC mentors and find the perfect match</p>
        </div>

        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or subject..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </div>

        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">Clear all</button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label className="text-xs">Optional Subject</Label>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger><SelectValue placeholder="All subjects" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {optionalSubjects.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Language</Label>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger><SelectValue placeholder="All languages" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {indianLanguages.map((l) => (<SelectItem key={l} value={l}>{l}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Min Rating: {minRating}</Label>
                <Slider value={[minRating]} onValueChange={([v]) => setMinRating(v)} max={5} step={0.5} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Max Price: ₹{maxPrice}/min</Label>
                <Slider value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v)} max={50} step={1} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs">Min Mains</Label><Input type="number" min={0} max={10} value={minMains} onChange={(e) => setMinMains(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label className="text-xs">Min Interviews</Label><Input type="number" min={0} max={10} value={minInterviews} onChange={(e) => setMinInterviews(Number(e.target.value))} /></div>
              </div>
            </div>
          </div>
        )}

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found</p>
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (<MentorCard key={m.id} mentor={m} />))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No mentors match your filters. Try adjusting your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindMentors;
