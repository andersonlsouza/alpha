const jwt = require('jsonwebtoken');
const jwtSecret = 'alphaedtech';

// Middleware para verificar se o usuário está autenticado
const authMiddleware = (req, res, next) => {
    // Capta as informações no cookie do navegador
    const token = req.cookies.token;

    // Verifica se o usuário contém um cookie
    if (!token) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
  
    // Decodica o token para obter informações do usuário
    try {
        const decoded = jwt.verify(token, jwtSecret);
  
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
}

// Middleware para verificar se o usuário é administrador
const isAdmin = (req, res, next) => {
    // Verifica se o usuário tem permissão de administrador
    if (req.user.isAdmin) {
        // Se o usuário for um administrador, permite o acesso à próxima rota/middleware
        next();
    } else {
        // Se o usuário não for um administrador, retorna um erro 403 Forbidden
        // res.status(403).json({ error: 'Não autorizado', isAdmin: false });
        res.json({ isAdmin: false });
    }
};

module.exports = { authMiddleware, isAdmin };