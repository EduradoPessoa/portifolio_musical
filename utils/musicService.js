const MusicService = {
    init() {
        if (!localStorage.getItem('songs')) {
            localStorage.setItem('songs', '[]');
        }
        if (!localStorage.getItem('playlists')) {
            localStorage.setItem('playlists', '[]');
        }
        if (!localStorage.getItem('ratings')) {
            localStorage.setItem('ratings', '{}');
        }
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', '{}');
        }
    },

    getAllSongs() {
        return JSON.parse(localStorage.getItem('songs'));
    },

    addSong(song) {
        const songs = this.getAllSongs();
        const newSong = {
            ...song,
            id: Date.now().toString(),
            plays: 0,
            ratings: {},
            averageRating: 0
        };
        songs.push(newSong);
        localStorage.setItem('songs', JSON.stringify(songs));
        return newSong;
    },

    updateSong(songId, updatedSong) {
        const songs = this.getAllSongs();
        const index = songs.findIndex(s => s.id === songId);
        if (index === -1) throw new Error('Música não encontrada');
        
        songs[index] = { ...songs[index], ...updatedSong };
        localStorage.setItem('songs', JSON.stringify(songs));
        return songs[index];
    },

    deleteSong(songId) {
        const songs = this.getAllSongs();
        const newSongs = songs.filter(s => s.id !== songId);
        localStorage.setItem('songs', JSON.stringify(newSongs));
    },

    incrementPlays(songId) {
        const songs = this.getAllSongs();
        const song = songs.find(s => s.id === songId);
        if (!song) throw new Error('Música não encontrada');
        
        song.plays = (song.plays || 0) + 1;
        localStorage.setItem('songs', JSON.stringify(songs));
        return song;
    },

    updateRating(songId, rating, userId) {
        const songs = this.getAllSongs();
        const song = songs.find(s => s.id === songId);
        if (!song) throw new Error('Música não encontrada');
        
        if (!song.ratings) song.ratings = {};
        song.ratings[userId] = rating;
        
        const ratings = Object.values(song.ratings);
        song.averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        
        localStorage.setItem('songs', JSON.stringify(songs));
        return song;
    },

    getRating(songId, userId) {
        if (!userId) return 0;
        const songs = this.getAllSongs();
        const song = songs.find(s => s.id === songId);
        if (!song || !song.ratings) return 0;
        return song.ratings[userId] || 0;
    },

    updateLyrics(songId, lyrics) {
        const songs = this.getAllSongs();
        const song = songs.find(s => s.id === songId);
        if (!song) throw new Error('Música não encontrada');
        
        song.lyrics = lyrics;
        localStorage.setItem('songs', JSON.stringify(songs));
        return song;
    },

    getAllPlaylists(userId) {
        const playlists = JSON.parse(localStorage.getItem('playlists'));
        return playlists.filter(p => p.userId === userId);
    },

    createPlaylist(name, userId) {
        const playlists = JSON.parse(localStorage.getItem('playlists'));
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            userId,
            songs: []
        };
        playlists.push(newPlaylist);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        return newPlaylist;
    },

    addToPlaylist(playlistId, songId) {
        const playlists = JSON.parse(localStorage.getItem('playlists'));
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist) throw new Error('Playlist não encontrada');
        
        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            localStorage.setItem('playlists', JSON.stringify(playlists));
        }
        return playlist;
    },

    removeFromPlaylist(playlistId, songId) {
        const playlists = JSON.parse(localStorage.getItem('playlists'));
        const playlist = playlists.find(p => p.id === playlistId);
        if (!playlist) throw new Error('Playlist não encontrada');
        
        playlist.songs = playlist.songs.filter(id => id !== songId);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        return playlist;
    },

    toggleFavorite(songId, userId) {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (!favorites[userId]) favorites[userId] = [];
        
        const index = favorites[userId].indexOf(songId);
        if (index === -1) {
            favorites[userId].push(songId);
        } else {
            favorites[userId].splice(index, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return favorites[userId];
    },

    isFavorite(songId, userId) {
        if (!userId) return false;
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        return favorites[userId] && favorites[userId].includes(songId) ? true : false;
    }
};
