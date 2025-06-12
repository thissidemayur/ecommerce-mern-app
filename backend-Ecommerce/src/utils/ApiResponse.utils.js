class ApiResponse{
    constructor(code, data ,message="succes"){
        this.statusCode =code,
        this.data=data,
        this.message=message
        this.success = code<400
    }
}
export {ApiResponse}