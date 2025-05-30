 import api from '../axios.js'
import React from 'react'
import { useContentTypeStore } from '../store/ContentType.js'

const useGetTrendingMovie = () => {
    const [trendingContent, setTrendingContent] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const {contentType} = useContentTypeStore()
    
    React.useEffect(() => {
        const fetchTrendingMovie = async () => {
            try {
                const response = await api.get(`/api/v1/${contentType}/trending`)
                
                // Check if response has data
                if (response.data) {
                    setTrendingContent(response.data.data)
                    // Use useEffect to log the updated state
                    console.log('Trending content fetched:', response.data)
                } else {
                    throw new Error('No data received')
                }
            } catch (error) {
                console.error('Error fetching trending movie:', error.message)
                setTrendingContent(null)
            } finally {
                setLoading(false)
            }
        }
    
        fetchTrendingMovie()
    }, [contentType])

    // Debug: Log state changes
    React.useEffect(() => {
        console.log('Current trending content:', trendingContent)
    }, [])
    
    return { trendingContent, loading }
}

export default useGetTrendingMovie 

