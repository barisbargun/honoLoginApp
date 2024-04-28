import { panelDescription } from "@/constants"

const AuthDescription = () => {
  return (
    <div className="mt-3 flex flex-col gap-0.5 w-full max-lg:text-center sm:max-lg:w-[70%]">
      <p className="fonts-desc opacity-45">{panelDescription[0]}</p>
      <p className="fonts-desc opacity-45 max-sm:hidden">{panelDescription[1]}</p>
    </div>
  )
}

export default AuthDescription