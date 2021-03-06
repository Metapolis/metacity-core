/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

export class TweetData {

    public static tweets = {
        took: 33,
        hits: {
            hits: [
                {
                    _index: "social-network",
                    _type: "tweet",
                    _id: "AVxZpvGL9XxBDkV0m9It",
                    _score: 0,
                    _source: {
                        hashtags: ["test"],
                        feeling: 0.71,
                        type: "RT",
                        tags: ["test"],
                        createdAt: "2017-05-24T16:59:36Z",
                        meta: {
                            documentType: "tweet",
                            index: "social-network"
                        },
                        mentions: [
                            "info_tbm"
                        ],
                        text: "RT @info_tbm: Bordeaux Fête le Fleuve : J-2 ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…",
                        id: "008254717758424768",
                        category: "UNOFFICIAL",
                        pseudo: "Contributor"
                    },
                    fields: {
                        createdAt: [
                            1495645176000
                        ]
                    },
                    highlight: {
                        text: [
                            "RT @info_tbm: Bordeaux Fête le Fleuve : J-@kibana-highlighted-field@2@/kibana-highlighted-field@ ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…"
                        ]
                    },
                    sort: [
                        1495645176000
                    ]
                },
                {
                    _index: "social-network",
                    _type: "tweet",
                    _id: "AVxZpvKy9XxBDkV0m9I8",
                    _score: 0,
                    _source: {
                        hashtags: ["test"],
                        feeling: 0.92,
                        type: "T",
                        tags: ["test"],
                        createdAt: "2017-05-24T10:22:50Z",
                        meta: {
                            documentType: "tweet",
                            index: "social-network"
                        },
                        mentions: [
                            "info_tbm"
                        ],
                        text: "RT @info_tbm: Bordeaux Fête le Fleuve : J-2 ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…",
                        id: "457037437700523768",
                        category: "UNOFFICIAL",
                        pseudo: "Contributor"
                    },
                    fields: {
                        createdAt: [
                            1495621370000
                        ],
                    },
                    highlight: {
                        text: [
                            "RT @info_tbm: Bordeaux Fête le Fleuve : J-@kibana-highlighted-field@2@/kibana-highlighted-field@ ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…"
                        ]
                    },
                    sort: [
                        1495621370000
                    ]
                },
                {
                    _index: "social-network",
                    _type: "tweet",
                    _id: "AVxZpvKy9XxBDkV0m9I9",
                    _score: 0,
                    _source: {
                        hashtags: ["test!1"],
                        feeling: 0.74,
                        type: "RT",
                        tags: ["test!1"],
                        createdAt: "2017-05-24T09:42:35Z",
                        meta: {
                            documentType: "tweet",
                            index: "social-network"
                        }
                        ,
                        mentions: [
                            "info_tbm"
                        ],
                        text: "RT @info_tbm: Bordeaux Fête le Fleuve : J-2 ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…",
                        id: "409306845678413768",
                        category: "UNOFFICIAL",
                        pseudo: "Contributor"
                    }
                    ,
                    fields: {
                        createdAt: [
                            1495618955000
                        ]
                    }
                    ,
                    highlight: {
                        text: [
                            "RT @info_tbm: Bordeaux Fête le Fleuve : J-@kibana-highlighted-field@2@/kibana-highlighted-field@ ! Pensez au tickarte 1 jour dispo en mTicketTBM (smartphone) pour l'occasion :) ! https://t.co/…"
                        ]
                    }
                    ,
                    sort: [
                        1495618955000
                    ]
                }
            ],
            total: 16,
            max_score: 0
        },
        aggregations: {
            2: {
                buckets: [
                    {
                        key_as_string: "2017-05-01T00:00:00.000+02:00",
                        key: 1493589600000,
                        doc_count: 16
                    }
                ]
            }
        }
    }
    ;
}
