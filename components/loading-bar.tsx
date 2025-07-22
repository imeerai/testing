"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return <div className="loading-bar" />
}
