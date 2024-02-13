const generateToken=(data,statusCode,res)=>{
    const token=data.getJwtToken();

    const options={
        expires: new Date(
            Date.now()+process.env.JWT_EXPAIRE *24*60*60*1000
        ),
        httpOnly: true
    }
    
    res.status(statusCode).cookie("token",token,options).json(data)
}

module.exports=generateToken;