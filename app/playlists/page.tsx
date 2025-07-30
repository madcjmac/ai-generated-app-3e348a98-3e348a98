'use client'

import PlaylistGrid from '@/components/playlist-grid'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { PlusCircle } from 'lucide-react'

export default function Playlists() {
  const { createPlaylist } = useStore()

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Playlists</h1>
        <Button onClick={() => createPlaylist()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Playlist
        </Button>
      </div>

      <PlaylistGrid />
    </div>
  )
}