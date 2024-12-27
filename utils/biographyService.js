function BiographyService() {
    const MOCK_BIOGRAPHY = {
        title: "Dudu Pessoa",
        content: `Dudu Pessoa é um talentoso músico brasileiro, conhecido por sua versatilidade e criatividade musical. 
        Com mais de uma década de experiência, ele tem se destacado no cenário musical com suas composições originais 
        e interpretações únicas.

        Iniciou sua jornada musical ainda jovem, estudando diversos instrumentos e desenvolvendo sua própria 
        linguagem musical. Ao longo dos anos, colaborou com diversos artistas e bandas, enriquecendo seu 
        repertório e experiência.

        Seu estilo musical único combina elementos de MPB, rock, jazz e música regional brasileira, 
        criando uma sonoridade rica e distintiva que tem conquistado fãs por todo o país.`,
        imageUrl: "https://picsum.photos/800/600",
        socialLinks: {
            instagram: "https://instagram.com/dudupessoa",
            youtube: "https://youtube.com/@dudupessoa",
            spotify: "https://open.spotify.com/artist/dudupessoa"
        }
    };
    
    async function getBiography() {
        try {
            return Promise.resolve(MOCK_BIOGRAPHY);
        } catch (error) {
            console.error('Erro ao buscar biografia:', error);
            return null;
        }
    }

    async function updateBiography(biographyData) {
        try {
            // Em um ambiente real, aqui faríamos uma chamada à API
            // Por enquanto, apenas simulamos o sucesso da operação
            Object.assign(MOCK_BIOGRAPHY, biographyData);
            return Promise.resolve(MOCK_BIOGRAPHY);
        } catch (error) {
            console.error('Erro ao atualizar biografia:', error);
            throw error;
        }
    }

    return {
        getBiography,
        updateBiography
    };
}
