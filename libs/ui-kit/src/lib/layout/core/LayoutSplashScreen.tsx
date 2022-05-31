import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";

const LayoutSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
  undefined
);

const LayoutSplashScreenProvider: FC<any> = ({children}) => {
  const [count, setCount] = useState(0)
  const visible = count > 0

  useEffect(() => {
    const splashScreen = document.getElementById('splash-screen')

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove('hidden')

      return () => {
        splashScreen.classList.add('hidden')
      }
    }

    // Hide SplashScreen
    let timeout: number
    if (splashScreen && !visible) {
      timeout = window.setTimeout(() => {
        splashScreen.classList.add('hidden')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <LayoutSplashScreenContext.Provider value={setCount}>
      {children}
    </LayoutSplashScreenContext.Provider>
  )
}

export const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(LayoutSplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1
      })
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1
        })
      }
    }
  }, [setCount, visible])

  return null
}
