const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [hasMetadata, setHasMetadata] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMetadata = async () => {
      try {
        const response = await fetch("/api/metadata/fetch")
        const data = await response.json()
        setHasMetadata(data.exists)
      } catch (error) {
        console.error("Failed to check metadata:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checkMetadata()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-[#050509] min-h-screen font-sans antialiased text-zinc-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#050509] min-h-screen font-sans antialiased text-zinc-100 selection:bg-zinc-800">
      {hasMetadata ? (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64 relative min-h-screen transition-all duration-300">
            <main className="flex-1">{children}</main>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  )
}

import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"

export default DashboardLayout
