import { useEffect, useState } from "react"

export const useUser = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const userSessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_session="))
        ?.split("=")[1]

      if (userSessionCookie) {
        try {
          const user = JSON.parse(decodeURIComponent(userSessionCookie))
          setEmail(user.email)
        } catch {
          setEmail(null)
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  return { email, loading }
}
