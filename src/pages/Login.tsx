import { LoginForm } from "@/components/login-form"
import { Hexagon } from "lucide-react"

export default function Login() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      
      <div className="flex w-full max-w-sm flex-col gap-6 relative z-10">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Hexagon className="size-6" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">KORAVO</span>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
