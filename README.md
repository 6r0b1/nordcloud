This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Important Preparation:

Use Node Version Manager to specify Node Version 16.19.0

## Getting Started

After cloning repo create a postgres database "stationfinder"

$ touch .env
$ nano .env

Add to file:
DATABASE_URL="postgresql://[yourPostgresUser]:[yourPostgresPassword]@localhost:5432/stationfinder?schema=public"

$ npm install

$ npx prisma migrate dev

$ npm run build

$ npm start

You should now have the app running at localhost:3000

## Testing

## Notes on tests

Tests for User Inputs (15, 10) and (18, 18) fail on fresh database.
api/station function checkDB and function findStation respond with slightly different values for speed (10.05887450304572 vs 10.05887450304572 for instance).
On second run all tests will pass since mock reqests will then be answered by function checkDB wich gives the expected values.
This is probably due to prisma/postgres rounding earlier.

## Notes end

Testing is implemented using Jest.

Tests are specified for /api/station including:

Test for expected status codes
Tests for expected error messages
Tests for expected responses using input values specified in the asignment:
(0, 0), (100, 100), (15, 10), (18, 18), (13, 13) and (25, 99)

Start tests:

$ npm run test
