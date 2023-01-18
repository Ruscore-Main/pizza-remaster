import axios from "axios";

const BASE_URL = "https://63027a3b9eb72a839d705b29.mockapi.io/items";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const pizzasAPI = {
  
    getPizzas(page, sortType, category, searchValue) {
      let fetchURL = `?page=${page}&limit=5&sortBy=${sortType.sort}&order=${sortType.order}`
      
      if (category !== null) {
        fetchURL += `&category=${category+1}`;
      }
      if (searchValue !== '') {
        fetchURL += `&name=${searchValue}`;
      }

      return instance.get(fetchURL).then(({data}) => data)
    },

    getFullPizza(id) {
      return instance.get(`/${id}`).then(({data}) => data)
    }

};