"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  fullBleed = false,
  insetBelowHeader = false,
  backdropClassName,
  style,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  /** Full viewport width/height (mobile nav). Avoids 75% drawer and RTL gap strips. */
  fullBleed?: boolean
  /** Start sheet + backdrop below fixed header (`--site-header-height` on documentElement). */
  insetBelowHeader?: boolean
  backdropClassName?: string
}) {
  const headerTop = "var(--site-header-height, 4.75rem)" as const

  const viewportBleedStyle: React.CSSProperties = (() => {
    if (!fullBleed) {
      return side === "bottom"
        ? {
            left: 0,
            right: 0,
            width: "100dvw",
            maxWidth: "100dvw",
            marginInline: 0,
            boxSizing: "border-box",
          }
        : {}
    }
    const common: React.CSSProperties = {
      marginInline: 0,
      boxSizing: "border-box",
    }
    if (side === "left" || side === "right") {
      return {
        ...common,
        left: 0,
        right: 0,
        top: insetBelowHeader ? headerTop : 0,
        bottom: 0,
        width: "auto",
        maxWidth: "none",
        height: "auto",
        maxHeight: "none",
      }
    }
    if (side === "bottom") {
      return {
        ...common,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100dvw",
        maxWidth: "100dvw",
      }
    }
    if (side === "top") {
      return {
        ...common,
        left: 0,
        right: 0,
        top: insetBelowHeader ? headerTop : 0,
        width: "100dvw",
        maxWidth: "100dvw",
      }
    }
    return {}
  })()

  const backdropStyle: React.CSSProperties | undefined =
    insetBelowHeader
      ? {
          top: headerTop,
          right: 0,
          bottom: 0,
          left: 0,
        }
      : undefined

  const mergedStyle =
    side === "bottom" && !fullBleed
      ? { ...style, ...viewportBleedStyle }
      : fullBleed
        ? { ...style, ...viewportBleedStyle }
        : style

  return (
    <SheetPortal>
      <SheetOverlay
        className={cn(
          backdropClassName,
          insetBelowHeader &&
            "!top-[var(--site-header-height,4.75rem)] !right-0 !bottom-0 !left-0",
        )}
        style={backdropStyle}
      />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        data-full-bleed={fullBleed ? true : undefined}
        data-below-header={insetBelowHeader ? true : undefined}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:w-full data-[side=bottom]:max-w-none data-[side=bottom]:min-w-0 data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem]",
          !fullBleed && "data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          fullBleed &&
            "data-[side=left]:w-full data-[side=right]:w-full data-[side=left]:max-w-none data-[side=right]:max-w-none data-[side=top]:max-w-none data-[side=bottom]:max-w-none min-h-0",
          className
        )}
        style={mergedStyle}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="إغلاق"
                className="absolute top-2.5 start-2.5 z-10 size-9 min-h-9 min-w-9 max-w-9 shrink-0 p-0"
              />
            }
          >
            <XIcon className="size-4 shrink-0" aria-hidden />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
