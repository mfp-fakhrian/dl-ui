import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    this.error = {};
    var index = 0;
    var emptyFieldName =
      "- Semua Field Harus Diisi\n- Pilih Minimal Satu Lusi\n- Pilih Minimal Satu Pakan";

    //Cek Jenis Material
    if (
      this.data.materialTypeDocument == null ||
      this.data.materialTypeDocument == undefined
    ) {
      this.error.materialTypeDocument = "Jenis Material Tidak Boleh Kosong";
      index++;
    }

    //Cek Jenis Anyaman
    if (this.data.wovenType == null || this.data.wovenType == undefined) {
      this.error.wovenType = "Jenis Anyaman Tidak Boleh Kosong";
      index++;
    }

    //Cek Jumlah Lusi
    if (this.data.amountOfWarp == null || this.data.amountOfWarp == undefined) {
      this.error.amountOfWarp = "Jumlah Lusi Tidak Boleh Kosong";
      index++;
    }

    //Cek Jumlah Pakan
    console.log(this.data.amountOfWeft);
    if (this.data.amountOfWeft == null || this.data.amountOfWeft == undefined) {
      this.error.amountOfWeft = "Jumlah Pakan Tidak Boleh Kosong";
      index++;
    }

    //Cek Lebar
    if (this.data.width == null || this.data.width == undefined) {
      this.error.width = "Lebar Tidak Boleh Kosong";
      index++;
    }

    //Cek Jenis Lusi
    if (
      this.data.warpTypeForm === "" ||
      this.data.warpTypeForm === null ||
      this.data.warpTypeForm === undefined
    ) {
      this.error.warpTypeForm = "Pilih Minimal Satu Lusi";
      index++;
    }

    //Cek Jenis Pakan
    if (
      this.data.weftTypeForm === "" ||
      this.data.weftTypeForm === null ||
      this.data.weftTypeForm === undefined
    ) {
      this.error.weftTypeForm = "Pilih Minimal Satu Lusi";
      index++;
    }

    //Cek Total Benang
    if (
      this.data.totalYarn == null ||
      this.data.totalYarn == undefined ||
      this.data.totalYarn == 0
    ) {
      this.error.totalYarn = "Kuantitas Lusi & Pakan Harus Diisi";
      index++;
    }

    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", { id: this.data.id });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
