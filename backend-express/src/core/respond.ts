import {Response} from "express";

export type responseInfo<T = any> = {
    message?: string,
    ok: boolean,
    statusCode: HTTPStatusCode,
    error?: Error | any,
    serializableBody?: T,
    filePath?: string
}

export const newResponseInfo = (message: string, ok: boolean, statusCode: HTTPStatusCode, error?: Error, serializableBody?: any, filePath?: string): responseInfo<any> => {
    return {
        message: message,
        ok: ok,
        statusCode: statusCode,
        error: error,
        serializableBody: serializableBody,
        filePath: filePath
    }
}

export enum HTTPStatusCode {
    CONTINUE = 100,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 408,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}




export function respond(response: Response, info: responseInfo): void {
    if (info.error) {
        console.log("Terminado con error: " + info.error.message);
        response.status(info.statusCode).json({message: info.message});
        return;
    }

    if (info.serializableBody) {
        console.log("Terminado con JSON: " + info.message);
        response.status(info.statusCode).json({message: info.message, content: info.serializableBody});
        return;
    }

    if (info.filePath) {
        console.log("Terminado con archivo: " +  info.filePath);
        response.status(200).sendFile(info.filePath);
        return;
    }

    console.log("Terminado con mensaje: " + info.message);
    response.status(info.statusCode).json({message: info.message ?? ""});
}



export const defaultBadRequest = (message?: string): responseInfo => {
    return {
        ok: false,
        message: message ?? "",
        statusCode: HTTPStatusCode.BAD_REQUEST,
    }
}

export const defaultNotFound:responseInfo = {
    ok: false,
    message: "No se encontró el recurso solicitado",
    statusCode: HTTPStatusCode.NOT_FOUND
}

export const defaultInternalServerError = (message?: string, error?: Error | any): responseInfo => {
    return {
        ok: false,
        message: message ?? "Hubo un error inesperado",
        statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
        error: error,
    }
}

export const defaultCreated = (message?: string, content?: any): responseInfo<any> => {
    return {
        ok: true,
        message: message ?? "Recurso creado",
        statusCode: HTTPStatusCode.CREATED,
        serializableBody: content
    }
}

export const defaultOk = (message?: string, content?: any): responseInfo<any> => {
    return {
        ok: true,
        message: message ?? "",
        statusCode: HTTPStatusCode.OK,
        serializableBody: content
    }
}

export const defaultWithFile = (path: string): responseInfo => {
    return {
        ok: true,
        statusCode: HTTPStatusCode.OK,
        filePath: path
    }
}