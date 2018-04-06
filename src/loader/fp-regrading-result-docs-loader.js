import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'fp-regrading-result-docs-loader';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data
        });
}