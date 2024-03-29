import { cn } from "@/src/utils/cn";

export function Footer({ className }) {
  return (
    <div className={cn("p-4 w-full text-center backdrop-blur-md", className)}>
      <p>
        © 2023 <strong>WinnieS</strong>. All rights reserved.
      </p>
    </div>
  );
}
