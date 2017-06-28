import SearchResponse = Elasticsearch.SearchResponse;

/**
 * Mock data for accident
 */
export class AccidentData {

    /**
     * Accident mocked data
     * 3 accidents references
     */
    public static accidents = {
        took: 16,
        timed_out: false,
        _shards: null,
        hits: {
            hits: [
                {
                    _index: "traffic",
                    _type: "accident",
                    _id: "AVymL2sG9XxBDkV0nAd8",
                    _score: null,
                    _source: {
                        sources: [
                            "Opendata"
                        ],
                        latLon: [
                            1.54223,
                            45.167
                        ],
                        meta: {
                            documentType: "accident",
                            index: "traffic"
                        },
                        intersection: 1,
                        climatology: {
                            atmosphericCondition: 1,
                            luminosity: 2
                        },
                        location: {
                            address: "2, BROSSOLETTE  BOULEVAR",
                            commune: 31,
                            latitude: 45.167,
                            gpsType: "M",
                            agglomeration: 2,
                            department: 190,
                            longitude: 1.54223
                        },
                        id: 201500020204,
                        collisionType: 2,
                        timestamp: 1448995200
                    },
                    fields: {
                        timestamp: [
                            1448995200000
                        ]
                    },
                    highlight: {}
                },
                {
                    _index: "traffic",
                    _type: "accident",
                    _id: "AVymL27l9XxBDkV0nCPg",
                    _score: null,
                    _source: {
                        sources: [
                            "Opendata"
                        ],
                        latLon: [
                            6.17054,
                            49.35925
                        ],
                        meta: {
                            documentType: "accident",
                            index: "traffic"
                        },
                        intersection: 1,
                        climatology: {
                            atmosphericCondition: 2,
                            luminosity: 1
                        },
                        location: {
                            address: "2, LUXEMBOURG (PLACE DU)",
                            commune: 672,
                            latitude: 49.35925,
                            gpsType: "M",
                            agglomeration: 2,
                            department: 570,
                            longitude: 6.17054
                        },
                        id: 201500029407,
                        collisionType: 6,
                        timestamp: 1448962500
                    },
                    fields: {
                        timestamp: [
                            1448962500000
                        ]
                    },
                    highlight: {}
                },
                {
                    _index: "traffic",
                    _type: "accident",
                    _id: "AVymL2-u9XxBDkV0nCmW",
                    _score: null,
                    _source: {
                        sources: [
                            "Opendata"
                        ],
                        latLon: [
                            -0.3613,
                            43.29334
                        ],
                        meta: {
                            documentType: "accident",
                            index: "traffic"
                        },
                        intersection: 1,
                        climatology: {
                            atmosphericCondition: 1,
                            luminosity: 1
                        },
                        location: {
                            address: "2 AV GASTON LACOSTE",
                            commune: 445,
                            latitude: 43.29334,
                            gpsType: "M",
                            agglomeration: 2,
                            department: 640,
                            longitude: -0.3613
                        },
                        id: 201500031600,
                        collisionType: 1,
                        timestamp: 1448955900
                    },
                    fields: {
                        timestamp: [
                            1448955900000
                        ]
                    },
                    highlight: {}
                }
            ],
            total: 32,
            max_score: 0
        },
        aggregations: {
            2: {
                buckets: [
                    {
                        key_as_string: "1448838000",
                        key: 1448838000000,
                        doc_count: 9
                    },
                    {
                        key_as_string: "1449442800",
                        key: 1449442800000,
                        doc_count: 11
                    },
                    {
                        key_as_string: "1450047600",
                        key: 1450047600000,
                        doc_count: 7
                    },
                    {
                        key_as_string: "1450652400",
                        key: 1450652400000,
                        doc_count: 4
                    },
                    {
                        key_as_string: "1451257200",
                        key: 1451257200000,
                        doc_count: 1
                    }
                ]
            }
        }
    };
}
