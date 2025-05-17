import axios from 'axios'
import { BASE_URL } from '../constants'


const instance=axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    timeoutErrorMessage: "API Time Out",
})
export default instance;