const CONFIG = {
  baseUrl: 'https://api.nal.usda.gov/fdc/v1/',
  apiKey: 'Wftb9w4AArWP94YaUXjeGbObQRmUlvF6cV0bh81O',
}

const FoodAPI = {
  async search(query) {
    const result = await fetch(`${CONFIG.baseUrl}foods/search?query=${query}&api_key=${CONFIG.apiKey}&pageNumber=1`);

    return (await result.json()).foods;
  },

  async get(id) {
    const result = await fetch(`${CONFIG.baseUrl}food/${id}?api_key=${CONFIG.apiKey}`);

    return (await result.json());
  },
}

export default FoodAPI;