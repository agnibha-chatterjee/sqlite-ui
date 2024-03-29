# SQLite UI

A simple GUI tool for SQLite databases.

## Updates

Many portions of the app were re-written to follow a more functional style of programming, the app now uses functional React components instead of class-based components.

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
