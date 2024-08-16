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

module.exports = {
    addproductos:[
        //nombre, precio, stock, descripcion, imagen
        body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min:5}).withMessage('el nombre debe contener almenos 5 caracteres'),

        body('precio')
        .notEmpty().withMessage('El precio es requerido')
        .matches(/^\d+\$$/)
        .withMessage('El campo debe contener solo números y terminar con un signo de dólar ($).'),

        body('stock')
        .notEmpty().withMessage('El stock es requerido')
        .matches(/^\d+\$$/)
        .withMessage('El campo debe contener solo números y terminar con un signo de dólar ($).'),
        
        body('descripcion')
        .notEmpty().withMessage('La descripcion es requerida'),

        body('imagen')
        .notEmpty().withMessage('La imagen es requerida'),

        (req, res, next)=>{
            result(req)
            .then(() => {
                next();
            })
            .catch((errors) => {
                console.log(errors);
                var datos = req.body;
                console.log(datos)
                // Mantener los datos del formular});
                const errorMessages = {};
                errors.array().forEach(error => {
                  if (!errorMessages[error.path]) {
                    errorMessages[error.path] = error.msg;
                    console.log(errorMessages);
                  }
                });
                console.log('el error: ',{errors: errorMessages,valores:datos}); 
            });
        }
    ],

    addmarca:[
        body('imagen')
        .notEmpty().withMessage('La imagen es requerida'),

        body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min:4}).withMessage('el nombre debe contener almenos 5 caracteres'),

        body('descripcion')
        .notEmpty().withMessage('La descripcion es requerida'),

        body('tipop')
        .notEmpty().withMessage('El tipo de producto es requerido'),

        (req, res, next)=>{
            result(req)
            .then(() => {
                next();
            })
            .catch((errors) => {
                console.log(errors);
                var datos = req.body;
                console.log(datos)
                // Mantener los datos del formular});
                const errorMessages = {};
                errors.array().forEach(error => {
                  if (!errorMessages[error.path]) {
                    errorMessages[error.path] = error.msg;
                    console.log(errorMessages);
                  }
                });
                res.render('login/marca',{errors: errorMessages,valores:datos}); 
            });
        }
    ]
}