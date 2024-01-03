const jwt =require ('jsonwebtoken')
const { config }=require('dotenv');
config();

 const generateToken = (data, access = true) => {
    const secret = access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REF_TOKEN_SECRET;
    const expiry = access
        ? process.env.ACCESS_TOKEN_EXPIRY
        : process.env.REF_TOKEN_EXPIRY;
    return jwt.sign(data, secret, { expiresIn: parseInt(expiry) });
};

 const verifyToken = (token, access = true) => {
    const secret = access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REF_TOKEN_SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return {
            status: 401,
            message: `Unauthorized: ${err.message}`,
        };
    }
};
module.exports={
    verifyToken,generateToken
}