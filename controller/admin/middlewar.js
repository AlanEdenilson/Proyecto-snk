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
    
}