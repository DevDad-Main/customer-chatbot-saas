import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#050509] border-t border-white/5 py-12 md:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-4">ServIQ</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Human-friendly AI customer support that reads your docs and speaks with empathy.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Integrations</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">API Reference</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-white/5">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} ServIQ Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
