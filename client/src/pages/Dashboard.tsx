import { useEffect, useState } from "react"
import InitialForm from "../components/InitialForm"

const Dashboard = () => {
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
      <div className="flex-1 flex w-full items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 flex w-full">
      {!hasMetadata ? (
        <div className="w-full flex items-center justify-center p-4 min-h-screen">
          <InitialForm />
        </div>
      ) : (
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-medium text-white mb-4">Dashboard</h1>
          <p className="text-zinc-400">Welcome to your dashboard!</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
