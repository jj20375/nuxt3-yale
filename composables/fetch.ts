
enum AsyncApiMethod {
    get=  'GET',
    post='POST'
}

export interface BaseApiResponse<TData = any > {
    data: TData | null
    message: string | null
}



const fetchData = async<TData = any>(
    reqUrl: string,
    method: AsyncApiMethod,
    data?:any
) => {
    const token = useCookie('token').value
    const options = {
        method,
        server: false,
        headers: {
            Authorization: token ?  `Bearer ${token}` : '', 
            'Accept': "application/json"
        }
    }

    try {
        const res = await $fetch<BaseApiResponse<TData>>(reqUrl, {
            ...options,
            ...(method === AsyncApiMethod.get ? {params: data} : {body: data})
        })
        return res
    } catch (error) {
        throw(error)
    }
}


export const useFetchData = new(class getData {
    get<TData = any> (url: string , params?: any) {
        return fetchData<TData>(url, AsyncApiMethod.get, params)
    }

    post<TData = any> (url: string , body?: any) {
        return fetchData<TData>(url, AsyncApiMethod.post, body)
    }
})