const { body,validationResult } = require('express-validator')
const controller = require('../login/index')

const result = (req)=>{
    return new Promise((resolve, reject) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            reject(errors);
        } else {
            resolve();
        }
        
    });
   
}

module.exports={
    validar:[
        body('username')
            .exists()
            .isLength({ min:3}).withMessage('Usuario no valido'),
        body('password')
            .exists()
            .isLength({ min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
            (req,res,next)=>{
                result(req)
                .then(() => {
                    next();
                })
                .catch((errors) => {
                    console.log(errors);
                    var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/inicio',{validaciones:validaciones,valores:valores});
                });
            }
        ],
        //verificando credenciales de admin
    Sanitisacionadmin:[
        body('username')
            .exists()
            .isLength({ min:6}).withMessage('Usuario no valido '),
        body('email')
            .exists()
            .isEmail()
            .withMessage('El email no es válido')
            .normalizeEmail(),
        body('password').isLength({ min:8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
        body('confirm-password').custom((value, { req }) => {
              return value === req.body.password;
            }).withMessage("La contraseña y la confirmación de contraseña no coinciden"),
            (req,res,next)=>{
                result(req)
                .then(() => {
                    next();
                })
                .catch((errors) => {
                    console.log(errors);
                    var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/admin',{validaciones:validaciones,valores:valores});
                    /*var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/inicio',{validaciones:validaciones,valores:valores});*/
                });
            }
        
    ],
    sanitacionrepartidor:[
        body('username')
            .notEmpty().withMessage('El campo  no puede estar vacío'),
            //.isLength({ min:6}).withMessage('el usuario dbe contener minino 6 cararcteres'),
            //.isLength({ max: 10 }).withMessage('El nombre de usuario no puede tener más de 10 caracteres'),
        body('username').custom(async value => {
                const user = await controller.findUser(value);
                if (user) {
                    throw new Error('El usuario ya esta en uso ');
                }

            }),
        body('email')
            .notEmpty().withMessage('El campo  no puede estar vacío')
            .isEmail().withMessage('El email no es válido')
            .custom(value => {
                if (!value.endsWith('@gmail.com')) {
                  throw new Error('Solo se permiten direcciones de Gmail');
                }
                return true;
              })
            .normalizeEmail(),
        body('Id')
            .notEmpty().withMessage('El campo  no puede estar vacío')
            .isInt().withMessage('El id no es válido'),
        body('password')
        .notEmpty().withMessage('El campo  no puede estar vacío')
        .isLength({ min:8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),
        body('confirm_password').custom((value, { req }) => {
              return value === req.body.password;
            }).withMessage("La contraseña y la confirmación de contraseña no coinciden"),
            (req, res, next)=>{
                result(req)
                .then(() => {
                    next();
                })
                .catch((errors) => {
                    console.log(errors);
                    /*var validaciones = errors.array()
                    res.render('login/repartidor', { validaciones: { firstError: errors.array()[0] }});*/
                    
                    // Mantener los datos del formular});
                    const errorMessages = {};
                    errors.array().forEach(error => {
                      if (!errorMessages[error.path]) {
                        errorMessages[error.path] = error.msg;
                        console.log(errorMessages);
                      }
                    });
                    res.render('login/repartidor',{errors: errorMessages}); 
                });
            }
    ]
   
}
