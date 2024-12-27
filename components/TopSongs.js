function TopSongs({ songs, onPlay, onRatingChange, isAdmin, onLyricsSave, onEdit, onDelete }) {
    // Pega as 5 músicas mais tocadas
    const topSongs = [...songs]
        .sort((a, b) => (b.plays || 0) - (a.plays || 0))
        .slice(0, 5);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Top Músicas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {topSongs.map(song => (
                    <div key={song.id} className="transform-none">
                        <SongCard
                            song={song}
                            onPlay={onPlay}
                            onRatingChange={onRatingChange}
                            isAdmin={isAdmin}
                            onLyricsSave={onLyricsSave}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
