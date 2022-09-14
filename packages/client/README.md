This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
# SQRIB
This is a monorepo based on Yarn workspaces and turborepo. It contains several projects that work together to bring the sqrib project to life.

## Setting up your local env
Create a `.env.local` file, with the following structure :
```bash
FRONTEND_URL=<your-localhost-frontend-url> # e.g: http://localhost:3000
SOCKET_URL=<your-localhost-socket-url> # e.g: http://localhost:4001
BACKEND_URL=<your-localhost-backend-url> # e.g: http://localhost:4000/graphql
```

## Available Scripts

In the project directory, you can run:

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

## Best practices

### General best practices
- **Do not leave commented code in the codebase**, unless you have a specific reason for it. If you do, add a comment to explain why you left that commented code.
- **Always translate** any text that is visible to the end user.

### Commit naming
We base our convetion on [conventionnal commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).
``` 
type(Scope): add an imperative message
```
- Type is limited to :
`feat, fix, chore, docs, style, refactor, perf, test`
- Scope defines what is affected by your commit. It can be a component, a general feature, a technical aspect ... E.g: `chore(CI): improve pull request checks`, `docs(best practices): xxx`, `fix(authentication): properly redirect on logout`, `style(linter): apply linter recommendations` ...
- The message must be imperative. Generally it starts with a verb. It should give a good description of what your commit does. Bad examples: `repairing stuff`, `foo`, `try something`, `qsdlkj`. Good examples : `remove unused functions`, `improve responsiveness`, ...

This may seem a little strict, but it really helps understanding changes brought to the codebase, trust me 😉.

If you struggle remembering how to format your commits, you can use [this extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).
