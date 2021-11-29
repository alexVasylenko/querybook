import * as React from 'react';
import { mount } from '@cypress/react';
import { Provider } from 'react-redux';
import configureStore from 'redux/store/configureStore';
import { SchemaTableView } from '../../querybook/webapp/components/DataTableNavigator/SchemaTableView/SchemaTableView';
import { tableRowRendererFn } from '../../querybook/webapp/components/DataTableNavigator/DataTableNavigator';

it('Button', () => {
    cy.intercept(
        {
            method: 'GET',
            url: '/ds/schemas/*',
        },
        {
            data: {
                done: false,
                results: [
                    {
                        created_at: 1631525657,
                        description: null,
                        id: 1,
                        metastore_id: 1,
                        name: 'main',
                        table_count: 6,
                        updated_at: 1631525657,
                    },
                ],
            },
            host: 'ec8952c07f85',
        }
    ).as('getUsers1');
    // http://localhost:59939/ds/schemas/?params=%7B%22metastore_id%22:1,%22limit%22:30,%22offset%22:1,%22sort_key%22:%22name%22,%22sort_order%22:%22asc%22%7D
    /* cy.intercept(
        {
            method: 'GET',
            url: 'http://localhost:59939/ds/schemas/?params=%7B%22metastore_id%22:1,%22limit%22:30,%22offset%22:1,%22sort_key%22:%22name%22,%22sort_order%22:%22asc%22%7D',
        },
        {
            data: {
                done: false,
                results: [
                    {
                        created_at: 1631525657,
                        description: null,
                        id: 1,
                        metastore_id: 1,
                        name: 'main',
                        table_count: 6,
                        updated_at: 1631525657,
                    },
                ],
            },
            host: 'ec8952c07f85',
        }
    ).as('getUsers2'); */
    mount(
        <Provider
            store={configureStore({
                adhocQuery: {
                    '1': {
                        executionId: null,
                    },
                },
                board: {
                    boardById: {
                        '1': {
                            board_type: '0',
                            created_at: 1631538681,
                            deleted_at: null,
                            description: '<p><br></p>',
                            environment_id: 1,
                            id: 1,
                            name: 'test list',
                            owner_uid: 1,
                            public: false,
                            updated_at: 1631538681,
                            docs: [8, 1, 7],
                            items: [1, 2, 3],
                            tables: [],
                        },
                    },
                    boardItemById: {
                        '1': {
                            board_id: 1,
                            created_at: 1631767104,
                            data_doc_id: 7,
                            description: null,
                            id: 1,
                            item_order: 1,
                            table_id: null,
                        },
                        '2': {
                            board_id: 1,
                            created_at: 1635189810,
                            data_doc_id: 1,
                            description: null,
                            id: 2,
                            item_order: 2,
                            table_id: null,
                        },
                        '3': {
                            board_id: 1,
                            created_at: 1635189813,
                            data_doc_id: 8,
                            description: null,
                            id: 3,
                            item_order: 3,
                            table_id: null,
                        },
                    },
                },
                dataDoc: {
                    dataDocById: {
                        '1': {
                            archived: false,
                            created_at: 1631525658,
                            environment_id: 1,
                            id: 1,
                            meta: {
                                Region: 'Western Europe',
                            },
                            owner_uid: 1,
                            public: true,
                            title: 'World Happiness Report (2015-2019)',
                            updated_at: 1631535743,
                        },
                        '2': {
                            archived: false,
                            created_at: 1631525931,
                            environment_id: 1,
                            id: 2,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1631525931,
                        },
                        '3': {
                            archived: false,
                            created_at: 1631525979,
                            environment_id: 1,
                            id: 3,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1631525979,
                        },
                        '4': {
                            archived: false,
                            created_at: 1631526738,
                            environment_id: 1,
                            id: 4,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1631526738,
                        },
                        '5': {
                            archived: false,
                            created_at: 1631538703,
                            environment_id: 1,
                            id: 5,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: 'test adHoc',
                            updated_at: 1631538772,
                        },
                        '6': {
                            archived: false,
                            created_at: 1631641261,
                            environment_id: 1,
                            id: 6,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1631641261,
                        },
                        '7': {
                            archived: false,
                            created_at: 1631767073,
                            environment_id: 1,
                            id: 7,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1631767073,
                        },
                        '8': {
                            archived: false,
                            created_at: 1631799706,
                            environment_id: 1,
                            id: 8,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: 'dsadasdas',
                            updated_at: 1631799712,
                        },
                        '9': {
                            archived: false,
                            created_at: 1634648315,
                            environment_id: 1,
                            id: 9,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1634648315,
                        },
                        '10': {
                            archived: false,
                            created_at: 1635170136,
                            environment_id: 1,
                            id: 10,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1635170136,
                        },
                        '11': {
                            archived: false,
                            created_at: 1635170162,
                            environment_id: 1,
                            id: 11,
                            meta: {},
                            owner_uid: 1,
                            public: true,
                            title: '',
                            updated_at: 1635170162,
                        },
                    },
                    dataDocCellById: {},
                    loadedEnvironmentFilterMode: {
                        '1': {
                            favorite: true,
                            recent: true,
                            mine: true,
                        },
                    },
                    favoriteDataDocIds: [],
                    recentDataDocIds: [1, 8, 9, 10, 11],
                    docIdToQueryExecution: {},
                    dataDocSavePromiseById: {},
                    sessionByDocId: {},
                    editorsByDocIdUserId: {},
                    accessRequestsByDocIdUserId: {},
                },
                querybookUI: {
                    announcements: [
                        {
                            active_from: 1636416000,
                            active_till: 1637366400,
                            can_dismiss: false,
                            id: 11,
                            message: 'fsdfsdfsdf sdfsdfsd fsdfsd fsd',
                            url_regex: '',
                        },
                    ],
                    dismissedAnnouncementIds: [1],
                    confirmation: null,
                    sidebarTableId: null,
                    dataDocNavigatorSectionOpen: {
                        recent: false,
                        favorite: false,
                        boards: true,
                        'board-1': true,
                        mine: true,
                    },
                },
                dataSources: {
                    queryMetastoreById: {
                        '1': {
                            id: 1,
                            name: 'demo_metastore',
                        },
                    },
                    goldenTableNameToId: {},
                    dataTableNameToId: {},
                    functionDocumentation: {
                        byNameByLanguage: {},
                        loading: {},
                    },
                    dataColumnsById: {},
                    dataTablesById: {},
                    dataSchemasById: {},
                    dataJobMetadataById: {},
                    dataTablesSamplesById: {},
                    dataTablesSamplesPollingById: {},
                    queryExampleIdsById: {},
                    queryTopUsersByTableId: {},
                    queryEnginesByTableId: {},
                    queryTopConcurrencesByTableId: {},
                    dataLineages: {
                        parentLineage: {},
                        childLineage: {},
                    },
                    dataTableWarningById: {},
                    dataTableOwnershipByTableId: {},
                    dataTableStatByTableId: {},
                },
                dataTableSearch: {
                    searchFilters: {},
                    searchFields: {
                        table_name: true,
                    },
                    searchString: '',
                    searchRequest: null,
                    metastoreId: null,
                    results: [],
                    count: 0,
                    schemas: {
                        schemaIds: [],
                        schemaResultById: {},
                        schemaSortByIds: {},
                        sortSchemasBy: {
                            asc: true,
                            key: 'name',
                        },
                        done: false,
                    },
                },
                environment: {
                    environmentById: {
                        '1': {
                            deleted_at: null,
                            description: 'Demo environment',
                            hidden: false,
                            id: 1,
                            image: '',
                            name: 'demo_environment',
                            public: true,
                            shareable: true,
                        },
                        '2': {
                            deleted_at: null,
                            description: '',
                            hidden: false,
                            id: 2,
                            image: '',
                            name: 'test',
                            public: true,
                            shareable: true,
                        },
                    },
                    userEnvironmentIds: {},
                    currentEnvironmentId: 1,
                    environmentEngineIds: {
                        '1': [1],
                    },
                },
                globalState: {},
                notificationService: {
                    notificationServices: [
                        {
                            name: 'email',
                        },
                    ],
                },
                queryEngine: {
                    queryEngineById: {
                        '1': {
                            description: 'SQLite Engine',
                            executor: 'sqlalchemy',
                            id: 1,
                            language: 'sqlite',
                            metastore_id: 1,
                            name: 'sqlite',
                        },
                    },
                    queryEngineStatusById: {
                        '1': {
                            data: {
                                messages: [],
                                status: 0,
                            },
                            updated_at: 1637241893.782,
                            failed: false,
                            loading: false,
                        },
                    },
                },
                queryExecutions: {
                    dataCellIdQueryExecution: {},
                    statementExecutionById: {},
                    queryExecutionById: {},
                    statementResultById: {},
                    statementLogById: {},
                    queryErrorById: {},
                    statementExporters: [],
                    accessRequestsByExecutionIdUserId: {},
                    viewersByExecutionIdUserId: {},
                },
                querySnippets: {
                    querySnippetById: {},
                    querySnippetIds: [],
                },
                queryView: {
                    filters: {
                        user: 1,
                        engine: null,
                        status: null,
                    },
                    orderBy: 'created_at',
                    queryExecutionIds: [],
                    offset: 0,
                    endOfList: false,
                    isLoading: false,
                    searchRequest: null,
                },
                search: {
                    searchRequest: null,
                    searchAuthorChoices: [
                        {
                            name: 'Alex',
                            id: 1,
                        },
                    ],
                    resultByPage: {},
                    currentPage: 0,
                    numberOfResult: 0,
                    searchFilters: {},
                    searchFields: {},
                    searchOrder: 'Relevance',
                    searchString: '',
                    searchType: 'DataDoc',
                },
                user: {
                    rawSettings: {
                        show_full_view: 'enabled',
                        theme: 'default',
                        notification_preference: 'email',
                    },
                    computedSettings: {
                        theme: 'default',
                        default_environment: null,
                        default_query_engine: '{}',
                        datadoc_arrow_key: 'enabled',
                        notification_preference: 'email',
                        show_full_view: 'enabled',
                        editor_font_size: 'medium',
                        result_font_size: 'small',
                        auto_complete: 'all',
                        tab: 'tab space 2',
                    },
                    fromWeb: true,
                    userInfoById: {
                        '1': {
                            deleted: false,
                            email: 'vasilenko131@gmail.com',
                            fullname: null,
                            id: 1,
                            profile_img: null,
                            roles: [0],
                            username: 'Alex',
                        },
                    },
                    userNameToId: {
                        Alex: 1,
                    },
                    myUserInfo: {
                        uid: 1,
                        isAdmin: true,
                    },
                },
                tag: {
                    tagItemByTableId: {},
                },
            })}
        >
            <SchemaTableView
                tableRowRenderer={(table) =>
                    tableRowRendererFn(table, () => {})
                }
                selectedTableId={1}
            />
        </Provider>
    );
    // cy.wait(400000);
    // cy.get('button').contains('Test button').click();
});
