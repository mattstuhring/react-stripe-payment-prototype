# React Express Bootstrap Starter App

Simple starter app using React, Express, and Bootstrap.

## Description

Built to support RESTful API prototyping.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Then an Express server was added in the `server` directory. The server is proxied via the `proxy` key in `package.json`.

### Dependencies

Client:

- React v18
- React Router Dom v6
- Bootstrap v5

Server:

- NodeJS v16
- Express v4

## Using this project

1. Clone the project, change into the directory and install the dependencies.

   ```bash
   git clone https://github.com/mattstuhring/react-express-starter-app.git
   cd react-express-starter-app
   npm install
   cd client
   npm install
   cd .. && cd server
   npm install
   ```

2. Start the server

   You can start dev servers in the root directory using the command:

   ```bash
   npm start
   ```

   The React application will run on port 3000 and the server port 3001.

## Authors

Contributors names and contact info can be found here.

Matt Stuhring - https://www.linkedin.com/in/mattstuhring/

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the MIT License.
