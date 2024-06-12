# Introduction

This project is a [monorepo](/methodologies/monorepo.md) that includes a [Node.js](https://nodejs.org/en) backend server, a [React](https://react.dev/) web application, these documentation pages built with [Docsify](https://docsify.js.org/#/), and potentially a future mobile application developed with [React Native](https://reactnative.dev/).

We rely on [Git](https://git-scm.com/), to manage our codebase. Git enables us to track changes effectively, work together seamlessly, and maintain a clear record of our project's progression.

In tandem with Git, we embrace the [Conventional Commits](/methodologies/conventional-commits.md) methodology. This approach standardizes our commit messages, making them more descriptive and understandable. By adhering to a consistent format, we enhance clarity and enable automated processes such as changelog generation and versioning.

Our development strategy revolves around [Trunk-Based Development](/methodologies/trunk-based-development.md). This methodology emphasizes a shared code trunk or mainline, where all developers actively contribute. It encourages small, frequent commits and discourages long-lived feature branches, fostering rapid integration and feedback loops.

Our codebase is hosted on [GitHub](https://github.com/TomBosmans/card-vault), a leading platform for Git repositories and collaboration. Beyond version control, GitHub serves as the central hub for our [CI/CD](/methodologies/ci-cd.md) pipelines. Continuous Integration automates the process of building and testing our code with each change, ensuring its quality and stability. Simultaneously, Continuous Deployment automates the deployment of our application, facilitating swift and reliable delivery of new features and updates.
