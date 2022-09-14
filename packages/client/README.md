## Setting up your local env
Create a `.env.local` file, with the following structure :
```bash
FRONTEND_URL=<your-localhost-frontend-url> # e.g: http://localhost:3000
SOCKET_URL=<your-localhost-socket-url> # e.g: http://localhost:4001
BACKEND_URL=<your-localhost-backend-url> # e.g: http://localhost:4000/graphql
```

## Available Scripts

In the **client** directory, you can run:

### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `dist` folder or `.next` folder in the client package.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### General best practices
- **Do not leave commented code in the codebase**, unless you have a specific reason for it. If you do, add a comment to explain why you left that commented code.
- **Always translate** any text that is visible to the end user.
