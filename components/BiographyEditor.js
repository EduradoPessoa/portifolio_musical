function BiographyEditor({ biography, onSave, onCancel }) {
    const [formData, setFormData] = React.useState(biography || {
        name: '',
        description: '',
        email: '',
        phone: '',
        socialMedia: [],
        photos: []
    });
    const [newPhoto, setNewPhoto] = React.useState(null);

    try {
        function handleSubmit(e) {
            e.preventDefault();
            onSave(formData);
        }

        function handleChange(e) {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        function handlePhotoUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        photos: [...prev.photos, {
                            url: reader.result,
                            description: file.name
                        }]
                    }));
                };
                reader.readAsDataURL(file);
            }
        }

        function handleSocialMediaChange(index, field, value) {
            setFormData(prev => ({
                ...prev,
                socialMedia: prev.socialMedia.map((item, i) => 
                    i === index ? { ...item, [field]: value } : item
                )
            }));
        }

        function addSocialMedia() {
            setFormData(prev => ({
                ...prev,
                socialMedia: [...prev.socialMedia, { platform: '', handle: '', url: '' }]
            }));
        }

        return (
            <div data-name="biography-editor" className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6">Editar Biografia</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="description">
                            Biografia
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Redes Sociais
                        </label>
                        {formData.socialMedia.map((social, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Plataforma"
                                    value={social.platform}
                                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    placeholder="@usuario"
                                    value={social.handle}
                                    onChange={(e) => handleSocialMediaChange(index, 'handle', e.target.value)}
                                    className="input-field"
                                />
                                <input
                                    type="url"
                                    placeholder="URL"
                                    value={social.url}
                                    onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSocialMedia}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            + Adicionar Rede Social
                        </button>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Fotos
                        </label>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {formData.photos.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={photo.url}
                                        alt={photo.description}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                photos: prev.photos.filter((_, i) => i !== index)
                                            }));
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="mb-4"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="button-primary"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
