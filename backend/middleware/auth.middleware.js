import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


export const authUser = async (req, res, next) => {
    try {
        console.log("request header", req.headers);
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }
        
        console.log("token",token);
        const isBlackListed = await redisClient.get(token);
        console.log("isBlacklisted", isBlackListed)
        if (isBlackListed==='logout') {
            req.headers.authorization = ''
            req.user = ''
            res.cookie('token', '');
            // console.log(req.user, req.headers, req);
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded", decoded)
        req.user = decoded;
        console.log("user", req.user)
        next();
    } catch (error) {

        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}