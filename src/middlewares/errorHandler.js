

"use strict";


module.exports = (err,req,res,next) => {
    
    let statusCode = err.statusCode || res.statusCodeManual || (res.statusCode === 200 ? null : res.statusCode ) || 500;

    if(err.message.toLowerCase().includes('validation')){
        statusCode = 400;
    }
    res.status(statusCode).json({
        error:true,
        message:err.message,
        cause:err.cause,
    })
}