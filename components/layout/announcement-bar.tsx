export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center px-4 py-2.5">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.25em]">
          <span className="font-serif italic tracking-normal text-gold">The Bombay Outfit</span>
          <span className="mx-2 opacity-40">|</span>
          🚚 Cash on Delivery Available
          <span className="mx-2 hidden opacity-40 sm:inline">|</span>
          <span className="hidden sm:inline">Fast Nationwide Shipping 💳</span>
          <span className="mx-2 hidden opacity-40 md:inline">|</span>
          <span className="hidden md:inline">
            Code: <span className="text-gold">BOMBAY10</span>
          </span>
        </p>
      </div>
    </div>
  )
}
