// Removed sentry integration (I don't have sentry)
export function capture(error: Error): void {
  console.error("Captured error:", error);
}
