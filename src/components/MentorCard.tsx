import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Mentor } from "@/data/mockData";

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-border">
          <AvatarImage src={mentor.photo} alt={mentor.name} />
          <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{mentor.name}</h3>
          <p className="text-sm text-gold-dark font-medium">{mentor.optionalSubject}</p>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-sm font-medium text-foreground">{mentor.rating}</span>
            <span className="text-xs text-muted-foreground">({mentor.totalReviews})</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        <span><strong className="text-foreground">{mentor.mainsAttempts}</strong> Mains</span>
        <span><strong className="text-foreground">{mentor.interviewAppearances}</strong> Interviews</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {mentor.languages.map((l) => (
          <span key={l.language} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
            {l.language}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          From ₹{mentor.startingPrice}<span className="text-xs font-normal text-muted-foreground">/min</span>
        </span>
        <Link to={`/mentor/${mentor.id}`}>
          <Button size="sm" variant="outline" className="text-xs">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
