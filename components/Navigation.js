function Navigation({ currentPage, onNavigate, isAdmin }) {
    try {
        const navItems = [
            { id: 'music', label: 'Músicas', icon: 'music-note' },
            { id: 'biography', label: 'Biografia', icon: 'user' },
            { id: 'shows', label: 'Shows', icon: 'ticket' },
            { id: 'supporter', label: 'Apoie', icon: 'heart' }
        ];

        return (
            <nav data-name="main-navigation" className="bg-white shadow-sm mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center space-x-8">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                data-name={`nav-${item.id}`}
                                onClick={() => onNavigate(item.id)}
                                className={`py-4 px-2 border-b-2 transition-colors ${
                                    currentPage === item.id
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
