import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service'; 

const serviceUri = "machine-spinnings";
 
export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core-azure");
  }
  
  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getMachineTypes(){
    var endpoint = `${serviceUri}/machine/types`;
    return super.list(endpoint);
  }
}
