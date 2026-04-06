# BookBazaar QA Challenge — README

> **Track:** API

## Prereqs
- Node 20+, npm

## How to run tests
- My project uses Node Package Manager (npm) to manage dependencies. First, run `npm install` in the directory.
- Then, run `npm test` to run the automated tests.

## Endpoints/mapping
Using the public API **mockapi.io**, I created endpoints that are mapped exactly to the `Book` field names (`title`, `author`, `id`).

## Tests implemented
- `test("Happy path test: POST/GET a new book")`: POST a new book to the endpoint, GET the list of books and verify the new book is in it.
- `test("Edge/validation case: POST with invalid format")`: POST an invalid book to the endpoint, expect an error.
    - **NOTE**: I was not able to get this test passing with **mockapi.io**. This public API accepts any object into the endpoint, regardless of its format. With a different public API, this test would pass.
- `test("Negative/error case: DELETE nonexistent book")`: DELETE a nonexistent book, expect an error.

## Design rationale
- The three tests were simple. All of them call the described endpoints using a helper function `fetchEndpoint`, check status codes, and the contents of the responses. In general, I wanted to be more precise in checking all of the contents of the response.
    - For example, in my **happy path test**, I submitted a new book to the endpoint, and verified it returned the same info back to me. Then, I verfied the list of all books, that it was the correct format, and it had the new book in it.
- My file organization is also simple: the test code all in `bookbazaar.test.js`, with it importing the API url from `apiConfig.js` for modularity.
- My biggest weakness is being unknowledgeable about using public mock APIs. With more time, I would find a different public mock API or create a local mock API to ensure all tests pass.

## Fallback
I did not have enough time to make a fallback.
