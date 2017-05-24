import "d3pie";

export const ELECTION1STOUR2017GRAPHCONTENT: d3pie.ID3PieOptions = {
  header: {
    title: {
      text: "Victimes d\"accidents de la route a la Rochelle 2015",
      color: "#333333",
      fontSize: 24,
      font: "open sans"
    },
    subtitle: {
      text: "(source: ministere de l\"interieur)",
      color: "#666666",
      fontSize: 12,
      font: "open sans"
    },
    location: "top-center",
    titleSubtitlePadding: 9
  },
  footer: {
    text: "",
    color: "#666666",
    fontSize: 14,
    font: "open sans",
    location: "left"
  },
  size: {
    canvasHeight: 590,
    canvasWidth: 590,
    pieInnerRadius: 0,
    pieOuterRadius: null
  },
  data: {
    sortOrder: "value-desc",
    smallSegmentGrouping: {
      enabled: false,
      value: 1,
      valueType: "percentage",
      label: "Other",
      color: "#cccccc"
    },
    content: [
      {
        label: "Tues",
        value: 1,
        color: "#762222"
      },
      {
        label: "Blesse(s) grave(s)",
        value: 9,
        color: "#cd2445"
      },
      {
        label: "Blesse(s) leger(s)",
        value: 45,
        color: "#f0793e"
      },
      {
        label: "mort(s)",
        value: 45,
        color: "#f5c2de"
      }
    ]
  },
  labels: {
    outer: {
      format: "label",
      hideWhenLessThanPercentage: null,
      pieDistance: 30
    },
    inner: {
      format: "percentage",
      hideWhenLessThanPercentage: null
    },
    mainLabel: {
      color: "#333333",
      font: "open sans",
      fontSize: 10
    },
    percentage: {
      color: "#dddddd",
      font: "open sans",
      fontSize: 10,
      decimalPlaces: 0
    },
    value: {
      color: "#cccc44",
      font: "open sans",
      fontSize: 10
    },
    lines: {
      enabled: true,
      style: "curved",
      color: "segment" // "segment" or a hex color
    }
  },
  effects: {
    load: {
      effect: "default", // none / default
      speed: 1000
    },
    pullOutSegmentOnClick: {
      effect: "none", // none / linear / bounce / elastic / back
      speed: 300,
      size: 10
    },
    highlightSegmentOnMouseover: true,
    highlightLuminosity: -0.2
  },
  tooltips: {
    enabled: false,
    type: "placeholder", // caption|placeholder
    string: "",
    placeholderParser: null,
    styles: {
      fadeInSpeed: 250,
      backgroundColor: "#000000",
      backgroundOpacity: 0.5,
      color: "#efefef",
      borderRadius: 2,
      font: "open sans",
      fontSize: 10,
      padding: 4
    }
  },

  misc: {
    colors: {
      background: null, // transparent
      segments: [
        "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a",
        "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
        "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a",
        "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
        "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e",
        "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
        "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c",
        "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
        "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b",
        "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
      ],
      segmentStroke: "#ffffff"
    },
    gradient: {
      enabled: false,
      percentage: 95,
      color: "#000000"
    },
    canvasPadding: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    pieCenterOffset: {
      x: 0,
      y: 0
    },
    cssPrefix: null
  },
  callbacks: {
    onload: null,
    onMouseoverSegment: null,
    onMouseoutSegment: null,
    onClickSegment: null
  }
};
