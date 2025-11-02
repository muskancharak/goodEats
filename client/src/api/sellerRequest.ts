import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// send seller request
export interface NewSellerRequest {
  restaurantName: string;
  address: string;
  note: string;
}

export const sendSellerRequest = async (formValues: NewSellerRequest) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/seller/send`,
      formValues,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error sending seller request:", error);
    throw new Error(error.response?.data?.message || "Failed to send seller request");
  }
};

//add restuarant

export interface addRestro {
  image : File,
  RestroName: string;
  location: string;
  description: string;
  
}
export const authenticateAddRestro = async (formValues: addRestro) => {
  try {
    const token = localStorage.getItem("token");

    // Create FormData to send file + text fields
    const formData = new FormData();
    formData.append("image", formValues.image);
    formData.append("RestroName", formValues.RestroName);
    formData.append("location", formValues.location);
    formData.append("description", formValues.description);

    const response = await axios.post(
      `${API_URL}/restro/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error sending restaurant request:", error);
    throw new Error(error.response?.data?.message || "Failed to add restaurant");
  }
};

//get restro


export const getSellerRestaurants = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/restro/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("API response:", response.data); 
    return response.data;

  
  } catch (error: any) {
    console.error("Error fetching seller restaurants:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch restaurants");
  }
};
