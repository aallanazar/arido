import React, { useState, useRef } from 'react';

export const VideoStudio: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white dark:bg-ink-900 p-6 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm transition-colors duration-200">
        <h2 className="text-xl font-bold font-serif mb-4 text-ink-900 dark:text-white">Video Bearbeiten</h2>
        {!videoSrc && (
          <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl p-12 flex flex-col items-center justify-center text-ink-500 dark:text-ink-400 bg-ink-50 dark:bg-ink-800/50">
             <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4 text-sm" />
             <p>Laden Sie ein Video hoch, um zu beginnen</p>
          </div>
        )}

        {videoSrc && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-black rounded-lg overflow-hidden flex items-center justify-center bg-ink-900 min-h-[400px]">
              <video 
                ref={videoRef}
                src={videoSrc} 
                controls 
                className="max-h-[500px] w-full"
              />
            </div>
            
            <div className="w-full lg:w-80 flex flex-col gap-6">
              {/* Speed Control */}
              <div className="bg-ink-50 dark:bg-ink-800 p-4 rounded-lg">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">Geschwindigkeit</label>
                <div className="flex gap-2">
                  <button onClick={() => changeSpeed(0.5)} className={`flex-1 py-1 px-2 rounded border transition-colors ${playbackRate === 0.5 ? 'bg-ink-800 text-white border-transparent' : 'bg-white dark:bg-ink-900 dark:text-ink-200 border-ink-300 dark:border-ink-700'}`}>0.5x</button>
                  <button onClick={() => changeSpeed(1)} className={`flex-1 py-1 px-2 rounded border transition-colors ${playbackRate === 1 ? 'bg-ink-800 text-white border-transparent' : 'bg-white dark:bg-ink-900 dark:text-ink-200 border-ink-300 dark:border-ink-700'}`}>1x</button>
                  <button onClick={() => changeSpeed(1.5)} className={`flex-1 py-1 px-2 rounded border transition-colors ${playbackRate === 1.5 ? 'bg-ink-800 text-white border-transparent' : 'bg-white dark:bg-ink-900 dark:text-ink-200 border-ink-300 dark:border-ink-700'}`}>1.5x</button>
                  <button onClick={() => changeSpeed(2)} className={`flex-1 py-1 px-2 rounded border transition-colors ${playbackRate === 2 ? 'bg-ink-800 text-white border-transparent' : 'bg-white dark:bg-ink-900 dark:text-ink-200 border-ink-300 dark:border-ink-700'}`}>2x</button>
                </div>
              </div>

              {/* Volume Control */}
              <div className="bg-ink-50 dark:bg-ink-800 p-4 rounded-lg">
                 <div className="flex justify-between mb-2">
                   <label className="text-sm font-bold text-ink-700 dark:text-ink-300">Tonstärke</label>
                   <span className="text-xs text-ink-500 dark:text-ink-400">{(volume * 100).toFixed(0)}%</span>
                 </div>
                 <input 
                  type="range" 
                  min="0" max="1" step="0.1" 
                  value={volume} 
                  onChange={(e) => handleVolumeChange(Number(e.target.value))} 
                  className="w-full accent-ink-600 dark:accent-ink-400"
                />
                 <div className="mt-2 flex gap-2">
                    <button 
                      onClick={() => handleVolumeChange(0)}
                      className="text-xs px-2 py-1 bg-white dark:bg-ink-900 dark:text-ink-200 border border-ink-300 dark:border-ink-700 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/30"
                    >
                      Ton absetzen (Mute)
                    </button>
                    <button 
                      onClick={() => handleVolumeChange(1)}
                      className="text-xs px-2 py-1 bg-white dark:bg-ink-900 dark:text-ink-200 border border-ink-300 dark:border-ink-700 rounded hover:bg-ink-100 dark:hover:bg-ink-700"
                    >
                      Ton erhöhen
                    </button>
                 </div>
              </div>

              {/* Trim Placeholder */}
              <div className="bg-ink-50 dark:bg-ink-800 p-4 rounded-lg opacity-75">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">Verkürzen (Trim)</label>
                <div className="h-10 bg-white dark:bg-ink-900 border border-ink-300 dark:border-ink-700 rounded relative mb-2">
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-ink-400 dark:bg-ink-600 cursor-ew-resize rounded-l"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-ink-400 dark:bg-ink-600 cursor-ew-resize rounded-r"></div>
                    <div className="absolute left-4 right-4 top-2 bottom-2 bg-ink-100 dark:bg-ink-800"></div>
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400">Schieberegler nutzen um Start/Ende zu setzen.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
