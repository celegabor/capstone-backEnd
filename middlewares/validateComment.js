const validateComment = (req, res, next) =>{
    const errors = []

    const { comment, author } = req.body

    if(typeof comment !== 'string'){
        errors.push('comment must be a string')
    }

    if(errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }

}

module.exports = validateComment