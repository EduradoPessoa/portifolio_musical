function AuthService() {
    const MOCK_USERS = [
        {
            id: 1,
            username: 'Dudu Pessoa',
            email: 'admin@admin.com',
            password: 'Admin', // Em produção, usar hash
            isAdmin: true
        }
    ];

    async function loginUser({ email, password }) {
        try {
            // Em produção, isso seria uma chamada real à API com hash da senha
            const user = MOCK_USERS.find(u => 
                u.email === email && u.password === password
            );
            
            if (!user) {
                throw new Error('Credenciais inválidas');
            }

            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error(error.message || 'Erro ao fazer login');
        }
    }

    async function registerUser({ username, password, email }) {
        try {
            // Em produção, isso seria uma chamada real à API
            if (MOCK_USERS.some(u => u.email === email)) {
                throw new Error('Email já cadastrado');
            }

            const newUser = {
                id: MOCK_USERS.length + 1,
                username,
                email,
                password, // Em produção, usar hash
                isAdmin: email === 'admin@admin.com'
            };

            MOCK_USERS.push(newUser);

            const { password: _, ...userWithoutPassword } = newUser;
            return userWithoutPassword;
        } catch (error) {
            console.error('Erro no registro:', error);
            throw new Error(error.message || 'Erro ao registrar usuário');
        }
    }

    async function validateToken() {
        try {
            // Em produção, isso validaria o token JWT com o backend
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                throw new Error('Não autenticado');
            }
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Erro na validação do token:', error);
            throw new Error('Sessão inválida');
        }
    }

    return {
        loginUser,
        registerUser,
        validateToken
    };
}
