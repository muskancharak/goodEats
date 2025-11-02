import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface addMenu {
  image: File;
  DishName: string;
  price: string;
  description: string;
  restaurantId: string;
}

export const authenticateAddMenu = async (formValues: addMenu) => {
  try {
    const token = localStorage.getItem("token");

    // ✅ Correct field names that match backend schema
    const formData = new FormData();
    formData.append("image", formValues.image);
    formData.append("DishName", formValues.DishName);
    formData.append("price", formValues.price);
    formData.append("description", formValues.description);
    formData.append("restaurantId", formValues.restaurantId);

    const response = await axios.post(`${API_URL}/menu/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error adding dish:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add dish to menu"
    );
  }
};


//get menu
export const getMenuList = async (restaurantId: any) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetching menu from:", `${API_URL}/menu/get/${restaurantId}`);
    const response = await axios.get(`${API_URL}/menu/get/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Fetching menu from:", `${API_URL}/menu/get/${restaurantId}`);
    console.log("API menu response:", response.data); 
    return response.data;

  
  } catch (error: any) {
    console.error("Error fetching seller restaurants:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch restaurants");
  }
};
