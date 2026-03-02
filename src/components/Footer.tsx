import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-navy">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">
                UPSC<span className="text-gold">Mentor</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's premier platform connecting UPSC aspirants with verified mentors for personalized guidance.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/find-mentors" className="hover:text-foreground transition-colors">Find Mentors</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Become a Mentor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Blog</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">FAQ</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Support</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-foreground transition-colors">Refund Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UPSCMentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
