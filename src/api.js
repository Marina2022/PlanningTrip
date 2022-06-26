import {OnePointModel} from "./models/onePointModel";

export default class API {
  constructor(endpoint) {
    this._url = `https://16.ecmascript.pages.academy/big-trip`;
    this._endpoint = endpoint;
  }

  getDataFromServer() {
    return (
      this._load({
        url: `${this._url}/${this._endpoint}`,
        headers: new Headers({ "Content-Type": `application/json` }),
      }).then((resp) => resp.json())      
    )
  }

  updatePoint(id, newPoint) {    
    return this._load({
      url: `${this._url}/${this._endpoint}/${id}`,
      headers: new Headers({ "Content-Type": `application/json` }),
      method: `PUT`,
      body: JSON.stringify(newPoint.toRAW()),
    })
      .then((data) => OnePointModel.parseOnePoint(data))
      .then((resp) => resp.json());
  }

  addPoint(newPoint) {
      return this._load({
        url: `${this._url}/${this._endpoint}`,
        headers: new Headers({ "Content-Type": `application/json` }),
        method: `POST`,
        body: JSON.stringify(newPoint.toRAW()),
      })
        .then((data) => OnePointModel.parseOnePoint(data))
        .then((resp) => resp.json());
  }

  deletePoint(id) {
      return this._load({
      url: `${this._url}/${this._endpoint}/${id}`,      
      method: `DELETE`,          
    })
  } 

  _load({
    headers = new Headers(),
    //id = ``,
    url,
    method = `GET`,
    body = null,
  }) {
    headers.append("Authorization", `Basic y2StXBzjFLjF18cFElf5tl5Hhxug7rjm`);
    return fetch(url, { method, headers, body })
      .then((resp) => {
        if (resp.status !== 200) throw new Error(`не 200!`);
        else return resp;
      })
      
  }
}