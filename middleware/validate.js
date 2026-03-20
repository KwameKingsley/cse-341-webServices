const Joi = require('joi');

const userValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters long'
    }),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address'
    }),
    favoriteColor: Joi.string().alphanum().required(),
    birthday: Joi.date().iso().less('now').required().messages({
        'date.less': 'Birthday cannot be in the future',
        'date.format': 'Birthday must be a valid ISO date (YYYY-MM-DD)'
    }),
    username: Joi.string().alphanum().min(3).max(30).required(),
    phoneNumber: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        'string.pattern.base': 'Phone number must be in the format XXX-XXX-XXXX'
    })
});

const saveUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(422).json({
            success: false,
            errors: errorMessages
        });
    }
    next();
};

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    dueDate: Joi.date().iso().greater('now').required(),
    assignedTo: Joi.string().required(),
    status: Joi.string().valid('To Do', 'In Progress', 'Done').required(),
    category: Joi.string().required()
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


module.exports = { saveUser, validateTask };