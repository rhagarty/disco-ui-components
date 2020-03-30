# disco-ui-components

This is a temporary repo to test using Discovery UI components found here:

* https://github.com/watson-developer-cloud/discovery-components

This code is taken from an existing Code Pattern:

* https://github.com/IBM/watson-discovery-ui

This includes the following features:

* NodeJS/Express/React
* Semantic UI Components
* Uses Discovery on Cloud Pak for Data
* Discovery collection is AirBnb data from Austin

>**NOTE:** I tried to remove all unneeded code, but I'm sure I missed some.

The important files are:
* watson-discovery-ui/server/index.js
* watson-discovery-ui/src/index.js
* watson-discovery-ui/src/main.js

To run:

* Add CPD credentials to local `.env` file
* Then run:

```bash
cd watson-discovery-ui
npm install
npm start
```

Then point browser at `http://localhost:3000`
