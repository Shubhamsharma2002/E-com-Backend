import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    console.log(req.headers)
    const token  = req.headers['authorization'];
   

    if(!token){
        return res.status(401).send('Unauthorized');
    }
    try{
        const payload = jwt.verify(
            token,
            "vuCr6JSa0Uq0km4MLReIoPDvNvCNMeTV"
        );
        req.userId = payload.userId;
    }catch(err){
        return res.status(401).send('Unauthorized')
    }
    next();
}

export default jwtAuth;