interface Props {
  tint?: "light" | "dark";
}

export function StatusBar({ tint = "dark" }: Props) {
  const color = tint === "dark" ? "text-ink" : "text-white";
  return (
    <div className={`flex items-center justify-between px-7 pt-3 pb-1 text-[13px] font-semibold ${color}`}>
      <span className="font-display">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="size-3.5" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg viewBox="0 0 16 12" className="size-3.5" fill="currentColor">
          <path d="M8 2.5c2 0 3.8.7 5.2 2L14.5 3c-1.7-1.6-4-2.5-6.5-2.5S3.2 1.4 1.5 3l1.3 1.5C4.2 3.2 6 2.5 8 2.5zM8 6c1 0 2 .4 2.7 1.1l1.3-1.4C10.9 4.6 9.5 4 8 4s-2.9.6-4 1.7l1.3 1.4C6 6.4 7 6 8 6zm0 3.5c.5 0 1 .2 1.3.6L8 11.5 6.7 10c.4-.4.8-.6 1.3-.6z" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 border rounded-[3px] flex items-center p-[1px]" style={{ borderColor: "currentColor" }}>
            <div className="h-full w-[80%] rounded-[1.5px] bg-current" />
          </div>
        </div>
      </div>
    </div>
  );
}
