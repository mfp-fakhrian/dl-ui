import {
    inject,
    bindable,
    BindingEngine,
    Lazy
  } from "aurelia-framework";
  import {
    Router
  } from "aurelia-router";
  import {
    Service
  } from "./service";
  import moment from 'moment';
  var UnitLoader = require("../../../loader/unit-loader");
  var MachineLoader = require("../../../loader/weaving-machine-loader");
  var ConstructionLoader = require("../../../loader/weaving-constructions-loader");
  var OperatorLoader = require("../../../loader/weaving-operator-loader");
  var BeamLoader = require("../../../loader/weaving-beam-loader");
  @inject(Service, Router, BindingEngine)
  export class Create {
    @bindable readOnly;
    @bindable MachineDocument;
    @bindable WeavingDocument;
    @bindable ConstructionDocument;
    @bindable OperatorDocument;
    @bindable EntryTime;
    @bindable BeamsWarping;
  
    beamColumns = [{
      value: "BeamNumber",
      header: "Nomor Beam Warping"
    }, {
      value: "YarnStrands",
      header: "Helai Benang Beam Warping"
    }];
  
    constructor(service, router, bindingEngine) {
      this.router = router;
      this.service = service;
      this.bindingEngine = bindingEngine;
      this.data = {};
      // this.data.SizingDetails = {};
      // this.BeamsWarping = [];
      // this.data.Weight = {};
      // this.data.Weight.Netto = "";
  
      this.error = {};
    }
  
    formOptions = {
      cancelText: 'Kembali',
      saveText: 'Simpan',
    };
    
    // process = ["", "Cucuk", "Sisir"];
  
    get machines() {
      return MachineLoader;
    }
  
    get units() {
      return UnitLoader;
    }
  
    get constructions() {
      return ConstructionLoader;
    }
  
    get beams() {
      return BeamLoader;
    }
  
    get operators() {
      return OperatorLoader;
    }
  
    OperatorDocumentChanged(newValue) {
      this.SizingGroup = newValue.Group;
    }
  
    EntryTimeChanged(newValue) {
      this.service.getShiftByTime(newValue)
        .then(result => {
          this.error.Shift = "";
          this.Shift = {};
          this.Shift = result;
          this.data.ShiftDocumentId = this.Shift.Id;
        })
        .catch(e => {
          this.Shift = {};
          this.data.ShiftDocumentId = this.Shift.Id;
          this.error.Shift = " Shift tidak ditemukan ";
        });
    }
  
    // get addBeamsWarping() {
    //   return event => {
    //     this.BeamsWarping.push({});
    //   };
    // }
  
    // beamDetail(data) {
    //   var beam = {};
    //   beam.Id = data.Id;
    //   beam.YarnStrands = data.YarnStrands;
  
    //   return beam;
    // }
  
    // get YarnStrands() {
    //   let result = 0;
  
    //   if (this.BeamsWarping) {
    //     if (this.BeamsWarping.length > 0) {
    //       this.data.BeamsWarping = [];
    //       for (let beam of this.BeamsWarping) {
    //         if (beam.BeamDocument && beam.BeamDocument.YarnStrands != 0) {
    //           result += beam.BeamDocument.YarnStrands;
    //         }
    //       }
    //     }
  
    //     this.data.YarnStrands = result;
    //   }
    //   return result;
    // }
  
    saveCallback(event) {
      this.data.MachineDocumentId = this.MachineDocument.Id;
      this.data.WeavingUnitId = this.WeavingUnitDocument.Id;
      this.data.ConstructionDocumentId = this.ConstructionDocument.Id;
      this.data.SizingBeamId = this.SizingBeamDocument.Id
      this.data.PISPieces = this.PISPieces;
      this.data.OperatorDocumentId = this.OperatorDocument.Id;

      var EntryDateContainer = this.EntryDate;
      this.data.EntryDate = moment(EntryDateContainer).utcOffset("+07:00").format();
      this.data.EntryTime = this.EntryTime;
      this.data.ShiftDocumentId = this.Shift.Id;
  
      // if(this.ReachingTyingProcess == "Cucuk"){
        this.service
        .create(this.data)
        .then(result => {
          this.router.navigateToRoute('list');
        })
        .catch(e => {
          this.error = e;
        });
      // }else if(this.ReachingTyingProcess == "Sisir"){
      //   this.service
      //   .createTying(this.data)
      //   .then(result => {
      //     this.router.navigateToRoute('list');
      //   })
      //   .catch(e => {
      //     this.error = e;
      //   });
      // }
    }
  
    cancelCallback(event) {
      this.router.navigateToRoute('list');
    }
  }
  