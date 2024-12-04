# Overview

Your challenge, should you choose to accept it, is to:

-   Start a local MongoDB server. If you have Docker installed, you can do this with `docker run -p 27017:27017 mongo:6.0.12`, or if you don't have Docker you could try using the `mongodb-memory-server` NPM package.

-   Enhance this starter application so that upon startup it loads the data from [./src/quotes.ts](./src/quotes.ts) into a MongoDB collection named 'prices'.

-   Using [Express](http://expressjs.com/), create a `prices` GET REST API to retrieve the contents of the collection using the [MongoDB query API](https://docs.mongodb.com/manual/tutorial/query-documents/), returning the results to the caller as an array of JSON documents. It should be possible to call the API from a browser. 12 documents should be returned.

-   Create a second `averagePrices` GET REST API which uses the [MongoDB Aggregation API](https://docs.mongodb.com/manual/aggregation/) to group documents by their 'symbol' and calculate the average price, returning the results to the caller as an array of JSON documents, each containing the symbol and the average price. 4 documents should be returned from each call to the API.

-   Enhance the second REST API so that as well as returning each symbol with its average price, a current price is also returned, with 
    this price being retrieved via a REST API call.

    Given that financial data APIs generally require a paid subscription, we would like you to simulate a financial REST API call
    by invoking the [csrng.net](https://csrng.net/documentation/csrng-lite/) random number generator.

    You should:

    - Invoke the API with a max and min parameters set to be +-5 of the calculated average price. E.g. if the average price
          is 55 then you would invoke the API call with min=50 and max=60.

    - Add code to handle the rate limit restriction on the API call of 1 call per second to ensure no errors are returned

    This external URL can be hardcoded and your code does not have to include any error handling.

To complete this challenge you can and should:

-   Use the internet to help answer any questions that you do not yourself know the answer to.

-   Use NPM or Yarn to add [Axios](https://www.npmjs.com/package/axios) to this project (For making REST calls). If you prefer to use a different REST client you are free to do so.

-   Feel free to refactor or re-organise the code in any way you choose.

-   Manually test your code.

It is not expected that you will write any automated tests.

If you have not used TypeScript before, it is a superset of JavaScript so you should be able to write JavaScript code without any problems. If you prefer to write in JavaScript this is not a problem but you will need to amend some of the scripts in package.json to run from the src directory instead of the lib directory.

## Notes about this starter project:

You will need to run NPM or Yarn to install dependencies and compile the TypeScript code. For example:

```
npm run compile
```

or

```
yarn compile
```

If you wish, you can use the 'Tasks->Run Build Task' in VS Code to watch the TypeScript for changes and build on demand, or do this manually using:

```
npm run watch
yarn watch
```

The application can be started in development mode by running:

```
npm run dev
```

or

```
yarn dev
```

Once running, the application should restart when changes to the **JavaScript** are detected.

You can verify that the app has started and is listening to requests by invoking the http://localhost:30010/ping endpoint in browser.