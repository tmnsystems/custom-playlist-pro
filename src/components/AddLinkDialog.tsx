import { useState, useEffect } from 'react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { createVideoFromUrl } from '@/lib/video-extractor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const PLATFORM_LABELS: Record<string, string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  brightcove: 'Brightcove',
  spotify: 'Spotify',
  'apple-music': 'Apple Music',
  soundcloud: 'SoundCloud',
  rumble: 'Rumble',
  unknown: 'Unknown',
};

const PLATFORM_COLORS: Record<string, string> = {
  youtube: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  spotify: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'apple-music': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  soundcloud: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  vimeo: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  rumble: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  brightcove: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
  unknown: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLinkDialog({ open, onOpenChange }: AddLinkDialogProps) {
  const { playlists, currentPlaylist, createPlaylist, addVideoToPlaylist, setCurrentPlaylist } = usePlaylist();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  // Detect platform live as user types
  useEffect(() => {
    if (!url.trim()) {
      setDetectedPlatform(null);
      return;
    }
    try {
      const video = createVideoFromUrl(url);
      setDetectedPlatform(video.platform);
    } catch {
      setDetectedPlatform(null);
    }
  }, [url]);

  // Default selected playlist to current
  useEffect(() => {
    if (open) {
      setSelectedPlaylistId(currentPlaylist?.id || (playlists[0]?.id ?? ''));
    }
  }, [open, currentPlaylist, playlists]);

  const hasPlaylists = playlists.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) return;

    const video = createVideoFromUrl(cleanUrl, title);

    if (hasPlaylists) {
      const targetId = selectedPlaylistId || playlists[0].id;
      addVideoToPlaylist(targetId, video);
      const targetPlaylist = playlists.find(p => p.id === targetId);
      toast.success(`Added to "${targetPlaylist?.name}"`);
    } else {
      const name = playlistName.trim() || 'My Playlist';
      const newPlaylist = createPlaylist(name, [video]);
      setCurrentPlaylist(newPlaylist);
      toast.success(`Created "${name}" with 1 item`);
    }

    setUrl('');
    setTitle('');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Link</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* URL input */}
          <div className="space-y-1.5">
            <Label htmlFor="link-url">URL</Label>
            <div className="relative">
              <Input
                id="link-url"
                type="url"
                placeholder="Paste a link from Spotify, YouTube, Apple Music…"
                value={url}
                onChange={e => setUrl(e.target.value)}
                autoFocus
                className="pr-28"
              />
              {detectedPlatform && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${PLATFORM_COLORS[detectedPlatform] ?? PLATFORM_COLORS.unknown}`}
                  >
                    {PLATFORM_LABELS[detectedPlatform] ?? detectedPlatform}
                  </Badge>
                </span>
              )}
            </div>
          </div>

          {/* Optional title */}
          <div className="space-y-1.5">
            <Label htmlFor="link-title">
              Title <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="link-title"
              placeholder="Auto-titled if blank"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Playlist selector or new playlist name */}
          {hasPlaylists ? (
            <div className="space-y-1.5">
              <Label>Add to playlist</Label>
              <Select value={selectedPlaylistId} onValueChange={setSelectedPlaylistId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a playlist" />
                </SelectTrigger>
                <SelectContent>
                  {playlists.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.videos.length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="playlist-name">Playlist name</Label>
              <Input
                id="playlist-name"
                placeholder="My Playlist"
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!url.trim()}>
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
