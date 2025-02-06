const API_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

export const fetchInventory = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch inventory data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};
