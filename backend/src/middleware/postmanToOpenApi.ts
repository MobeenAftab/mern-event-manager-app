import path from 'path';
import postmanToOpenApi from 'postman-to-openapi';

/**
 *
 */

const postmanCollection = path.join(
  __dirname,
  '..',
  'models',
  'Workouts.postman_collection.json'
);
const outputFile = path.join(__dirname, '..', 'models', 'swag.json');

// Promise callback style
postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' })
  .then((result) => {
    console.log(`OpenAPI specs: ${result}`);
  })
  .catch((err) => {
    console.log(err);
  });
