import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: <Github size={20} />, href: "https://github.com/sachinverma95", label: "GitHub" },
  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/sachin-verma-682384373", label: "LinkedIn" },
  { icon: <Mail size={20} />, href: "mailto:rajsachin116@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          {new Date().getFullYear()} Sachin Kr Verma. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
