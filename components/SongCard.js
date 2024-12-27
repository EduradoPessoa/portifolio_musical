function SongCard({ song, onPlay, onRatingChange, isAdmin, onLyricsSave, onEdit, onDelete, onAddToPlaylist, onToggleFavorite, isFavorite, userRating }) {
    const [showLyrics, setShowLyrics] = React.useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = React.useState(false);

    const handleRatingChange = (newRating) => {
        onRatingChange(song.id, newRating);
    };

    const handleLyricsSave = (lyrics) => {
        onLyricsSave(song.id, lyrics);
        setShowLyrics(false);
    };

    const averageRating = song.averageRating ? song.averageRating.toFixed(1) : '0.0';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={song.coverUrl || 'https://via.placeholder.com/200'}
                alt={song.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{song.title}</h3>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onPlay(song)}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => onToggleFavorite(song.id)}
                            className={`text-${isFavorite ? 'red' : 'gray'}-500 hover:text-red-600`}
                        >
                            <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => setShowPlaylistModal(true)}
                            className="text-gray-500 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Sua avaliação:</span>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRatingChange(star)}
                                    className={`text-${star <= userRating ? 'yellow' : 'gray'}-500`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        <span>Média: {averageRating}</span>
                        <span className="mx-2">•</span>
                        <span>{song.plays || 0} plays</span>
                    </div>
                    
                    <button
                        onClick={() => setShowLyrics(true)}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Ver letra
                    </button>
                </div>

                {isAdmin && (
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={() => onEdit(song)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(song.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Excluir
                        </button>
                    </div>
                )}
            </div>

            {showLyrics && (
                <LyricsModal
                    isOpen={showLyrics}
                    onClose={() => setShowLyrics(false)}
                    lyrics={song.lyrics || ''}
                    onSave={handleLyricsSave}
                    isAdmin={isAdmin}
                />
            )}

            {showPlaylistModal && (
                <PlaylistModal
                    song={song}
                    onClose={() => setShowPlaylistModal(false)}
                    onAddToPlaylist={onAddToPlaylist}
                />
            )}
        </div>
    );
}
