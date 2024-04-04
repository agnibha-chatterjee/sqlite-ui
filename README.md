# SQLite UI

A simple GUI tool for SQLite databases.

## Updates

Many portions of the app were re-written to follow a more functional style of programming, the app now uses functional React components instead of class-based components.

**New**: Added a bunch of E2E tests

## E2E Tests

### User Flow 1 - Viewing tips and tricks

This set of tests checks the functionality related to the display and interaction with the tips and tricks modal.

- **renders the banner**: Checks if the banner with the text "SQLite UI" is rendered correctly.
- **renders the button to show some helpful tips**: Verifies that the button to show tips is rendered and contains the correct text.
- **opens the tips modal when the show tips button is clicked**: Ensures that the tips modal is displayed when the show tips button is clicked.
- **tips modal has 3 tips**: Confirms that the tips modal contains exactly 3 tips.
- **hitting the close button on the tips modal closes the modal**: Checks if the tips modal closes when the close button is clicked.

### User Flow 2 - Loading the sample db

This set of tests verifies the functionality related to loading a sample database.

- **renders the file drop off component**: Checks if the file upload component is rendered correctly.
- **renders the load a sample db text correctly**: Ensures that the text for loading a sample database is rendered correctly.
- **clicking the load a sample db button, loads the sample database**: Verifies that clicking the button loads the sample database successfully.

### User Flow 3 - Selecting different tables in the database

This set of tests checks the functionality related to selecting different tables in the loaded database.

- **renders the sample database along with the database tables component**: Ensures that the database viewer and tables component are rendered correctly after loading the sample database.
- **clicking the selected table dropdown shows the list of database tables**: Checks if the dropdown menu shows the list of tables when clicked.
- **by default the first table is selected**: Confirms that the first table in the dropdown is selected by default.
- **clicking an option in the dropdown successfully selects it**: Verifies that clicking an option in the dropdown successfully selects that table.

### User Flow 4 - Executing correct custom queries works as intended

This set of tests checks the functionality related to executing custom queries and displaying their results.

- **renders the query editor and the query result**: Ensures that the query editor and the query result components are rendered correctly.
- **executes a query and displays the result**: Verifies that a custom query can be executed and its result is displayed correctly.

### User Flow 5 - Executing incorrect custom queries works as intended (i.e. the query error component is rendered)

This set of tests verifies the functionality related to executing incorrect custom queries and displaying error messages.

- **executing a query on a table that does not exist displays an error**: Checks if an error is displayed when a query is executed on a non-existent table.
- **executing a query on a table that does not exist displays the correct error message**: Ensures that the correct error message is displayed when a query is executed on a non-existent table.

### User Flow 6 - Query history updates as expected

This set of tests checks the functionality related to updating the query history.

- **executing a valid query adds it to the query history**: Verifies that a valid query is added to the query history.
- **executing an invalid query does not add it to the query history**: Ensures that an invalid query is not added to the query history.

### User Flow 7 - Persisting and clearing query history works as expected

This set of tests verifies the functionality related to persisting and clearing the query history.

- **persisting query history survives a page refresh**: Checks if the persisted query history is retained after a page refresh.
- **persisting query history adds correct local storage entry**: Ensures that the correct entry is added to the local storage when the query history is persisted.
- **clearing query history removes all previous history items from the UI**: Verifies that clearing the query history removes all items from the UI.
- **clearing query history removes all previous history items from local storage**: Ensures that clearing the query history removes all items from the local storage.

## Design Document

[Link to document](https://docs.google.com/document/d/1RKbaiCt2x4ijkt0R4R44YsqSmyY2WY0hJYDRh6K7rKI/edit?usp=sharing)

## Description

This was built as a project for the Programming Design Paradigms (CS5010) course.
SQLite UI is a web application designed to provide a user-friendly interface for managing SQLite database files. It allows users to upload, and view, database files, perform CRUD operations, through custom SQL queries through a graphical user interface (GUI). The application is built with convenience, and efficiency in mind.

## Features

- Upload SQLite Database Files: Users can upload SQLite database files with extensions .db or .sqlite through a web-based interface.
- Manage Database Files: Provides functionality for users to view and query their uploaded database files within the web interface.
- Query Editor: Includes a query editor that allows users to write and execute custom SQL queries against the uploaded database for advanced manipulation and analysis.
- Query Storage: Stores previously run queries so that they can be reused by users for convenience and efficiency.
- Input Validation: Implements robust input validation to ensure that all user inputs, including file uploads and SQL queries, are sanitized to prevent malicious data processing.
- Secure File Upload: As this is a purely frontend application, your data never leaves the browser.
- User-Friendly Design: Designed to be user-friendly, catering to users with varying levels of technical expertise and SQL knowledge.

## Getting Started

To test SQLite UI locally, follow these steps:

- Clone the repository to your local machine.
  `git clone https://github.com/agnibha-chatterjee/sqlite-ui.git`
- Install the required dependencies.
  `npm install`
- Start the application server.
  `npm run dev`
- Access the application through your web browser at the specified address.
  `http://localhost:5173`

## Walkthrough

[![IMAGE ALT TEXT](http://img.youtube.com/vi/X7hLOfgtfNg/0.jpg)](http://www.youtube.com/watch?v=X7hLOfgtfNg "SQLite UI")

## Liscense

This project is licensed under the MIT License - see the LICENSE file for details.
