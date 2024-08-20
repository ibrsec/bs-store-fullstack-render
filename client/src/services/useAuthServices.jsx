 
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios from './useAxios';
import {fetchCurrentFailAuth, fetchCurrentSuccessAuth, fetchFailAuth, fetchLogoutAuth, fetchStartAuth, fetchSuccessAuth, fetchSuccessWithoutPayloadAuth} from '../app/features/authSlice'
import { toastError, toastSuccess } from '../helpers/toastify';
import { fetchLogoutCategory } from '../app/features/categorySlice';
import { fetchLogoutProduct } from '../app/features/productSlice';
const useAuthServices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {axiosPublic,axiosToken} = useAxios();

    const loginApi = async(body) => {
        dispatch(fetchStartAuth())
        try {
            const response = await axiosPublic.post('/auth/login',body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('login response = ',response);
            dispatch(fetchSuccessAuth(response?.data?.result))
            dispatch(fetchCurrentSuccessAuth({time:new Date().getTime()}))
            toastSuccess(response?.data?.message)
            navigate('/');
        } catch (error) {
            dispatch(fetchFailAuth())
            console.log(error);
            toastError(error.message || 'LOGIN IS FAILED!')
        }
    }
    const registerApi = async(body) => {
        dispatch(fetchStartAuth())
        try {
            const response = await axiosPublic.post('/users',body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('register response = ',response);
            dispatch(fetchSuccessWithoutPayloadAuth())
            toastSuccess(response?.data?.message)
            navigate('/login');
        } catch (error) {
            dispatch(fetchFailAuth())
            console.log(error);
            toastError(error.message || 'Register IS FAILED!')
        }
    }
    const logoutApi = async() => {
        dispatch(fetchStartAuth())
        try {
            const response = await axiosToken.get('/auth/logout',)
            console.log('logout response = ',response);
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            dispatch(fetchLogoutAuth())
            dispatch(fetchLogoutCategory())
            dispatch(fetchLogoutProduct())
            toastSuccess(response?.data?.message)
            navigate('/login');
        } catch (error) {
            dispatch(fetchFailAuth())
            console.log(error);
            toastError(error.message || 'LOGOUT IS FAILED!')
        }
    }

    const currentApi = async(time) => {
        dispatch(fetchStartAuth())
        try {
            const response = await axiosToken.get('/auth/current')
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('current refresh response = ',response);
            console.log('new Date()', new Date())
            dispatch(fetchCurrentSuccessAuth({time}))
            // toastSuccess(response?.data?.message)
            // navigate('/login');
        } catch (error) {
            dispatch(fetchCurrentFailAuth())
            console.log(error);
            toastError(error.message || 'CURRENT REFRESH IS FAILED!')
            logoutApi();
        }
    }


  return {loginApi,registerApi,logoutApi,currentApi}
}

export default useAuthServices