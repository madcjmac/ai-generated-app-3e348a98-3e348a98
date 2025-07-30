'use client'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { Upload } from 'lucide-react'
import { useRef } from 'react'
import TrackList from '@/components/track-list'

export default function Library() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { addTracks } = useStore()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    await addTracks(files)
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Library</h1>
        <Button onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload MP3s
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".mp3"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      <TrackList />
    </div>
  )
}