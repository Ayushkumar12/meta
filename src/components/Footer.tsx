import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/logo.png";


const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Frontend Development", href: "/services/Frontend-Development" },
    { name: "Backend Development", href: "/services/backend-development" },
    { name: "Full stack Development", href: "/services/full-stack-development" },
    { name: "Mobile App Development", href: "/services/mobile-app-development" },
    { name: "web Design", href: "/services/web-design" },
  ],
  social: [
    { name: "GitHub", icon: Github, href: "https://github.com/Meta-Code-1" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <img src={logo} alt="" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                MetaCode<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Pushing the boundaries of digital experiences through innovative design and cutting-edge technology.
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Sector-44 Noida, Gautam Budh Nagar 201301</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+91 8800767093</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="text-primary shrink-0" size={18} />
                <span>info@MetaCode.co.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} MetaCode Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
