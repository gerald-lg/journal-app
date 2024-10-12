import { AppRouter } from "./router/AppRouter"
import { Apptheme } from "./theme/Apptheme"

export const JournalApp = () => {
  return (
    <Apptheme>
        <AppRouter />
    </Apptheme>
  )
}
