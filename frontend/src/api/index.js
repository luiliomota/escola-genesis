

import axios from 'axios';

  function config() {
    const customAxios = axios.create({
      baseURL: '',
    });

  customAxios.defaults.headers['Access-Control-Allow-Origin'] = '*';

  return customAxios;
}

export default config();