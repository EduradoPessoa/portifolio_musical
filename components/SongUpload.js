function SongUpload({ onSongUpload, onClose, editingSong }) {
    const [title, setTitle] = React.useState(editingSong ? editingSong.title : '');
    const [audioUrl, setAudioUrl] = React.useState(editingSong ? editingSong.audioUrl : '');
    const [coverUrl, setCoverUrl] = React.useState(editingSong ? editingSong.coverUrl : '');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (editingSong) {
            setTitle(editingSong.title);
            setAudioUrl(editingSong.audioUrl);
            setCoverUrl(editingSong.coverUrl);
        }
    }, [editingSong]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !audioUrl.trim()) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            setIsLoading(true);
            const songData = {
                title,
                audioUrl,
                coverUrl: coverUrl || 'https://via.placeholder.com/200',
                lyrics: editingSong ? editingSong.lyrics : ''
            };

            await onSongUpload(songData);
            onClose();
        } catch (error) {
            setError('Erro ao salvar música: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {editingSong ? 'Editar Música' : 'Adicionar Nova Música'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Título *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Nome da música"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            URL do Áudio *
                        </label>
                        <input
                            type="text"
                            value={audioUrl}
                            onChange={(e) => setAudioUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="https://exemplo.com/audio.mp3"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            URL da Capa
                        </label>
                        <input
                            type="text"
                            value={coverUrl}
                            onChange={(e) => setCoverUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="https://exemplo.com/imagem.jpg"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Salvando...' : (editingSong ? 'Salvar Alterações' : 'Adicionar Música')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
