import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Video, ArrowRight, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mentors, testimonials } from "@/data/mockData";
import MentorCard from "@/components/MentorCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const featuredMentors = mentors.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-navy opacity-[0.03]" />
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-dark">
              India's #1 UPSC Mentorship Platform
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Your UPSC Journey Deserves{" "}
              <span className="text-gradient bg-gradient-to-r from-navy to-navy-light">
                Strategic Mentorship
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Connect one-on-one with verified UPSC toppers and experienced mentors. 
              Get personalized guidance through chat, audio, and video sessions.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/find-mentors">
                <Button size="lg" className="bg-gradient-navy text-primary-foreground hover:opacity-90 px-8">
                  Find a Mentor <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-navy/20 px-8">
                Become a Mentor
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-600" /> Verified Mentors</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-600" /> Pay Per Minute</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-600" /> Chat, Audio & Video</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">How It Works</h2>
          <p className="mb-10 text-center text-muted-foreground">Get started in three simple steps</p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Search, title: "Browse Mentors", desc: "Explore verified UPSC mentors filtered by subject, experience, rating, and availability." },
              { icon: Calendar, title: "Book a Session", desc: "Choose your preferred time and session type — chat, audio, or video call." },
              { icon: Video, title: "Connect & Learn", desc: "Join your session, get personalized guidance, and accelerate your preparation." },
            ].map((step, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <step.icon className="h-7 w-7 text-gold-dark" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-navy px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  Step {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Featured Mentors</h2>
              <p className="mt-1 text-muted-foreground">Learn from India's best UPSC minds</p>
            </div>
            <Link to="/find-mentors" className="hidden text-sm font-medium text-navy hover:underline md:block">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/find-mentors">
              <Button variant="outline">View All Mentors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">What Aspirants Say</h2>
          <p className="mb-10 text-center text-muted-foreground">Real stories from real UPSC aspirants</p>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-gold-dark font-medium">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-navy p-10 text-center md:p-16">
            <h2 className="mb-4 text-2xl font-bold text-primary-foreground md:text-3xl">
              Ready to Transform Your UPSC Preparation?
            </h2>
            <p className="mb-8 text-primary-foreground/80 md:text-lg">
              Join thousands of aspirants who are learning from verified UPSC mentors.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/find-mentors">
                <Button size="lg" className="bg-gradient-gold text-accent-foreground hover:opacity-90 px-8 font-semibold">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
