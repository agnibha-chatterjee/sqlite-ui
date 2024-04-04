/* global cy */

/*
You will see the use of { force: true } in the code. This is because Cypress has a feature called "Actionability" which is a feature that ensures that the element is in a state where it can be interacted with. If the element is not in an actionable state, Cypress will not interact with it. The { force: true } option is used to bypass this feature and interact with the element regardless of its state. This is useful when you want to interact with an element that is not in an actionable state.

Docs : https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Forcing
*/

describe("SQLite UI", () => {
  const urlToVisit = "https://sqlite-ui.netlify.app";

  beforeEach(() => {
    cy.visit(urlToVisit);
  });

  it("the local application correctly loads", () => {
    cy.visit(urlToVisit);
  });

  describe("User Flow 1 - Viewing tips and tricks", () => {
    it("renders the banner", () => {
      const banner = cy.get('[data-cy="banner"]');

      banner.should("exist");
      banner.should("have.text", "SQLite UI");
    });

    it("renders the button to show some helpful tips", () => {
      const showTipsBtn = cy.get('[data-cy="show-tips"]');
      showTipsBtn.should("exist");
      showTipsBtn.should(
        "have.text",
        "Some helpful tips (recommended if you're new to SQLite UI)"
      );
    });

    it("opens the tips modal when the show tips button is clicked", () => {
      const showTipsBtn = cy.get('[data-cy="show-tips"]');
      showTipsBtn.click();

      const tipsModal = cy.get('[data-cy="tips-modal"]');
      tipsModal.should("have.css", "display", "block");
    });

    it("tips modal has 3 tips", () => {
      const showTipsBtn = cy.get('[data-cy="show-tips"]');
      showTipsBtn.click();

      const tipsModal = cy.get('[data-cy="tips-modal"]');
      tipsModal.should("have.css", "display", "block");

      const tips = cy.get('[data-cy="tips-modal"] ol li');
      tips.should("have.length", 3);
    });

    it("hitting the close button on the tips modal closes the modal", () => {
      const showTipsBtn = cy.get('[data-cy="show-tips"]');
      showTipsBtn.click();

      cy.wait(500);

      const tipsModal = cy.get('[data-cy="tips-modal"]');
      tipsModal.should("have.css", "display", "block");

      const closeTipsBtn = cy.get('[data-cy="close-tips"]');
      closeTipsBtn.click();

      cy.wait(500);

      tipsModal.should("have.css", "display", "none");
    });
  });

  describe("User Flow 2 - Loading the sample db", () => {
    it("renders the file drop off component", () => {
      const fileUpload = cy.get('[data-cy="upload-db"]');
      fileUpload.should("exist");
    });

    it("renders the load a sample db text correctly", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.should(
        "have.text",
        "Or test the app with a sample sqlite db"
      );
    });

    it("clicking the load a sample db button, loads the sample database", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.should(
        "have.text",
        "Or test the app with a sample sqlite db"
      );

      sampleDbBtn.click();

      // If the component loads that means the database was loaded correctly
      const dbViewer = cy.get('[data-cy="db-viewer"]');
      dbViewer.should("exist");
    });
  });

  describe("User Flow 3 - Selecting different tables in the database", () => {
    it("renders the sample database along with the database tables component", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');

      sampleDbBtn.click();

      const dbViewer = cy.get('[data-cy="db-viewer"]');
      dbViewer.should("exist");

      const databaseTables = cy.get('[data-cy="database-tables"]');
      databaseTables.should("exist");
    });

    it("clicking the selected table dropdown shows the list of database tables", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');

      sampleDbBtn.click();

      const tableDropdownBtn = cy.get('[data-cy="table-dropdown-btn"]');
      tableDropdownBtn.click();
    });

    it("by default the first table is selected", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');

      sampleDbBtn.click();

      const tableOptions = cy.get('[data-cy="table-dropdown-btn"] + ul li');

      const firstOption = tableOptions.first();

      firstOption.then((option) => {
        const optionText = option.text();

        cy.get('[data-cy="table-dropdown-btn"]').should(
          "have.text",
          `Selected table: ${optionText}`
        );
      });
    });

    it("clicking an option in the dropdown successfully selects it", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');

      sampleDbBtn.click();

      const tableDropdownBtn = cy.get('[data-cy="table-dropdown-btn"]');
      tableDropdownBtn.click();

      const tableOptions = cy.get('[data-cy="table-dropdown-btn"] + ul li');

      // Selecting the last option in the dropdown menu
      const lastOption = tableOptions.last();

      lastOption.then((option) => {
        const optionText = option.text();
        option.click();

        cy.get('[data-cy="table-dropdown-btn"]').should(
          "have.text",
          `Selected table: ${optionText}`
        );
      });
    });
  });

  describe("User Flow 4 - Executing correct custom queries works as intended", () => {
    it("renders the query editor and the query result", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');

      sampleDbBtn.click();

      const dbViewer = cy.get('[data-cy="db-viewer"]');
      dbViewer.should("exist");

      const queryEditor = cy.get('[data-cy="query-editor"]');
      queryEditor.should("exist");

      const queryResult = cy.get('[data-cy="query-result"]');
      queryResult.should("exist");
    });
  });

  it("executes a query and displays the result", () => {
    const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
    sampleDbBtn.click();

    const queryEditor = cy.get('[data-cy="query-editor"] textarea');

    // Clearing input first
    queryEditor.clear({ force: true });

    // Typing in a custom query
    queryEditor.type("SELECT * FROM playlists limit 1;", { force: true });
    const runQueryBtn = cy.get('[data-cy="run-query"]');

    runQueryBtn.click({ force: true });

    // The result display with have two columns PlaylistId and Name
    const queryResultCol1 = cy.get('[data-cy="result-header-PlaylistId"]');
    const queryResultCol2 = cy.get('[data-cy="result-header-Name"]');
    queryResultCol1.should("exist");
    queryResultCol2.should("exist");
  });

  describe("User Flow 5 - Executing incorrect custom queries works as intended (i.e. the query error component is rendered)", () => {
    it("executing a query on a table that does not exist displays an error", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM some_random_table_that_does_not_exist;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      // The query component will be displayed
      const queryError = cy.get('[data-cy="query-error"]');
      queryError.should("exist");
    });

    it("executing a query on a table that does not exist displays the correct error message", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM some_random_table_that_does_not_exist;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      // The query component will be displayed
      const queryError = cy.get('[data-cy="query-error"] p');

      // The error message should be displayed
      queryError.should(
        "have.text",
        "Uh-oh! There seems to be an issue with your queryno such table: some_random_table_that_does_not_exist"
      );
    });
  });

  describe("User Flow 6 - Query history updates as expected", () => {
    it("executing a valid query adds it to the query history", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const previousQueriesContainer = cy.get(
        '[data-cy="previous-queries-container"]'
      );

      previousQueriesContainer.should("exist");

      const previousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      previousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM playlists LIMIT 1;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      // Reselecting queries
      const newPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      // Expecting the query to be added to the history
      newPreviousQueries.should("have.length", 1);
    });

    it("executing an invalid query does not add it to the query history", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const previousQueriesContainer = cy.get(
        '[data-cy="previous-queries-container"]'
      );

      previousQueriesContainer.should("exist");

      const previousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      previousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM erroneous_table;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      // Reselecting queries
      const newPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      // Expecting the query to be added to the history
      newPreviousQueries.should("have.length", 0);
    });
  });

  describe("User Flow 7 - Persisting and clearing query history works as expected", () => {
    it("persisting query history survives a page refresh", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const oldPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      oldPreviousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM playlists LIMIT 1;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      const persistHistoryBtn = cy.get('[data-cy="persist-history"]');

      persistHistoryBtn.click({ force: true });

      // Refreshing the page
      cy.reload();

      cy.get('[data-cy="load-sample-db"]').click();

      const previousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      // Because the saved query was persisted, it's initial length should be 1
      previousQueries.should("have.length", 1);
    });

    it("persisting query history adds correct local storage entry", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const oldPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      oldPreviousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM playlists LIMIT 1;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      const persistHistoryBtn = cy.get('[data-cy="persist-history"]');

      persistHistoryBtn.click({ force: true });

      cy.getAllLocalStorage().then((result) => {
        expect(result).to.deep.equal({
          [urlToVisit]: {
            "queryHistory-sample.db": '["SELECT * FROM playlists LIMIT 1;"]',
          },
        });
      });
    });

    it("clearing query history removes all previous history items from the UI", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const oldPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      oldPreviousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM playlists LIMIT 1;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      const clearHistoryBtn = cy.get('[data-cy="clear-history"]');

      clearHistoryBtn.click({ force: true });

      const previousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      // beacause the clear button was pressed, the previous queries should be empty
      previousQueries.should("have.length", 0);
    });

    it("clearing query history removes all previous history items from local storage", () => {
      const sampleDbBtn = cy.get('[data-cy="load-sample-db"]');
      sampleDbBtn.click();

      const oldPreviousQueries = cy.get(
        '[data-cy="previous-queries-container"] .card'
      );

      oldPreviousQueries.should("have.length", 0);

      const queryEditor = cy.get('[data-cy="query-editor"] textarea');

      // Clearing input first
      queryEditor.clear({ force: true });

      // Typing in a custom incorrect query
      queryEditor.type("SELECT * FROM playlists LIMIT 1;", {
        force: true,
      });
      const runQueryBtn = cy.get('[data-cy="run-query"]');

      runQueryBtn.click({ force: true });

      const clearHistoryBtn = cy.get('[data-cy="clear-history"]');

      clearHistoryBtn.click({ force: true });

      // Empty local storage
      cy.getAllLocalStorage().then((result) => {
        expect(result).to.deep.equal({});
      });
    });
  });
});
