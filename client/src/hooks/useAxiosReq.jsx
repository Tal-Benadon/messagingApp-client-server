import React, { useEffect, useState } from 'react'
import apiCall from '../Helpers/api'

// const {loading, data, error} = useAxiosReq({method: 'GET', url: url, defaultData:[]})

export default function useAxiosReq({ url, body, method, defaultData }) {
    const [data, setData] = useState(defaultData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await apiCall({ url, body, method })
            setData(res)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { fetchData() }, [])
    return { data, loading, error }
}
