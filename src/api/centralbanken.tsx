import type { bankTest } from "../types/types";

const bankURL: string = "https://yrgobanken.vip/api/test";

export const getBankTest = async (): Promise<bankTest> => {
  try {
    const response = await fetch(bankURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bank test:", error);
    throw error;
  }
};
