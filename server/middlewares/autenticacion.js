const jwt = require('jsonwebtoken');

//==================
//  Verificar Token
//==================

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
};

//==================
//  Verificar SuperRole o AdminRole
let verificaRoleMaster = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE' || usuario.role == 'SUPER_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}

//==================
//  Verificar ClienteRole
//==================
let verificaCliente_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'CLIENTE_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es cliente'
            }
        });
    }
};

//==================
//  Verificar SocioRole
//==================
let verificaSocio_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'SOCIO_ROLE' || usuario.role == 'SUPER_ROLE' || usuario.role == 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es socio de esta asociación'
            }
        });
    }
};


// ================================
//Verificar Token por URL
// =====
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });
};

module.exports = {
    verificaToken,
    verificaRoleMaster,
    verificaCliente_Role,
    verificaSocio_Role,
    verificaTokenImg
}