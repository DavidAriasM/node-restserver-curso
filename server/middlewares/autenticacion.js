const jwt = require('jsonwebtoken');


//===============
// Verificar Token
//===============

//next : Continua con la ejecución del programa.
//decoded: Payload que contiene al usuario.
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}

//===============
// Middleware Verificar Token
//===============

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}