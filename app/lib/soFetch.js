const enderecoRest = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'https://gamerx.com.br';
const enderecoSocket = process.env.NODE_ENV === 'development' ? 'ws://localhost:3003' : 'wss://gamerx.com.br';

export default class soFetch {

  static getUrlRest() {
    return enderecoRest;
  }

  static getUrlSocket() {
    return enderecoSocket;
  }

  static get(path) {
    const url = soFetch.getUrlRest() + path;
    // console.log(url);

    const requestInfo = {
      method: 'GET',
      // mode: 'no-cors',
      headers: new Headers({
        "Authorization": 'Bearer',
        "pragma": 'no-cache',
        'Content-Type': 'application/json',
        // "cache-control": 'no-cache',
        // "Accept":"application/json"        
      })
    };
    return fetch(url, requestInfo).then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status === 401) {
        // deve voltar para o login
      } else {
        throw new Error('Não foi possível completar a operação');
      }
    });
  }

  static post(path, dados) {
    const url = soFetch.getUrlRest() + path;

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: new Headers({
        "mode": "cors",
        "Content-type": "application/json",
        "Authorization": "Bearer"
      })
    };
    console.log(url);
    return fetch(url, requestInfo).then(res => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      }

      if (res.status === 401) {
        // 401
      } else {
        throw new Error('Não foi possível completar a operação');
      }
    }).catch(e => {
      console.error(e.stack);
      reject(e.stack);
      client.end();
    })
  }

  static postFile(path, fileName, file) {
    const url = soFetch.getUrlRest() + path;

    const requestInfo = {
      method: 'POST',
      body: file,
      headers: new Headers({
        "Authorization": 'Bearer',
        "Content-Disposition": 'attachment;filename=' + fileName
      })
    };

    return fetch(url, requestInfo)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        if (res.status === 401) {
          // deve voltar para o login
        } else {
          throw new Error('Não foi possível completar a operação');
        }
      }).catch(e => {
        console.error(e.stack);
        reject(e.stack);
        client.end();
      })
  }

}
