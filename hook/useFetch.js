import { useState, useEffect } from "react";
import axios from "axios"

import { API_KEY, API_URL } from '@env'

import mockJobs from '../mockData/mockJobs'
import mockJob from '../mockData/mockJob'


const useFetch = (endPoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = API_URL;
    const apiKey = API_KEY;


    const options = {
        method: 'GET',
        url: `${url}/${endPoint}`,
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let response;
            // = await axios.request(options);
            if (endPoint === 'job-details') {
                response = mockJob;
            } else {
                response = mockJobs;
            }

            setData(response.data);

        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
}




export default useFetch;