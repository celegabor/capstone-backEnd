const validateUser = (req, res, next) =>{
    const errors = []

    const {name, lastName, email, dob, address, avatar, password} = req.body

    if(typeof name !== 'string'){
        errors.push('name must be a string')
    }
    if(typeof lastName !== 'string'){
        errors.push('lastName must be a string')
    }
    if(typeof email !== 'string'){
        errors.push('email must be a string')
    }
    if(typeof dob !== 'number'){
        errors.push('dob must be a number')
    }
    if(typeof address !== 'string'){
        errors.push('address must be a string')
    }
    if(typeof avatar !== 'string'){
        errors.push('avatar must be a string')
    }
    if(typeof password !== 'string'){
        errors.push('password must be a string')
    }
    if(errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }
}

module.exports = validateUser