const { body,validationResult } = require('express-validator')

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
            .exists()
            .isLength({ min:8}).withMessage('Usuario no valido '),
        body('email')
            .exists()
            .isEmail()
            .withMessage('El email no es válido')
            .normalizeEmail(),
        body('Id')
            .exists()
            .isInt().withMessage('El id no es válido'),
        body('password').isLength({ min:8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
        body('confirm-password').custom((value, { req }) => {
              return value === req.body.password;
            }).withMessage("La contraseña y la confirmación de contraseña no coinciden"),
            (req, res, next)=>{
                result(req)
                .then(() => {
                    next();
                })
                .catch((errors) => {
                    console.log(errors);
                    var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/repartidor',{validaciones:validaciones,valores:valores});
                    /*var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/inicio', {validaciones:validaciones, valores:valores});*/
                });
            }
    ]
   
}
