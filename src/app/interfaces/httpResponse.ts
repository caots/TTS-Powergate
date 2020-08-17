export const STATUS_CODE = {
    SUCCESS: 'Success',
    ERROR: 'Error',
    ACCESS_DENIED: 'Access denied',
    UNAUTHORIZED: 'UnAuthorized',
}

export interface IHttpResponse {
    message : string,
    status : string,
    data: any
}