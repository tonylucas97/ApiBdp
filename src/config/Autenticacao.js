var jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.body.token || req.params.token || req.query.token || req.header('Authorization');
        if(token){
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            next();
        }else{
            res.json({message:'Token nao informado',success:false});
        }
    } catch (error) {
        res.json({message:error.message,success:false})
    }
}