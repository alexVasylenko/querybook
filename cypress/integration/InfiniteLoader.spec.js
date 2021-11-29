function generateSchemas(offset) {
    return Array.from({ length: 30 }).map((_, i) => ({
        created_at: 1631525657,
        description: null,
        id: offset + i,
        metastore_id: 1,
        name: `main ${offset + i}`,
        table_count: 6,
        updated_at: 1631525657,
    }));
}

describe('Infinite loader', () => {
    beforeEach(() => {
        cy.intercept('/ds/utils/change_logs/*', {
            fixture: 'utils/change_logs',
        }).as('ChangeLogs');
        cy.intercept(
            '/ds/search/tables/?params=%7B%22metastore_id%22:1,%22keywords%22:%22%22,%22filters%22:[[%22schema%22,%22main+1%22]],%22limit%22:100,%22concise%22:true,%22fields%22:[%22table_name%22],%22sort_key%22:%22name%22,%22sort_order%22:%22asc%22%7D',
            {
                fixture: 'search/tables',
            }
        ).as('TableData');
        cy.intercept(/\/ds\/schemas/, (req) => {
            const params = JSON.parse(req.query.params);
            req.reply(200, {
                data: {
                    done: params.offset === 60,
                    results: generateSchemas(params.offset),
                },
            });
        }).as('DefaultSchema');
        cy.intercept('/ds/datadoc/*', {
            fixture: 'datadocs/datadoc',
        });
        cy.intercept('/ds/query_execution/search/*', {
            fixture: 'query_execution/search',
        });
        cy.intercept('/ds/datadoc/*', {
            fixture: 'datadocs/datadoc_env',
        });
        cy.intercept('/ds/query_metastore/*', {
            fixture: 'query_metastore',
        });
        cy.intercept('/ds/query_engine/*', {
            fixture: 'query_engine',
        });
        cy.intercept('/ds/user/me/', { fixture: 'user/me' }).as('getUsers');
        cy.intercept('/ds/user/setting/', { fixture: 'user/setting' }).as(
            'getConfig'
        );

        cy.intercept('/ds/announcement', { fixture: 'announcement' }).as(
            'getAnnouncements'
        );

        cy.intercept('/ds/user/environment/', {
            fixture: 'user/environment',
        }).as('getEnvironment');

        cy.intercept('/ds/query_execution_exporter/', {
            fixture: 'query_execution/exporter',
        }).as('getExecution');

        cy.intercept('/ds/user/notifiers/', { fixture: 'user/notifiers' }).as(
            'getExecution'
        );
    });

    it('a user can load schemas list and open a schema', () => {
        cy.visit('http://localhost:9000');
        cy.get('[aria-label="Tables"]').click();
        cy.get('[aria-label="expand-table-main 1"]').click();
        cy.wait('@TableData');
        cy.get('[aria-label="list-of-schema-main 1"]')
            .then((el) => {
                return el[0].innerText;
            })
            .snapshot();
    });

    it('a user can load more schemas and if we get done=true a new tables will not be loaded', () => {
        cy.visit('http://localhost:9000');
        cy.get('[aria-label="Tables"]').click();

        cy.get('[aria-label="Tables"]').click();
        cy.wait('@DefaultSchema');
        cy.get(`DefaultSchema.all`).then((calls) => {
            cy.wrap(calls.length).should(`equal`, 1);
        });

        cy.get('[aria-label="schemas-list"]').then(($div) => {
            $div[0].lastChild.scrollIntoView();
        });
        cy.wait('@DefaultSchema');
        cy.get(`DefaultSchema.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 2);
        });

        cy.get('[aria-label="schemas-list"]').then(($div) => {
            $div[0].lastChild.scrollIntoView();
        });
        cy.wait('@DefaultSchema');
        cy.get(`DefaultSchema.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 3);
        });

        cy.get('[aria-label="schemas-list"]').then(($div) => {
            $div[0].lastChild.scrollIntoView();
        });
        cy.wait(1000);
        cy.get(`DefaultSchema.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 3);
        });
    });

    it('user can open schema and download table more than ones', () => {
        cy.visit('http://localhost:9000');
        cy.get('[aria-label="Tables"]').click();

        cy.get('[aria-label="expand-table-main 1"]').click();
        cy.get('[aria-label="list-of-schema-main 1"]').then(($div) => {
            $div[0].scrollBy(0, 2800);
        });
        cy.wait('@TableData');
        cy.get(`TableData.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 1);
        });

        cy.get('.ReactVirtualized__List').then(($div) => {
            $div[0].scrollBy(0, 2800);
        });
        cy.wait('@TableData');
        cy.get(`TableData.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 2);
        });

        cy.get('.ReactVirtualized__List').then(($div) => {
            $div[0].scrollBy(0, 2800);
        });
        cy.wait('@TableData');
        cy.get(`TableData.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 3);
        });

        cy.get('.ReactVirtualized__List').then(($div) => {
            $div[0].scrollBy(0, 4000);
        });
        cy.wait('@TableData');
        cy.get(`TableData.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 4);
        });

        cy.get('.ReactVirtualized__List').then(($div) => {
            $div[0].scrollBy(0, 2800);
        });
        cy.wait('@TableData');
        cy.get(`TableData.all`).then((calls) => {
            cy.wrap(calls.length).should('equal', 5);
        });
    });
});
