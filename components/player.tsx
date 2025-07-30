'use client'

import { useStore } from '@/lib/store'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Player() {
  const { currentTrack, isPlaying, play, pause } = useStore()
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t glass-morphism">
      <div className="container flex items-center h-24 px-4">
        <div className="w-1/3">
          <div className="font-medium">{currentTrack.title}</div>
          <div className="text-sm text-gray-500">{currentTrack.artist}</div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => isPlaying ? pause() : play(currentTrack)}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button size="icon" variant="ghost">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <Slider
            className="w-[60%]"
            defaultValue={[0]}
            max={100}
            step={1}
          />
        </div>

        <div className="flex items-center gap-2 w-1/3 justify-end">
          <Volume2 className="h-4 w-4" />
          <Slider
            className="w-[100px]"
            defaultValue={[100]}
            max={100}
            step={1}
            onValueChange={([value]) => {
              setVolume(value / 100)
              if (audioRef.current) {
                audioRef.current.volume = value / 100
              }
            }}
          />
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.url}
          autoPlay={isPlaying}
          volume={volume}
        />
      </div>
    </div>
  )
}