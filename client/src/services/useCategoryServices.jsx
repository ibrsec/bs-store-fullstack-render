

 
import { useDispatch } from 'react-redux';
import useAxios from './useAxios';
import { fetchStartCategory,fetchFailCategory,fetchSuccessCategory,fetchSuccessWithoutPayloadCategory,} from '../app/features/categorySlice';
import { toastError, toastSuccess } from '../helpers/toastify';

const useCategoryServices = () => {

    const dispatch = useDispatch();
    const {axiosToken} = useAxios();

    const listCategories = async({limit}) => {
        dispatch(fetchStartCategory())
        try {
            const response = await axiosToken.get(`/categories?limit=${limit}`)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('categories list response = ',response);
            dispatch(fetchSuccessCategory(response?.data))
            // toastSuccess(response?.data?.message)
        } catch (error) {
            dispatch(fetchFailCategory())
            console.log(error);
            toastError(error.message || 'Listing categories IS FAILED!')
        }
    }
    const createCategory = async(body) => {
        dispatch(fetchStartCategory())
        try {
            const response = await axiosToken.post(`/categories`,body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('category post response = ',response);
            dispatch(fetchSuccessWithoutPayloadCategory())
            toastSuccess(response?.data?.message)
            listCategories({limit:"1000"})
        } catch (error) {
            dispatch(fetchFailCategory())
            console.log(error);
            toastError(error.message || 'post category IS FAILED!')
        }
    }
    const updateCategory = async(id,body) => {
        dispatch(fetchStartCategory())
        try {
            const response = await axiosToken.put(`/categories/${id}`,body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('category put response = ',response);
            dispatch(fetchSuccessWithoutPayloadCategory())
            toastSuccess(response?.data?.message)
            listCategories({limit:"1000"})
        } catch (error) {
            dispatch(fetchFailCategory())
            console.log(error);
            toastError(error.message || 'put category IS FAILED!')
        }
    }
    const deleteCategory = async(id) => {
        dispatch(fetchStartCategory())
        try {
            const response = await axiosToken.delete(`/categories/${id}`)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('category delete response = ',response);
            dispatch(fetchSuccessWithoutPayloadCategory())
            toastSuccess(response?.data?.message || "category is deleted!")
            listCategories({limit:"1000"})
        } catch (error) {
            dispatch(fetchFailCategory())
            console.log(error);
            toastError(error.message || 'deleting category IS FAILED!')
        }
    }

      return {listCategories,createCategory,deleteCategory,updateCategory}
    }
    
    export default useCategoryServices