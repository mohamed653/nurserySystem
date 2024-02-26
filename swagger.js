const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Nursery system',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger-output.json';
const routes = ['./Route/teacherRoutes.js','./Route/classesRoutes.js','./Route/childsRoutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);