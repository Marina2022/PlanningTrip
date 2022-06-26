import {OnePointModel} from "./models/onePointModel";

export default class API {
  constructor(endpoint) {
    this._url = `https://16.ecmascript.pages.academy/big-trip`;
    this._endpoint = endpoint;    
  }

  getDataFromServer(){
    return this._load({
      url: `${this._url}/${this._endpoint}`,
      headers: new Headers({ "Content-Type": `application/json` }),
    });
  }

  _load({
    headers = new Headers(),
    id = ``,
    url,
    method = `GET`,
  }) 
{
  headers.append("Authorization", `Basic y2StXBzjFLjF18cFElf5tl5Hhxug7rjm`);
  return fetch(url, {method, headers})
    .then((resp) => {
      if (resp.status !== 200) throw new Error(`не 200!`);
      else return resp;
    })
    .then((resp) => resp.json())    
  }
}