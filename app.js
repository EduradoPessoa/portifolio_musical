function App() {
    const [user, setUser] = React.useState(null);
    const [songs, setSongs] = React.useState([]);
    const [playlists, setPlaylists] = React.useState([]);
    const [currentSong, setCurrentSong] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showUpload, setShowUpload] = React.useState(false);
    const [editingSong, setEditingSong] = React.useState(null);
    const [metrics, setMetrics] = React.useState({
        totalPlays: 0,
        averageRating: 0,
        totalSongs: 0
    });

    React.useEffect(() => {
        // Inicializa o MusicService
        MusicService.init();
        // Carrega as músicas
        loadSongs();
        // Carrega o usuário do localStorage se existir
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    React.useEffect(() => {
        if (user) {
            // Carrega as playlists do usuário
            const userPlaylists = MusicService.getAllPlaylists(user.id);
            setPlaylists(userPlaylists);
        }
    }, [user]);

    async function loadSongs() {
        try {
            const allSongs = MusicService.getAllSongs();
            setSongs(allSongs);
            
            // Atualiza métricas
            const totalPlays = allSongs.reduce((sum, song) => sum + (song.plays || 0), 0);
            const totalRating = allSongs.reduce((sum, song) => sum + (song.averageRating || 0), 0);
            setMetrics({
                totalPlays,
                averageRating: allSongs.length > 0 ? totalRating / allSongs.length : 0,
                totalSongs: allSongs.length
            });
        } catch (error) {
            console.error('Erro ao carregar músicas:', error);
        }
    }

    function handleSongSelect(song) {
        setCurrentSong(song);
        setIsPlaying(true);
        try {
            MusicService.incrementPlays(song.id);
            loadSongs(); // Recarrega para atualizar contagem de plays
        } catch (error) {
            console.error('Erro ao incrementar plays:', error);
        }
    }

    function handlePlayPause() {
        setIsPlaying(!isPlaying);
    }

    async function handleRatingChange(songId, rating) {
        try {
            await MusicService.updateRating(songId, rating, user.id);
            await loadSongs();
        } catch (error) {
            console.error('Erro ao atualizar classificação:', error);
            throw error;
        }
    }

    async function handleLyricsSave(songId, lyrics) {
        try {
            await MusicService.updateLyrics(songId, lyrics);
            await loadSongs();
        } catch (error) {
            console.error('Erro ao salvar letra:', error);
            throw error;
        }
    }

    async function handleSongEdit(song) {
        try {
            setShowUpload(true);
            setEditingSong(song);
        } catch (error) {
            console.error('Erro ao editar música:', error);
            throw error;
        }
    }

    async function handleSongDelete(songId) {
        if (!window.confirm('Tem certeza que deseja excluir esta música?')) return;
        
        try {
            await MusicService.deleteSong(songId);
            if (currentSong && currentSong.id === songId) {
                setCurrentSong(null);
                setIsPlaying(false);
            }
            await loadSongs();
        } catch (error) {
            console.error('Erro ao deletar música:', error);
            throw error;
        }
    }

    async function handleSongUpload(songData) {
        try {
            if (editingSong) {
                await MusicService.updateSong(editingSong.id, {
                    ...editingSong,
                    ...songData
                });
                setEditingSong(null);
            } else {
                await MusicService.addSong(songData);
            }
            await loadSongs();
            setShowUpload(false);
        } catch (error) {
            console.error('Erro ao salvar música:', error);
            throw error;
        }
    }

    async function handleCreatePlaylist(name) {
        try {
            const newPlaylist = await MusicService.createPlaylist(name, user.id);
            setPlaylists([...playlists, newPlaylist]);
        } catch (error) {
            console.error('Erro ao criar playlist:', error);
            throw error;
        }
    }

    async function handleAddToPlaylist(playlistId, songId) {
        try {
            await MusicService.addToPlaylist(playlistId, songId);
            const updatedPlaylists = await MusicService.getAllPlaylists(user.id);
            setPlaylists(updatedPlaylists);
        } catch (error) {
            console.error('Erro ao adicionar música à playlist:', error);
            throw error;
        }
    }

    async function handleToggleFavorite(songId) {
        try {
            await MusicService.toggleFavorite(songId, user.id);
            // Força atualização do estado para re-renderizar
            setSongs([...songs]);
        } catch (error) {
            console.error('Erro ao favoritar música:', error);
            throw error;
        }
    }

    function handleLogin(credentials) {
        const mockUser = {
            id: Date.now().toString(),
            name: credentials.email,
            email: credentials.email,
            isAdmin: credentials.email.includes('admin')
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    }

    function handleLogout() {
        setUser(null);
        localStorage.removeItem('user');
        setPlaylists([]);
    }

    function getUserRating(songId) {
        return MusicService.getRating(songId, user?.id);
    }

    function isSongFavorite(songId) {
        return MusicService.isFavorite(songId, user?.id);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Header user={user} onLogout={handleLogout} />
            
            <main className="container mx-auto px-4 py-8">
                {!user ? (
                    <UserAuth onLogin={handleLogin} />
                ) : (
                    <div className="space-y-8">
                        {currentSong && (
                            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                                <MusicPlayer
                                    currentSong={currentSong}
                                    isPlaying={isPlaying}
                                    onPlayPause={handlePlayPause}
                                />
                            </div>
                        )}

                        {user.isAdmin && (
                            <div className="mb-8">
                                <button
                                    onClick={() => {
                                        setShowUpload(true);
                                        setEditingSong(null);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Adicionar Música
                                </button>
                            </div>
                        )}

                        {showUpload && (
                            <SongUpload
                                onSongUpload={handleSongUpload}
                                onClose={() => {
                                    setShowUpload(false);
                                    setEditingSong(null);
                                }}
                                editingSong={editingSong}
                            />
                        )}
                        
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                            <Dashboard metrics={metrics} />
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Top Músicas</h2>
                            <TopSongs
                                songs={songs}
                                onPlay={handleSongSelect}
                                onRatingChange={handleRatingChange}
                                isAdmin={user.isAdmin}
                                onLyricsSave={handleLyricsSave}
                                onEdit={handleSongEdit}
                                onDelete={handleSongDelete}
                                onAddToPlaylist={handleAddToPlaylist}
                                onToggleFavorite={handleToggleFavorite}
                                playlists={playlists}
                                onCreatePlaylist={handleCreatePlaylist}
                                getUserRating={getUserRating}
                                isFavorite={isSongFavorite}
                            />
                        </section>

                        <section className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Todas as Músicas</h2>
                            <SongList
                                songs={songs}
                                onPlay={handleSongSelect}
                                onRatingChange={handleRatingChange}
                                isAdmin={user.isAdmin}
                                onLyricsSave={handleLyricsSave}
                                onEdit={handleSongEdit}
                                onDelete={handleSongDelete}
                                onAddToPlaylist={handleAddToPlaylist}
                                onToggleFavorite={handleToggleFavorite}
                                playlists={playlists}
                                onCreatePlaylist={handleCreatePlaylist}
                                getUserRating={getUserRating}
                                isFavorite={isSongFavorite}
                            />
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
