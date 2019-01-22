import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

@inject(Router, Service)
export class List {
  context = ["detail"];

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: false
  };

  columns = [
    [
      { field: "spNumber", title: "No. SP", rowspan: "2", valign: "top" },
      { field: "spDate", title: "Tanggal SP", rowspan: "2", valign: "top" },
      {
        field: "construction",
        title: "Konstruksi",
        rowspan: "2",
        valign: "top"
      },
      { field: "yarnNumber", title: "No. Benang", rowspan: "2", valign: "top" },
      { title: "Blended (%)", colspan: "3", valign: "middle" },
      { title: "Estimasi Produksi", colspan: "4", valign: "middle" },
      { field: "total", title: "Total ALL", rowspan: "2", valign: "top" },
      { title: "Kebutuhan Benang", colspan: "3", valign: "middle" }
    ],
    [
      {
        field: "blendedPoly",
        title: "Poly",
        valign: "middle"
      },
      { field: "blendedCotton", title: "Cotton", valign: "middle" },
      { field: "blendedOthers", title: "Lainnya", valign: "middle" },
      { field: "epGradeA", title: "Grade A", valign: "middle" },
      { field: "epGradeB", title: "Grade B", valign: "middle" },
      { field: "epGradeC", title: "Grade C", valign: "middle" },
      { field: "epOthers", title: "Aval", valign: "middle" },
      { field: "yarnWeft", title: "Lusi", valign: "middle" },
      { field: "yarnWarp", title: "Pakan", valign: "middle" },
      { field: "yarnWhole", title: "Total", valign: "middle" }
    ]
  ];

  loader = info => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      //   select: [
      //     "yarnCode",
      //     "yarnName",
      //     "yarnUnit",
      //     "yarnCurrencyCode",
      //     "yarnPrice"
      //   ],
      order: order
    };

    // return this.service.search(arg).then(result => {
    //   return {
    //     total: result.info.total,
    //     // data: result.data
    //     data: [
    //       {
    //         spNumber: "0515/00.2018",
    //         spDate: "01-10-18",
    //         construction: "PC OX 100 48 63 DhMz B AH",
    //         yarnNumber: "TC45XCM16",
    //         blendedPoly: "65 %",
    //         blendedCotton: "35 %",
    //         blendedOthers: "100 %",
    //         epGradeA: 42500,
    //         epGradeB: 5000,
    //         epGradeC: 1500,
    //         epOthers: 1000,
    //         total: 50000,
    //         yarnWeft: 26.9,
    //         yarnWarp: 36.97,
    //         yarnWhole: 63.87
    //       }
    //     ]
    //   };
    // });

    return {
      total: 1,
      // data: result.data
      data: [
        {
            spNumber: "0515/00.2018",
            spDate: "01-10-18",
            construction: "PC OX 100 48 63 DhMz B AH",
            yarnNumber: "TC45XCM16",
            blendedPoly: "65 %",
            blendedCotton: "35 %",
            blendedOthers: "100 %",
            epGradeA: 42500,
            epGradeB: 5000,
            epGradeC: 1500,
            epOthers: 1000,
            total: 50000,
            yarnWeft: 26.9,
            yarnWarp: 36.97,
            yarnWhole: 63.87
        }
      ]
    };
  };

  constructor(router, service) {
    this.service = service;
    this.router = router;
    // this.accessoriesId = "";
    // this.accessories = [];
  }

  //   contextCallback(event) {
  //     var arg = event.detail;
  //     var data = arg.data;
  //     switch (arg.name) {
  //       case "detail":
  //         this.router.navigateToRoute("view", { id: data.yarnCode });
  //         break;
  //     }
  //   }

  // upload() {
  //     this.router.navigateToRoute('upload');
  // }

  //   create() {
  //     this.router.navigateToRoute("create");
  //   }
}