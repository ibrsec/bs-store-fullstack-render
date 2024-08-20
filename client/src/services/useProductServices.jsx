

 
import { useDispatch } from 'react-redux'; 
import useAxios from './useAxios';
import { fetchFailProduct, fetchStartProduct, fetchSuccessOneProduct, fetchSuccessProduct, fetchSuccessWithoutPayloadProduct } from '../app/features/productSlice';
import { toastError, toastSuccess } from '../helpers/toastify';

const useProductServices = () => {

    const dispatch = useDispatch(); 
    const { axiosToken} = useAxios();

    const listProducts = async({page,search}) => {
        dispatch(fetchStartProduct())
        try {
            const response = await axiosToken.get(`/products?page=${page}&search[title]=`+(search || ""))
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('products list response = ',response);
            dispatch(fetchSuccessProduct(response?.data))
            // toastSuccess(response?.data?.message)
        } catch (error) {
            dispatch(fetchFailProduct())
            console.log(error);
            toastError(error.message || 'Listing Products IS FAILED!')
        }
    }
    const getProduct = async(id) => {
        dispatch(fetchStartProduct())
        try {
            const response = await axiosToken.get(`/products/`+id)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('get product response = ',response);
            dispatch(fetchSuccessOneProduct(response?.data?.result))
            toastSuccess(response?.data?.message)
        } catch (error) {
            dispatch(fetchFailProduct())
            console.log(error);
            toastError(error.message || 'Getting Product IS FAILED!')
        }
    }
    const deleteProduct = async(id) => {
        dispatch(fetchStartProduct())
        try {
            const response = await axiosToken.delete(`/products/`+id)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('delete product response = ',response);
            dispatch(fetchSuccessWithoutPayloadProduct())
            toastSuccess(response?.data?.message || 'Product is deleted!')
            listProducts({page:1,search:""});
        } catch (error) {
            dispatch(fetchFailProduct())
            console.log(error);
            toastError(error.message || 'Deleting Product IS FAILED!')
        }
    }
    const createProduct = async(body) => {
        dispatch(fetchStartProduct())
        try {
            const response = await axiosToken.post(`/products`,body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('post product response = ',response);
            dispatch(fetchSuccessWithoutPayloadProduct())
            toastSuccess(response?.data?.message )
            listProducts({page:1,search:""});
        } catch (error) {
            dispatch(fetchFailProduct())
            console.log(error);
            toastError(error.message || 'Creating Product IS FAILED!')
        }
    }
    const updateProduct = async(id,body) => {
        dispatch(fetchStartProduct())
        try {
            const response = await axiosToken.put(`/products/${id}`,body)
            if(response?.data?.error){
                throw new Error(response?.data?.message)
            }
            console.log('put product response = ',response);
            dispatch(fetchSuccessWithoutPayloadProduct())
            toastSuccess(response?.data?.message )
            listProducts({page:1,search:""});
        } catch (error) {
            dispatch(fetchFailProduct())
            console.log(error);
            toastError(error.message || 'Creating Product IS FAILED!')
        }
    }

  return {listProducts,getProduct,deleteProduct,createProduct,updateProduct}
}

export default useProductServices