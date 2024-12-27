function PlaylistModal({ song, onClose, playlists, onCreatePlaylist, onAddToPlaylist }) {
    const [newPlaylistName, setNewPlaylistName] = React.useState('');
    const [selectedPlaylist, setSelectedPlaylist] = React.useState('');
    const [showCreateForm, setShowCreateForm] = React.useState(false);

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;
        
        onCreatePlaylist(newPlaylistName);
        setNewPlaylistName('');
        setShowCreateForm(false);
    };

    const handleAddToPlaylist = () => {
        if (!selectedPlaylist) return;
        onAddToPlaylist(selectedPlaylist, song.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Adicionar à Playlist</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {showCreateForm ? (
                    <form onSubmit={handleCreatePlaylist} className="mb-4">
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Nome da nova playlist"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Criar
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="w-full p-2 text-blue-500 hover:text-blue-600 mb-4"
                    >
                        + Criar Nova Playlist
                    </button>
                )}

                {playlists && playlists.length > 0 && (
                    <div>
                        <select
                            value={selectedPlaylist}
                            onChange={(e) => setSelectedPlaylist(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Selecione uma playlist</option>
                            {playlists.map(playlist => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleAddToPlaylist}
                            disabled={!selectedPlaylist}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            Adicionar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
