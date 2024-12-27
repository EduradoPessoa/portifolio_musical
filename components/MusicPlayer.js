function MusicPlayer({ currentSong, isPlaying, onPlayPause }) {
    const [error, setError] = React.useState(null);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        if (currentSong) {
            setError(null);
            if (audioRef.current) {
                audioRef.current.src = currentSong.audioUrl;
                audioRef.current.load();
            }
        }
    }, [currentSong]);

    React.useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Erro ao reproduzir áudio:', error);
                        setError('Erro ao carregar áudio. Verifique se o arquivo existe.');
                        onPlayPause(); // Para o player
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setError(null);
        }
    };

    const handleError = () => {
        setError('Erro ao carregar áudio. Verifique se o arquivo existe.');
        onPlayPause(); // Para o player
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!currentSong) return null;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                    {error}
                </div>
            )}
            
            <div className="flex items-center space-x-4">
                <img
                    src={currentSong.coverUrl}
                    alt={currentSong.title}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{currentSong.title}</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            {formatTime(currentTime)}
                        </span>
                        <div className="flex-grow bg-gray-200 h-2 rounded-full">
                            <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{
                                    width: `${(currentTime / duration) * 100}%`
                                }}
                            />
                        </div>
                        <span className="text-sm text-gray-500">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>
                
                <button
                    onClick={onPlayPause}
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={!!error}
                >
                    {isPlaying ? (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    ) : (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    )}
                </button>
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={handleError}
            />
        </div>
    );
}
