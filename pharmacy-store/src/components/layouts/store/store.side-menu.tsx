"use client"

import { Branding } from "@/components/custom/branding"
import { Icons } from "@/components/custom/icons"
import { Sheet, SheetContent, SheetTrigger } from "@/components/custom/sheet"
import { StoreSocialMedias } from "@/components/layouts/store"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/config"
import { useState } from "react"
import { Link } from "react-router-dom"

export function StoreSideMenu() {
  const [open, setOpen] = useState<boolean>(false)

  const handleLinkClick = () => {
    setOpen(false)
  }
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-2 hover:bg-cyan-50 dark:hover:bg-violet-900/30 transition-all duration-300 ease-out rounded-lg hover:scale-105 border border-transparent hover:border-violet-200 dark:hover:border-violet-800/50"
        >
          <Icons.menu className="w-5 h-5 text-foreground/80 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors duration-300" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full md:max-w-xl bg-gradient-to-br from-background via-background to-muted/20 border-border/50 backdrop-blur-sm p-0"
        closeButtonClassName="w-6 h-6 md:w-10 md:h-10 text-foreground/80 hover:text-foreground hover:bg-muted/60 dark:hover:bg-gray-700/50 transition-all duration-300 ease-out hover:scale-110 rounded-full"
      >
        {/* Overlay gradient for better dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/90 dark:from-background/98 dark:to-background/95 -z-10" />
        
        <div className="flex flex-col h-full justify-between pl-8 md:pl-20 pr-8 py-12 overflow-y-auto">
          {/* Menu Items */}
          <div className="flex flex-col gap-y-3 mt-16">
            {mainNav.map(({ title, href }, index) => (
              <Link
                key={index}
                to={href}
                onClick={handleLinkClick}
                className="group relative text-lg md:text-2xl font-bold uppercase text-foreground/90 hover:text-violet-600 dark:hover:text-cyan-400 transition-all duration-500 ease-out transform hover:translate-x-3 hover:scale-105 py-2 px-3 rounded-lg"
              >
                <span className="relative z-10">{title}</span>
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-cyan-50 dark:bg-violet-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-md -z-10" />
                {/* Animated underline */}
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-500 dark:bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </Link>
            ))}
          </div>

          {/* Footer Area (No longer fixed, pushes down and supports scrolling) */}
          <div className="mt-12 pt-6 border-t border-border/50">
            <div className="relative mb-3">
              {/* Subtle glow effect for branding in dark mode */}
              <div className="absolute inset-0 bg-cyan-500/5 dark:bg-cyan-400/10 blur-xl rounded-lg opacity-0 dark:opacity-100 transition-opacity duration-500" />
              <Branding className="relative text-xl md:text-3xl text-foreground font-extrabold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text" />
            </div>

            <div className="mb-6 space-y-1 text-muted-foreground/80 dark:text-muted-foreground">
              <p className="text-xs md:text-sm font-medium">
                Nguyễn Quang Huy - 74DCHT21108
              </p>
              <p className="text-xs md:text-sm font-medium">
                <span>74DCHT21108</span> {` / `}
                <Link
                  className="hover:underline hover:text-violet-600 dark:hover:text-cyan-400 transition-all duration-300 ease-out inline-block text-muted-foreground/80 dark:text-muted-foreground"
                  to="mailto:qhuy180105@gmail.com"
                >
                  qhuy180105@gmail.com
                </Link>
              </p>
            </div>

            <div className="transform transition-all duration-300 hover:scale-105">
              <StoreSocialMedias />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
