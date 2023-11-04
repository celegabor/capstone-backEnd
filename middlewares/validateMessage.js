const validateMesssage = (req, res, next) =>{
    const errors = []

    const { from, to, message } = req.body

    if(typeof from !== 'string'){
        errors.push('FROM must be a string')
    }
    if(typeof to !== 'string'){
        errors.push('TO must be a string')
    }
    if(typeof message !== 'string'){
        errors.push('message must be a string')
    }

    if(errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }

}

module.exports = validateMesssage