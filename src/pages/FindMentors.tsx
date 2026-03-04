import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mentors, optionalSubjects, indianLanguages } from "@/data/mockData";
import MentorCard from "@/components/MentorCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FindMentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [minMains, setMinMains] = useState(0);
  const [minInterviews, setMinInterviews] = useState(0);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.optionalSubject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (subjectFilter !== "all" && m.optionalSubject !== subjectFilter) return false;
      if (m.rating < minRating) return false;
      if (m.startingPrice > maxPrice) return false;
      if (m.mainsAttempts < minMains) return false;
      if (m.interviewAppearances < minInterviews) return false;
      return true;
    });
  }, [searchQuery, subjectFilter, minRating, maxPrice, minMains, minInterviews]);

  const clearFilters = () => {
    setSubjectFilter("all");
    setMinRating(0);
    setMaxPrice(50);
    setMinMains(0);
    setMinInterviews(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Find Your Mentor</h1>
          <p className="mt-1 text-muted-foreground">Browse verified UPSC mentors and find the perfect match</p>
        </div>

        {/* Search & Filter Toggle */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground">
                Clear all
              </button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-xs">Optional Subject</Label>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger><SelectValue placeholder="All subjects" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {optionalSubjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
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
                <div className="space-y-2">
                  <Label className="text-xs">Min Mains</Label>
                  <Input type="number" min={0} max={10} value={minMains} onChange={(e) => setMinMains(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Min Interviews</Label>
                  <Input type="number" min={0} max={10} value={minInterviews} onChange={(e) => setMinInterviews(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found</p>
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MentorCard key={m.id} mentor={m} />
            ))}
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
