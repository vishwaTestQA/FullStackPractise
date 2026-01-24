import axios from "axios"

export const axiosApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
})

// This function is injected once at app startup
export const attachNetworkInterceptor = (handleApiError: (er: string) => void) => {
   axiosApi.interceptors.response.use(
    res => {
        // markOnline();
        return res;
    },
    err => {
       if (!navigator.onLine) {
         // offline handled by NetworkProvider
         return Promise.reject(err);
       }
       console.log("err=========================")
       
          if(!err.response){
            // markOffline()
            //  handleApiError(err)
             handleApiError(`Server error. Please try again. ${err.response.status}`)
          }else if(err.response){
                 // server responded with error
             handleApiError("Server error. Please try again.")
          }else{
             // request failed (timeout, DNS, etc.)
             handleApiError("Network error, please try again later")
          }
        return Promise.reject(err)
    }
   )
}

// No extra backend calls
// Uses real API traffic
// Extremely accurate