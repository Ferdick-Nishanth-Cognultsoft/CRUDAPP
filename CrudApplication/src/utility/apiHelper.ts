import { IAPIError } from './../models/IApiError';
import { AxiosResponse } from 'axios';
import { ErrorConstants } from '../constants/ErrorConstants';
import { instance } from './axiosInstance';

export function parseApiResponse<T>(
    apiCall: Promise<AxiosResponse<any>>,
    resolve: (value: AxiosResponse<T> | PromiseLike<AxiosResponse<T>>) => void,
    reject: any
) {
    apiCall
        .then((res) => {
            return res
        })
        .then((body) => {
            if (body.status === 200 || body.status === 202) {
                resolve(body)
            } else {
                const unhandledError: IAPIError = {
                    code: ErrorConstants.UnhandledError.Code,
                    message: ErrorConstants.UnhandledError.Message,
                }
                reject('error')
            }
        })
        .catch((err) => {
            reject(err)
        })
}

export async function
    useFetch<T>(
        requestUrl: string,
): Promise<AxiosResponse<T>> {

    var promise = instance.get(requestUrl, {
        headers: {
            Authorization: 'Bearer '
        },
    })

    return new Promise<AxiosResponse<T>>((resolve1, reject1) => {
        parseApiResponse(promise, resolve1, reject1)
    })
}

export async function usePost<T>(
    requestUrl: string,
    requestData: any,
): Promise<AxiosResponse<T>> {
    let promise = instance.post(requestUrl, requestData, {
        headers: {
            Authorization: 'Bearer '
        },
    })

    return new Promise<AxiosResponse<T>>((resolve1, reject) => {
        parseApiResponse(promise, resolve1, reject)
    })
}

export async function useDelete<T>(
    requestUrl: string,
): Promise<AxiosResponse<T>> {

    let promise = instance.delete(requestUrl, {
        headers: {
            Authorization: 'Bearer '
        },
    })

    return new Promise<AxiosResponse<T>>((resolve1, reject) => {
        parseApiResponse(promise, resolve1, reject)
    })
}