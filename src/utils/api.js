import axios from "axios";
import md5 from "md5";

var date = new Date();
var dateUtc = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString().padStart(2, "0") + date.getUTCDate().toString().padStart(2, "0");

//dateUtc = new Date().toISOString().slice(0, 10).replace(/-/g, '')

const apiUrl = 'http://api.valantis.store:40000/';
const apiPassword = 'Valantis';

export const HEADERS = {
    'Content-type': 'application/json;',
    'X-Auth': md5(`${apiPassword}_${dateUtc}`),
};

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    common: {
      'Content-type': 'application/json;',
      'X-Auth': md5(`${apiPassword}_${dateUtc}`)
    }
  }
});

export const getProductIds = async () => {
  let res = await instance.post(
      '',
      {
        action: 'get_ids',
      }
  )
  .catch((error) => {
      console.log('Error code: ', error.response.status);
      if (error.response.data) console.log('Error data: ', error.response.data);
      return getProductIds();
  });

  return res;
};

export const getProductItems = async (ids) => {
  let res = await instance.post(
      '',
      {
          action: 'get_items',
          params: {
              ids: ids,
          },
      }
  )
  .catch((error) => {
      console.log('Error code: ', error.response.status);
      if (error.response.data) console.log('Error data: ', error.response.data);
      return getProductItems(ids);
  });

  return res;
}

export const getFillteredIds = async (param, value) => {
  let res = await instance.post(
      '',
      {
          action: 'filter',
          params: {
              [param]: value
          },
      }
  )
  .catch((error) => {
      console.log('Error code: ', error.response.status);
      if (error.response.data) console.log('Error data: ', error.response.data);
      return getFillteredIds(param, value);
  });

  return res;
}