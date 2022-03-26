module.exports =(req) =>{
    console.log(req.protocol,"ritik",req.get('host'));
    return req.protocol + '://' + req.get('host') + '/'
}