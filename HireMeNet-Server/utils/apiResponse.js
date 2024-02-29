class ApiResponse{
    constructor(statusCode, data, message="success"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400 // success status range (100-399)
    }
}

export {ApiResponse}