import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { MessageSquare, Phone, Video } from "lucide-react";
import type { Mentor } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: Mentor;
}

const sessionTypes = [
  { key: "chat" as const, label: "Chat", icon: MessageSquare },
  { key: "audio" as const, label: "Audio Call", icon: Phone },
  { key: "video" as const, label: "Video Call", icon: Video },
];

const BookSessionModal = ({ open, onOpenChange, mentor }: Props) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [type, setType] = useState<"chat" | "audio" | "video">("video");
  const [duration, setDuration] = useState(60);

  const perMinRate = type === "video" ? mentor.pricing.videoPerMinute : mentor.pricing.audioPerMinute;
  const cost = type === "chat" ? mentor.pricing.audioPerMinute * duration : perMinRate * duration;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Session with {mentor.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div>
            <Label className="mb-2 block text-sm">Session Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {sessionTypes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setType(s.key)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border-2 p-3 text-sm transition-all",
                    type === s.key ? "border-gold bg-gold/5 text-foreground" : "border-border text-muted-foreground hover:border-gold/50"
                  )}
                >
                  <s.icon className="h-5 w-5" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date()}
              className="rounded-md border pointer-events-auto"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm">Duration</Label>
            <div className="flex gap-2">
              {[30, 45, 60].map((d) => (
                <Button
                  key={d}
                  variant={duration === d ? "default" : "outline"}
                  size="sm"
                  className={duration === d ? "bg-gradient-navy text-primary-foreground" : ""}
                  onClick={() => setDuration(d)}
                >
                  {d} min
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="text-foreground">₹{perMinRate}/min</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-muted-foreground">Duration</span>
              <span className="text-foreground">{duration} min</span>
            </div>
            <div className="mt-2 border-t border-border pt-2 flex justify-between font-semibold">
              <span>Estimated Cost</span>
              <span className="text-gold-dark">₹{cost.toLocaleString()}</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-navy text-primary-foreground hover:opacity-90" disabled={!date}>
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSessionModal;
