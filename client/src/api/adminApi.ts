import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//get all req for seller
export const authenticateGetAllRequest = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    const response = await axios.get(`${API_URL}/admin/getRequest`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token here
      },
      withCredentials: true, // optional
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching list:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch requests");
  }
};

//get all req by id
export const authenticateRequestById = async (_id: any) => {
  try {
    const token = localStorage.getItem("token");
    console.log("token:", token);

    const response = await axios.get(`${API_URL}/admin/getById/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error:any) {
    console.error("Error fetching by ID:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch request");
  }
};

//approved seller req
export const authenticateApprovedRequest = async (_id: string, status: string, reason?: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/admin/status/${_id}`,
      { status, reason }, // body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error updating request status:", error);
    throw new Error(error.response?.data?.message || "Failed to update request");
  }
};
