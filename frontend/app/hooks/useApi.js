import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  const requestPhones = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 1));
    return response;
  };
  const requestHead = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 2));
    return response;
  };
  const requestMic = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 3));
    return response;
  };
  const requestLaptop = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 4));
    return response;
  };
  const requestPinter = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 5));
    return response;
  };
  const requestAccessories = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data.filter((item) => item.category == 6));
    return response;
  };

  return {
    data,
    error,
    loading,
    request,
    requestPhones,
    requestHead,
    requestMic,
    requestLaptop,
    requestPinter,
    requestAccessories,
  };
};
