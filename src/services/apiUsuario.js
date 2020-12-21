import axios from 'axios';

const apiUsuario = axios.create({
  baseURL: 'http://10.0.2.2:9090',
});

export default apiUsuario;


