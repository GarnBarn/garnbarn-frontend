# garnbarn-frontend

[![Build Status](https://app.travis-ci.com/GarnBarn/garnbarn-frontend.svg?branch=master)](https://app.travis-ci.com/GarnBarn/garnbarn-frontend)
[![codecov](https://codecov.io/gh/GarnBarn/garnbarn-frontend/branch/master/graph/badge.svg?token=QwED3bFABW)](https://codecov.io/gh/GarnBarn/garnbarn-frontend)

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
