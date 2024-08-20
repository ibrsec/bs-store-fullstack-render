import axios from 'axios' 
import { useSelector } from 'react-redux'

const useAxios = () => {

// const baseUrl = "http://localhost:8000";
const baseUrl = "/api/v1";

const token = useSelector(state => state.auth.token);
    const axiosPublic = axios.create({ 
        baseURL: baseUrl,
        timeout: 10000, 
    })
    const axiosToken = axios.create({ 
        baseURL: baseUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer ' +token}
    })


  return {axiosPublic,axiosToken}
}

export default useAxios