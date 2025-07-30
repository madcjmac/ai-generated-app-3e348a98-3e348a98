import { create } from 'zustand'
import { openDB } from 'idb'

interface Track {
  id: string
  title: string
  artist?: string
  duration: number
  url: string
}

interface Playlist {
  id: string
  name: string
  tracks: string[]
}

interface PlayerState {
  tracks: Track[]
  playlists: Playlist[]
  currentTrack: Track | null
  isPlaying: boolean
  addTracks: (files: File[]) => Promise<void>
  createPlaylist: () => void
  addToPlaylist: (playlistId: string, trackId: string) => void
  play: (track: Track) => void
  pause: () => void
  next: () => void
}

const DB_NAME = 'mp3-player-db'
const DB_VERSION = 1

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('tracks', { keyPath: 'id' })
      db.createObjectStore('playlists', { keyPath: 'id' })
    },
  })
  return db
}

export const useStore = create<PlayerState>((set, get) => ({
  tracks: [],
  playlists: [],
  currentTrack: null,
  isPlaying: false,

  addTracks: async (files: File[]) => {
    const db = await initDB()
    const newTracks: Track[] = []

    for (const file of files) {
      const id = crypto.randomUUID()
      const url = URL.createObjectURL(file)
      const track: Track = {
        id,
        title: file.name.replace('.mp3', ''),
        duration: 0,
        url,
      }
      await db.put('tracks', track)
      newTracks.push(track)
    }

    set(state => ({ tracks: [...state.tracks, ...newTracks] }))
  },

  createPlaylist: () => {
    const playlist: Playlist = {
      id: crypto.randomUUID(),
      name: 'New Playlist',
      tracks: [],
    }
    set(state => ({ playlists: [...state.playlists, playlist] }))
  },

  addToPlaylist: (playlistId: string, trackId: string) => {
    set(state => ({
      playlists: state.playlists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, trackId] }
          : playlist
      ),
    }))
  },

  play: (track: Track) => {
    set({ currentTrack: track, isPlaying: true })
  },

  pause: () => {
    set({ isPlaying: false })
  },

  next: () => {
    const { tracks, currentTrack } = get()
    if (!currentTrack) return

    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    const nextTrack = tracks[currentIndex + 1]
    if (nextTrack) {
      set({ currentTrack: nextTrack })
    }
  },
}))