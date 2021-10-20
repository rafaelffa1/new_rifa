import axios from 'axios';

const context = global.context;
export {context};

export const fetchSessionToken = () => {
  return axios
    .get(`${global.context}/sessiontoken/pagseguro`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};

export const enviarSMS = sms => {
  return axios
    .post(`${global.context}/enviar/sms`, {
      text: sms.text,
      phone: sms.phone,
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};

export const selecionarTodasCategorias = () => {
  return axios
    .get(`${global.context}/categorias`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    })
    .finally(function () {
      // always executed
    });
};

export const inserirUsuario = usuario => {
  // usuario.tokenDevice = global.tokenDevice;
  return axios
    .post(`${global.context}/usuarios/mobile`, usuario)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      // always executed
    });
};

export const loginNormal = usuario => {
  usuario.tokenDevice = global.tokenDevice;
  return axios
    .post(`${global.context}/login/mobile`, usuario)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    })
    .finally(function () {
      // always executed
    });
};

export const validarUsuarioCelular = celular => {
  return axios
    .get(`${global.context}/usuarios/validar/celular/${celular}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const validarUsuarioEmail = email => {
  return axios
    .get(`${global.context}/usuarios/validar/email/${email}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const validarUsuarioSocialID = socialID => {
  return axios
    .get(`${global.context}/usuarios/validar/socialID/${socialID}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.warn(error);
    });
};

export const redefinirSenha = email => {
  return axios
    .post(`${global.context}/usuario/redefinir`, email)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    })
    .finally(function () {
      // always executed
    });
};

export const atualizarUsuario = usuario => {
  return axios
    .put(`${global.context}/usuarios/mobile`, {
      usuarioID: usuario.id,
      nome: usuario.name,
      email: usuario.email,
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};

export const selecionarDestaques = () => {
  axios.defaults.headers.get = {
    'Cache-Control': 'no-cache',
  };
  return axios
    .get(`${global.context}/destaque`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};

export const favoritar = (usuarioID, produtoID) => {
  return axios
    .post(`${global.context}/favorito`, {
      usuarioID,
      produtoID,
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};

export const fetchEstadosIBGE = () => {
  return axios
    .get('http://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return false;
    })
    .finally(function () {
      // always executed
    });
};