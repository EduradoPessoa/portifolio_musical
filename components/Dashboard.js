function Dashboard({ metrics }) {
    try {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Total de Plays
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {metrics.totalPlays.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Avaliação Média
                    </h3>
                    <p className="text-3xl font-bold text-yellow-500">
                        {metrics.averageRating.toFixed(1)} ★
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Total de Músicas
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                        {metrics.totalSongs}
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
