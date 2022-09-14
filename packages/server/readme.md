You might need prisma installed globally and postgresql.

## Setting up your local env
Create a `.env` file, with the following structure :
```bash
DATABASE_URL="postgresql://<your-database-user-name>:<your-database-password>@localhost:5432/sqrib?schema=public"
FRONTEND_URL=<your-localhost-frontend-url> # e.g: http://localhost:3000
PORT=<your-server-port> # e.g: 4000
TOKEN_PRIVATE_KEY=<type-anything-you-want-here> 
```

## Available Scripts

In the **server** directory, you can run:

### `yarn start`
Runs the server on port 4000 in the development mode.\

### `yarn test`

Launches the test runner.\

### `yarn build`

Builds the app for production to the `dist` folder.\
