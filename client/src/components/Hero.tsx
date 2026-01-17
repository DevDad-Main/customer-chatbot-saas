import { useEffect, useRef, useLayoutEffect } from "react"
import { ArrowRight, Send, User } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  { text: "Lightning Fast", layer: 3, left: "12%", top: "18%" },
  { text: "Human-like", layer: 2, left: "28%", top: "12%" },
  { text: "99% Accuracy", layer: 2, left: "35%", top: "5%" },
  { text: "Smart AI", layer: 3, right: "28%", top: "8%" },
  { text: "Always Online", layer: 1, right: "6%", top: "25%" },
  { text: "Multi-language", layer: 2, right: "3%", bottom: "30%" },
  { text: "Secure", layer: 1, left: "14%", bottom: "12%" },
  { text: "Easy API", layer: 3, left: "28%", bottom: "22%" },
  { text: "Fast Setup", layer: 3, left: "6%", bottom: "44%" },
  { text: "Analytics", layer: 1, right: "14%", bottom: "8%" },
  { text: "Custom AI", layer: 2, right: "36%", bottom: "12%" },
  { text: "Real-time", layer: 1, right: "2%", top: "6%" },
]

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, {
        force3D: true,
        z: -800,
      })

      gsap.set(".zoom-item[data-layer='3']", {
        force3D: true,
        z: -200,
        opacity: 0.3,
        scale: 0.6,
      })

      gsap.set(".zoom-item[data-layer='2']", {
        force3D: true,
        z: -400,
        opacity: 0.2,
        scale: 0.5,
      })

      gsap.set(".zoom-item[data-layer='1']", {
        force3D: true,
        z: -600,
        opacity: 0.1,
        scale: 0.4,
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          },
        })
        .to(".zoom-item[data-layer='3']", {
          z: 600,
          opacity: 1,
          scale: 1.2,
          force3D: true,
          ease: "power1.inOut",
        }, 0)
        .to(".zoom-item[data-layer='2']", {
          z: 400,
          opacity: 1,
          scale: 1,
          force3D: true,
          ease: "power1.inOut",
        }, 0)
        .to(".zoom-item[data-layer='1']", {
          z: 200,
          opacity: 1,
          scale: 0.9,
          force3D: true,
          ease: "power1.inOut",
        }, 0)
        .to(headingRef.current, {
          z: 0,
          opacity: 1,
          scale: 1,
          force3D: true,
          ease: "power1.inOut",
        }, 0)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <div ref={containerRef} className="zoom-container">
        <h1 ref={headingRef} className="heading">
          People-First Customer Support
          <br />
          <span className="text-indigo-400">powered by AI.</span>
        </h1>

        {features.map((feature, index) => (
          <div
            key={index}
            className="zoom-item"
            data-layer={feature.layer}
            style={{
              left: feature.left,
              right: feature.right,
              top: feature.top,
              bottom: feature.bottom,
            }}
          >
            <span className="feature-text">{feature.text}</span>
          </div>
        ))}
      </div>

      <section className="min-h-screen bg-[#050509] flex flex-col items-center justify-center text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center px-6 py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-md- mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
            <span className="text-xs text-zinc-300 tracking-wide font-light">
              v1 available now
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
            People-First Customer Support
            <br />
            <span className="text-zinc-500">powered by AI.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly resolve customer questions with an assistant powered by your
            real world information and converses with empathy. No robotic
            response, just answers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => window.location.href = '/auth'}
              className="h-11 px-8 cursor-pointer rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Start For Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="h-11 px-8 cursor-pointer rounded-full border border-zinc-800 text-zinc-300 text-sm font-medium hover:border-zinc-600 hover:text-white transition-all bg-black/20 backdrop-blur-sm">
              View Demo
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl p-1 md:p-2 relative overflow-hidden ring-1 ring-white/10 bg-[#0a0a0e] shadow-2xl">
            <div className="flex flex-col h-[500px] md:h-[600px] w-full bg-[#0a0a0e] rounded-xl overflow-hidden">
              <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e12] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-zinc-300">ServIQ Inc.</span>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-950/30">
                <div className="flex w-full flex-col items-start animate-message-in" style={{ animationDelay: "0ms", animationFillMode: "both" }}>
                  <div className="flex max-w-[85%] gap-3 flex-row">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-b-zinc-950/30 overflow-hidden">
                      <img src="/chatbot-avatar.jpg" alt="Support Agent" className="w-full h-full object-cover" />
                    </div>
                    <div className="animate-message-content">
                      <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-white text-zinc-900 rounded-tl-sm">
                        Hi there, How can i help you today?.
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1 ml-1">
                        <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium">Pricing</span>
                        <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium">Support</span>
                        <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium">FAQ</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col items-end animate-message-in" style={{ animationDelay: "800ms", animationFillMode: "both" }}>
                  <div className="flex max-w-[85%] gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 bg-zinc-700 overflow-hidden">
                      <User className="w-6 h-6 m-1 text-zinc-400" />
                    </div>
                    <div className="animate-message-content">
                      <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-zinc-800 text-zinc-200 rounded-tr-sm">
                        I require some background information regarding ServIQ.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start animate-message-in" style={{ animationDelay: "1600ms", animationFillMode: "both" }}>
                  <div className="flex max-w-[85%] gap-3 flex-row">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-b-zinc-950/30 overflow-hidden">
                      <img src="/chatbot-avatar.jpg" alt="Support Agent" className="w-full h-full object-cover" />
                    </div>
                    <div className="animate-message-content">
                      <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-white text-zinc-900 rounded-tl-sm">
                        ServIQ is an integrated ecosystem designed to enhance developer efficiency. It includes tools like ServIQ Logs for real-time monitoring and DevDad Inc for constant support.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0a0a0e] border-t border-white/5 shrink-0">
                <div className="min-h-[50px] w-full px-4 py-3 text-sm bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-500 flex items-center justify-between">
                  <span>Type a message...</span>
                  <button className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
