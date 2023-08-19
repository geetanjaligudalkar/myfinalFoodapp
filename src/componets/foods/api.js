import axios from "axios";

export const HandleFetch = async () => {
  const url = `https://api.buttercms.com/v2/content/butters_pizza/?auth_token=767c664c86c2ff763b469e66e988781c473129ae`;
  return axios.get(url).then((res) => {
    return res.data.data.butters_pizza;
  });
};