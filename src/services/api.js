import axios from 'axios';

const apiUsuario = axios.create({
  baseURL: 'http://10.0.2.2:9090',
});

const apiAnuncio = axios.create({
  baseURL: 'http://10.0.2.2:9091',
});

export {apiUsuario, apiAnuncio};