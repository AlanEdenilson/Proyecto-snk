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
        body('fullname')
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
                    res.send("hay errores en los campos");
                    /*var valores = req.body
                    var validaciones = errors.array()
                      res.render('login/inicio',{validaciones:validaciones,valores:valores});*/
                });
            }
        
    ]
   
}
