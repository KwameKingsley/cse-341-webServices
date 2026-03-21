const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API',
        description: 'Users API for CSE 341 Web Services'
    },
    host: 'https://github.com/KwameKingsley/cse-341-webServices',
    schemes: ['https, http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);