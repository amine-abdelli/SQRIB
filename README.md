## Getting Started
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# SQRIB
This is a monorepo based on Yarn workspaces and turborepo. It contains several projects that work together to bring the sqrib project to life.

## Available Scripts

In the project directory, you can run:

### `yarn start`
Turborepo will run scripts to run all projects from packages folder

### `yarn test`

Turborepo will run scripts to test all projects from packages folder

### `yarn build`

Turborepo will run scripts to build all projects from packages folder

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
