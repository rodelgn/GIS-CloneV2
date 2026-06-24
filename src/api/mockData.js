export const demoUser = {
  id: 1,
  name: "Demo User",
  email: "user@demo.com",
};

export const mockMonuments = [
  { id: 1, monument: "BLLM NO. 1, CAD-174", easting: "535412.52", northing: "782941.35" },
  { id: 2, monument: "BLLM NO. 2, CAD-174", easting: "535885.14", northing: "783126.77" },
  { id: 3, monument: "MBM NO. 5, DAVAO", easting: "536210.43", northing: "782504.18" },
  { id: 4, monument: "PSU-11 CONTROL 12", easting: "534991.89", northing: "782250.66" },
  { id: 5, monument: "CAD-174 CONTROL 31", easting: "536742.21", northing: "783440.09" },
  { id: 6, monument: "BLLM NO. 7, CAD-174", easting: "535102.33", northing: "781912.48" },
  { id: 7, monument: "MBM NO. 14, DAVAO", easting: "536018.64", northing: "781734.25" },
  { id: 8, monument: "CAD-174 CONTROL 44", easting: "537120.08", northing: "782828.73" },
  { id: 9, monument: "PSU-11 CONTROL 26", easting: "534726.41", northing: "783001.94" },
  { id: 10, monument: "BLLM NO. 10, CAD-174", easting: "535640.37", northing: "781488.55" },
  { id: 11, monument: "MBM NO. 21, DAVAO", easting: "536408.96", northing: "782088.16" },
  { id: 12, monument: "CAD-174 CONTROL 58", easting: "537348.82", northing: "783218.60" },
  { id: 13, monument: "PSU-11 CONTROL 33", easting: "534505.29", northing: "782678.42" },
  { id: 14, monument: "BLLM NO. 12, CAD-174", easting: "535832.75", northing: "783710.11" },
  { id: 15, monument: "MBM NO. 30, DAVAO", easting: "536905.44", northing: "781962.87" },
  { id: 16, monument: "CAD-174 CONTROL 63", easting: "537018.31", northing: "781645.32" },
];

export const mockPlottingData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [125.5372, 7.0799],
          [125.5384, 7.0799],
          [125.5384, 7.081],
          [125.5372, 7.081],
          [125.5372, 7.0799],
        ]],
      },
      properties: {
        id: 101,
        title_no: "T-10001",
        title_name: "Demo Parcel Owner",
        pluscode: "3GHH+27 Davao City",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [125.5456, 7.0768],
          [125.5471, 7.0768],
          [125.5471, 7.0781],
          [125.5456, 7.0781],
          [125.5456, 7.0768],
        ]],
      },
      properties: {
        id: 102,
        title_no: "T-10002",
        title_name: "Sample Landholding",
        pluscode: "3GJQ+X6 Davao City",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [125.5329, 7.0727],
          [125.5342, 7.0729],
          [125.5339, 7.0742],
          [125.5326, 7.074],
          [125.5329, 7.0727],
        ]],
      },
      properties: {
        id: 103,
        title_no: "T-10003",
        title_name: "Mock Survey Parcel",
        pluscode: "3GFC+Q9 Davao City",
      },
    },
  ],
};
