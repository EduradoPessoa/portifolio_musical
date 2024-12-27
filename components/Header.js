function Header({ user, onLogout }) {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold text-blue-600">
                            Portfólio Musical
                        </h1>
                        <span className="text-gray-500">Dudu Pessoa</span>
                    </div>
                    
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                                {user.isAdmin ? '👑 ' : ''}
                                {user.email}
                            </span>
                            <button
                                onClick={onLogout}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <span className="text-gray-500">
                            Faça login para começar
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
