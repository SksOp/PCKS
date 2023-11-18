This is a service github repo for _Prem Chandra Kids School, Sitamarhi_. This repo contains the source code for easy managing students data and their results.

## Installation

1. Clone the repo
2. Install the dependencies

```bash
yarn
```

## Folder Structure

```bash
├── README.md
├── package.json # workspace and high level scripts
├── packages
│   ├── theme # theme package
│   └──  types # types package
├── app # react app in typescript
├── desktop # electron app in javascript
├── functions # firebase functions in typescript
|── scripts # scripts for managing secrets and other stuff
```

## Web App (app)

This is a react app in typescript. It uses firebase for authentication and firestore for database. It uses material-ui for UI components.

## Server (functions)

This is a firebase functions project in typescript. It uses firebase firestore for database.

## Desktop App (desktop)

This is an electron app in javascript. It uses react for UI components. It is just to download all the result of certain batch and certain year in pdf format.

### How to run locally

1. open two terminals
2. In first terminal run React app

```bash
yarn start:web
```

> To run the web app you will need a .env and .env.local file in app folder. Contact your admin for these files. 3. In second terminal run firebase functions. In .env.local file add server local url or you can just use it in the .env file

```bash
yarn start:server
```

#### Run Desktop App (Optional)

4. In third terminal run electron app

```bash
yarn start:app
```

> To run the desktop electrone app you will need a service_key.json file in desktop/src/utils folder. You can get this file from firebase console.

## Database Structure

For all the process that are running in development mode, we are using a development collection in firestore, for example, for development collection of results we are using `results_dev` collection. For production we are using `results` collection.

# TODOs

- [ ] After adding the results details in webapp, navigate to the results page/ result preview page
- [ ] Change the order of term in electron app
- [ ] Add firebase rules for firestore
- [ ] In result preview page, change order of the maximum marks and marks obtained
