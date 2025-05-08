import axios from "axios";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === true; // Set to true to use mock API
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://localhost:3000/tivoli-bank"; // Set to your API URL

export interface NewTransaction {
  seller: string;
  buyer: string;
  amount: number;
  stamp: string;
}

export const createTransaction = async (data: NewTransaction) => {
  if (USE_MOCK_API) {
    console.log("Using mock API for transaction creation", data);
    return { status: 201, data };
  }
  const response = await axios.post(`${BASE_URL}/transactions`, data);
  return response;
};
