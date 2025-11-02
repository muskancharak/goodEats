import Joi from 'joi';


export function validateUser(data) {
    const JoiSchema = Joi.object({

        userName: Joi.string()
            .min(5)
            .max(20),
    
        email: Joi.string()
            .email()
            .trim() // removes spaces at start/end
            
            .custom((value, helpers) => {
                // remove all spaces and convert to lowercase
                const formattedEmail = value.replace(/\s+/g, '').toLowerCase();
                return formattedEmail;
            }),
        
           password: Joi.string()
          .pattern(/^[a-zA-Z0-9]{6,30}$/)
          .required()
          .messages({
            "string.pattern.base": "Password must be 6–30 characters long and contain only letters or numbers."
         }),


        phoneNumber: Joi.string().pattern(/^\d{10}$/),
            

    });

    return JoiSchema.validate(data, { abortEarly: false }); //it will not stop on forst error it will all error 
};
