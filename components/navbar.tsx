import Link from 'next/link'
import { Button } from './ui/button'
import { Home, Library, ListMusic } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b glass-morphism">
      <div className="container flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">MP3 Player</span>
          </Link>
          <nav className="flex gap-6">
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/library">
                <Library className="h-4 w-4 mr-2" />
                Library
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/playlists">
                <ListMusic className="h-4 w-4 mr-2" />
                Playlists
              </Link>
            </Button>
          </nav>
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}