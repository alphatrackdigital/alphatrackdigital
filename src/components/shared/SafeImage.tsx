import { useState } from "react";
import type { ImgHTMLAttributes, ReactNode } from "react";
import { BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fallbackClassName?: string;
  icon?: ReactNode;
}

const SafeImage = ({
  alt,
  className,
  wrapperClassName,
  fallbackClassName,
  icon,
  loading = "lazy",
  decoding = "async",
  onError,
  onLoad,
  ...props
}: SafeImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10",
          wrapperClassName,
          fallbackClassName,
        )}
        aria-hidden="true"
      >
        {icon ?? <BarChart3 className="h-8 w-8 text-primary/30" />}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-card" aria-hidden="true" />}
      <img
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        decoding={decoding}
        loading={loading}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        {...props}
      />
    </div>
  );
};

export default SafeImage;
