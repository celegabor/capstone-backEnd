const validateVideo = (req, res, next) =>{
    const errors = []

    const {title, categoryWork, video, content, author} = req.body

    if(typeof title !== 'string'){
        errors.push('title must be a string')
    }
    if(typeof categoryWork !== 'string'){
        errors.push('category must be a string')
    }
    if(typeof video !== 'string'){
        errors.push('link video must be a string')
    }
    if(typeof content !== 'string'){
        errors.push('content must be a string')
    }
    if(typeof author !== 'string'){
        errors.push('author must be a string')
    }
    if(errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }
    
}

module.exports = validateVideo