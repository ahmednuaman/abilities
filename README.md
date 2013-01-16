# abilities

A test suite of tests to check device abilities.

## Setting it up
1. Set up your database using the `structure.sql` file as a base.
2. Check that everything's working correctly by running `casperjs` tests (making sure you update `unittests/config.js.example` with the API url and renaming to `config.js`): `cd unittests && casperjs test --includes=config.js test_*.js`.