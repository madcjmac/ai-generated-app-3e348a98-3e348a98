import FeaturedTracks from '@/components/featured-tracks'
import RecentTracks from '@/components/recent-tracks'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Welcome to MP3 Player</h1>
        <Button asChild>
          <Link href="/library">
            <Upload className="mr-2 h-4 w-4" />
            Upload Music
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <FeaturedTracks />
        <RecentTracks />
      </div>
    </div>
  )
}