# garnbarn-frontend

[![garnbarn-frontend](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/8sc6n4/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/8sc6n4/runs)
[![Vue Test](https://github.com/GarnBarn/garnbarn-frontend/actions/workflows/test.yml/badge.svg)](https://github.com/GarnBarn/garnbarn-frontend/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/GarnBarn/garnbarn-frontend/branch/master/graph/badge.svg?token=QwED3bFABW)](https://codecov.io/gh/GarnBarn/garnbarn-frontend)

## Note

Use Node v 12 to start.

## 📦 Build Steps

### 1. Install dependency

```bash
$ yarn install
```

### 2. Create the required config file

- **src/firebaseConfig.json**

  _This config file can be can be acquired from Firebase_

  ```json
  {
    "apiKey": "",
    "appId": "",
    "authDomain": "",
    "databaseURL": "",
    "measurementId": "",
    "messagingSenderId": "",
    "projectId": "",
    "storageBucket": ""
  }
  ```

- **src/GarnBarnApiConfig.json**

  _This config file contain the API Prefix for the GarnBarn API_

  ```json
  {
    "apiPrefix": "http://localhost:8080",
    "lineClientId": "1234"
  }
  ```

  > _Note: Don't include the / at the end!_

### 3. Serve locally

```bash
$ yarn serve
```

### 4. Build for Production

```bash
$ yarn build
```
