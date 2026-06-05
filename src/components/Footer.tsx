import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            {/* <h3 className="text-2xl font-light mb-4">9 Architects</h3> */}
            <div className="flex items-baseline gap-0.5">
              <span className="text-3xl font-bold text-[#0EA5E9]">9</span>
              <span className="text-xl font-light">Architects</span>
            </div>
            <p className="text-white/70 font-light leading-relaxed">
              Creating spaces that inspire and transform lives through
              innovative architectural design.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wider">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {["Home", "About", "Services", "Process", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-white/70 hover:text-white transition-colors duration-300 font-light"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wider">
              Contact Info
            </h4>
            <div className="space-y-2 text-white/70 font-light">
              <p>Archana Towers, Asramam</p>
              <p>Kollam - 691001, Kerala</p>
              <p>info@9architects.net</p>
              <p>94477 18390, 99950 99000</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm font-light">
            © 2025 9 Architects. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/9architects.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/9.architects/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.youtube.com/@9Architects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Youtube className="w-5 h-5" />
            </a>

            

            {/* <a
              href="https://twitter.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a> */}

            {/* <a
    href="https://linkedin.com/company/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-white transition-colors duration-300"
  >
    <Linkedin className="w-5 h-5" />
  </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
