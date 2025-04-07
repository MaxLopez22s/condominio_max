export const fetchConToken = async (url, options = {}) => {
    const token = localStorage.getItem("token");
  
    const headers = {
      ...options.headers,
      Authorization: token,
      "Content-Type": "application/json",
    };
  
    const config = {
      ...options,
      headers,
    };
  
    const response = await fetch(url, config);
    return response.json();
  };
  