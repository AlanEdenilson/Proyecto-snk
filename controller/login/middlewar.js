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
            .notEmpty().withMessage('El campo  no puede estar vacío')
            .isLength({ min:3}).withMessage('el usuario debe contener almenos 5 caracteres'),
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
                  // Mantener los datos del formular});
                  const errorMessages = {};
                  errors.array().forEach(error => {
                    if (!errorMessages[error.path]) {
                      errorMessages[error.path] = error.msg;
                      console.log(errorMessages);
                    }
                  });
                  res.render('login/inicio',{errors: errorMessages,}); 
              });
            }
        ],
        //verificando credenciales de admin
    Sanitisacionadmin:[
        body('username')
            .notEmpty().withMessage('El campo  no puede estar vacío'),
            //.isLength({ min:6}).withMessage('el usuario dbe contener minino 6 cararcteres'),
            //.isLength({ max: 10 }).withMessage('El nombre de usuario no puede tener más de 10 caracteres'),
            body('username').custom(async value => {
                
                const user = await controller.findUser(value);
              if (user) {
                throw new Error('El usuario ya esta en uso');
              }

                return true; // Usuario no existe, lo cual es lo que queremos
    
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
        body('email').custom(async value => {
              const email = await controller.findByEmail(value);
              if (email) {
                throw new Error('A user already exists with this e-mail address');
              }
              return true;
            }),
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
                        res.render('login/admin',{errors: errorMessages,valores:datos}); 
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
                    throw new Error('El usuario ya esta en uso');
                  }
                
                  
                    return true; // Usuario no existe, lo cual es lo que queremos
                  
                  // Re-lanza otros errores
                
              }),
        body('email')
            .notEmpty().withMessage('El campo  no puede estar vacío')
            .isEmail().withMessage('El email no es válido')
            .custom(value => {
                if (!value.endsWith('@gmail.com')) {
                  throw new Error('Solo se permiten direcciones de Gmail');
                }
                return true;
              }),
        body('email').custom(async value => {
                const email = await controller.findByEmail(value);
                if (email) {
                  throw new Error('A user already exists with this e-mail address');
                }
                return true;
              }),
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
                    var datos = req.body;
                    // Mantener los datos del formular});
                    const errorMessages = {};
                    errors.array().forEach(error => {
                      if (!errorMessages[error.path]) {
                        errorMessages[error.path] = error.msg;
                        console.log(errorMessages);
                      }
                    });
                    res.render('login/repartidor',{errors: errorMessages,valores:datos}); 
                });
            }
    ],

    verificarcorreo:[
    
    body('email')
        .notEmpty().withMessage('El campo  no puede estar vacío')
        .isEmail().withMessage('El email no es válido')
        .custom(value => {
            if (!value.endsWith('@gmail.com') ||!value.endsWith('@clases.edu.sv')) {
              throw new Error('Solo se permiten direcciones de Gmail');
            }
            return true;
          }),
        body('email').custom(async value => {
                const email = await controller.findByEmail(value);
                if (email) {
                  return true;
                }
                else {
                  throw new Error('correo invalido');

                }
               
                
              }),
              (req, res, next)=>{
                result(req)
                .then(() => {
                    next();
                })
                .catch((errors) => {
                  console.log(errors);
                  const errorMessages = {};
                  errors.array().forEach(error => {
                    if (!errorMessages[error.path]) {
                      errorMessages[error.path] = error.msg;
                      console.log(errorMessages);
                    }
                  });
                  res.render('login/recuperar_contraseña',{errors:errorMessages}); 
                  }
                );
              }
    ]
   
}//fin 
