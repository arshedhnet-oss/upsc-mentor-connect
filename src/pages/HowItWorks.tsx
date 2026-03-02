import { UserPlus, Search, CalendarCheck, Video, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: UserPlus, title: "Sign Up", desc: "Create your free account as an aspirant or mentor. Quick and simple registration." },
  { icon: Search, title: "Browse Mentors", desc: "Search and filter verified UPSC mentors by subject, experience, rating, and pricing." },
  { icon: CalendarCheck, title: "Book a Session", desc: "Choose your preferred date, time, and session type — chat, audio, or video call." },
  { icon: Video, title: "Connect & Learn", desc: "Join your session and get personalized one-on-one guidance from your mentor." },
  { icon: Star, title: "Review & Grow", desc: "Leave a review after your session. Track your progress and book more sessions." },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Get personalized UPSC mentorship in five simple steps
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-14 h-full w-0.5 bg-border" />
              )}
              <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-navy shadow-elegant">
                <step.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="pt-2">
                <div className="text-xs font-semibold text-gold-dark mb-1">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
