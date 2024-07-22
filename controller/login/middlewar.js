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
                    return res.status(400).json({ errors: errors.array() });
                });
            }
        ],
   
}
