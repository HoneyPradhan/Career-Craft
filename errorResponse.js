class ErrorResponse extends Error{    // we are extending the inbuilt class error to an error response class .This class inherits properties and methods of error class
    constructor(message,codeStatus){   //constructor method
        super(message)                 //calls the constructor of the parent class.This sets the error message. 
        this.codeStatus=codeStatus     //This property is used to store the HTTP status code associated with the error.

    }

}
module.exports = ErrorResponse