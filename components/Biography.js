function Biography({ biography, isAdmin, onEdit }) {
    try {
        if (!biography) return null;

        return (
            <div data-name="biography" className="bg-white rounded-lg shadow-md p-8">
                {isAdmin && (
                    <button
                        data-name="edit-biography"
                        onClick={onEdit}
                        className="float-right button-primary mb-4"
                    >
                        Editar Biografia
                    </button>
                )}
                <h2 className="text-3xl font-bold mb-6">{biography.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="prose max-w-none">
                            {biography.description.split('\n').map((paragraph, index) => (
                                <p key={index} className="text-gray-600 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Contato</h3>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="text-gray-600">Email:</span>
                                    <a href={`mailto:${biography.email}`} className="text-blue-500 hover:underline">
                                        {biography.email}
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-gray-600">Telefone:</span>
                                    <a href={`tel:${biography.phone}`} className="text-blue-500 hover:underline">
                                        {biography.phone}
                                    </a>
                                </p>
                                {biography.socialMedia.map((social, index) => (
                                    <p key={index} className="flex items-center gap-2">
                                        <span className="text-gray-600">{social.platform}:</span>
                                        <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {social.handle}
                                        </a>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {biography.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.url}
                                alt={photo.description}
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
