import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return // ✅ SSR safety

    const updateMatch = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // ✅ Initial check
    updateMatch()

    // ✅ Event listener for media query
    if (mql.addEventListener) {
      mql.addEventListener("change", updateMatch)
    } else {
      // Fallback for Safari/iOS
      mql.addListener(updateMatch)
    }

    // ✅ Extra safety: listen to resize (orientation changes, etc.)
    window.addEventListener("resize", updateMatch)

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", updateMatch)
      } else {
        mql.removeListener(updateMatch)
      }
      window.removeEventListener("resize", updateMatch)
    }
  }, [])

  return isMobile
}
