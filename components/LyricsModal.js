function LyricsModal({ song, onClose, isAdmin, onSave }) {
    const [lyrics, setLyrics] = React.useState(song.lyrics || '');
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (song) {
            setLyrics(song.lyrics || '');
            setIsEditing(false);
            setError(null);
        }
    }, [song]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);
            await onSave(song.id, lyrics);
            setIsEditing(false);
        } catch (err) {
            setError('Erro ao salvar letra: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (!song) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        Letra: {song.title}
                    </h2>
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
                    <div className="p-4 bg-red-100 text-red-700 border-b">
                        {error}
                    </div>
                )}

                <div className="p-4 overflow-y-auto flex-1">
                    {isEditing ? (
                        <textarea
                            value={lyrics}
                            onChange={(e) => setLyrics(e.target.value)}
                            className="w-full h-full min-h-[300px] p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Digite a letra da música aqui..."
                        />
                    ) : (
                        lyrics ? (
                            <pre className="whitespace-pre-wrap font-sans text-gray-800">
                                {lyrics}
                            </pre>
                        ) : (
                            <p className="text-gray-500 italic text-center">
                                Letra não disponível para esta música.
                            </p>
                        )
                    )}
                </div>

                {isAdmin && (
                    <div className="p-4 border-t flex justify-end space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => {
                                        setLyrics(song.lyrics || '');
                                        setIsEditing(false);
                                        setError(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    disabled={isSaving}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Salvando...
                                        </>
                                    ) : (
                                        'Salvar'
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {lyrics ? 'Editar Letra' : 'Adicionar Letra'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}
