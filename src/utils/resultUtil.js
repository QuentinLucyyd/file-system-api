/*-----------------------------------------------------------------*/
/*  HTTP Result Generator returns a JSON response containing the  */
/*  HTTP Code / Status / Origin / Message / Data / Priority.       */
/*-----------------------------------------------------------------*/

exports.generateResult = (res, httpCode, status, origin, message, data) => {
    return res.status(httpCode).json({
        status: status ? status : '',
        origin: origin ? origin :  '',
        data: data ? data : {},
        message : message ? message : '',
    });
};
