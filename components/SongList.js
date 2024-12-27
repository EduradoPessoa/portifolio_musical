function SongList({ songs, onPlay, onRatingChange, isAdmin, onLyricsSave, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {songs.map(song => (
                <SongCard
                    key={song.id}
                    song={song}
                    onPlay={onPlay}
                    onRatingChange={onRatingChange}
                    isAdmin={isAdmin}
                    onLyricsSave={onLyricsSave}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
