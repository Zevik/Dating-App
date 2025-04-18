import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  open?: boolean
  onClose?: () => void
}

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border border-green-500 bg-green-100 text-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// A simple toast implementation
const toastStore = {
  toasts: [] as { id: number; props: ToastProps }[],
  listeners: [] as ((toasts: { id: number; props: ToastProps }[]) => void)[],
  subscribe(listener: (toasts: { id: number; props: ToastProps }[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  notify(props: ToastProps) {
    const id = Date.now();
    this.toasts.push({ id, props });
    this.listeners.forEach(listener => listener([...this.toasts]));
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      this.dismiss(id);
    }, 5000);
    
    return id;
  },
  dismiss(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.listeners.forEach(listener => listener([...this.toasts]));
  }
};

export function toast(props: ToastProps) {
  return toastStore.notify(props);
}

toast.dismiss = (id: number) => {
  toastStore.dismiss(id);
};

export function Toaster() {
  const [toasts, setToasts] = React.useState<{ id: number; props: ToastProps }[]>([]);
  
  React.useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);
  
  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col p-4 gap-2 max-w-md w-full">
      {toasts.map(({ id, props }) => (
        <div
          key={id}
          className={cn(toastVariants({ variant: props.variant }), props.className)}
        >
          <div className="flex flex-col gap-1">
            {props.title && <div className="font-semibold">{props.title}</div>}
            {props.description && <div className="text-sm opacity-90">{props.description}</div>}
          </div>
          <button
            onClick={() => toast.dismiss(id)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-transparent hover:bg-secondary"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      ))}
    </div>
  );
} 