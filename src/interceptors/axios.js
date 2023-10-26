import axios from "axios";

//Interceptors are functions that can be used to modify requests or responses before they are sent or received.
//In this case, interceptors are being used to automatically refresh the user's access token when it has expired.
//By using an interceptor, the process of refreshing the access token can be handled automatically without the need for the user to manually log in again, providing a better user experience.

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    let refresh = false;
    if (error?.response?.status === 401 && !refresh) {
      try {
        refresh = true;
        const response = await axios.post(
          "/auth/refreshtoken",
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          return axios(error.config);
        }
      } catch (error) {
        // Handle error from refresh token request
        console.error("Error refreshing token:", error);
        throw error;
      }
    } else {
      // Handle other error responses
      refresh = false;
      console.error("Error:", error);
      throw error;
    }
  }
);
