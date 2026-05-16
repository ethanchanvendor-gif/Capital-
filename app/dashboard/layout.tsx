import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header placeholder - will be replaced with proper header */}
      <header className="border-b border-border bg-card-dark">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
            <span className="font-bold text-foreground">DeFi Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-text-secondary text-sm">User Menu</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar placeholder */}
        <aside className="hidden lg:block w-64 border-r border-border bg-card-dark">
          <nav className="p-6 space-y-2">
            <div className="h-10 bg-border rounded animate-pulse" />
            <div className="h-10 bg-border rounded animate-pulse" />
            <div className="h-10 bg-border rounded animate-pulse" />
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
