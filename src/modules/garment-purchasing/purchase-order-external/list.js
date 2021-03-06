import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosted = [];
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }

    context = ["Rincian", "Cetak PDF"]

    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.isPosted;
                return ""
            }
        },
        { field: "no", title: "Nomor PO Eksternal" },
        {
            field: "date", title: "Tanggal PO Eksternal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "supplier.name", title: "Nama Supplier" },
        { field: "purchaseRequestNo", title: "Nomor Purchase Request" },
        {
            field: "isPosted", title: "Status Post",
            formatter: function (value, row, index) {
                return value ? "SUDAH" : "BELUM";
            }
        },
        {
            field: "isOverBudget", title: "Over Budget?",
            formatter: function (value, row, index) {
                return value ? "YA" : "TIDAK";
            }
        },
        { field: "approveStatus", title: "Status Approve" }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            select: ["date", "no", "supplier.name", "items.prNo", "isPosted", "isApproved", "isOverBudget"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                for (var _data of result.data) {
                    var prNo = _data.items.map(function (item) {
                        return `<li>${item.prNo}</li>`;
                    });
                    prNo = prNo.filter(function (elem, index, self) {
                        return index == self.indexOf(elem);
                    })
                    _data.purchaseRequestNo = `<ul>${prNo.join()}</ul>`;
                    if (_data.isOverBudget) {
                        if (_data.isApproved) {
                            _data.approveStatus = "SUDAH";
                        } else {
                            _data.approveStatus = "BELUM";
                        }
                    } else {
                        _data.approveStatus = "-";
                    }
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.isPosted;
            default:
                return true;
        }
    }

    posting() {
        if (this.dataToBePosted.length > 0) {
            this.service.post(this.dataToBePosted).then(result => {
                this.table.refresh();
            }).catch(e => {
                this.error = e;
            })
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}