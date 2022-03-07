const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { ottoman } = require('./ottoman-global-config');
const { HotelRoutes } = require('./src/hotels/hotels.controller');
const { TestRoutes } = require('./src/test/test.controller');
const { AirportRoutes } = require('./src/airports/airports.controller');
const { FlightRoutes } = require('./src/flights/flights.controller');
const { CertificateAuthenticator } = require('ottoman')

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('I am ready!!');
});
app.use('/hotels', HotelRoutes);
app.use('/test', TestRoutes);
app.use('/airports', AirportRoutes);
app.use('/flightPaths', FlightRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

app.use((err, req, res, next) => {
  return res.status(500).json({ error: err.toString() });
});

const main = async () => {
  try {
    await ottoman.connect({
      connectionString: 'couchbases://cb.njjncqp3bpvutz.cloud.couchbase.com',
      bucketName: 'travel-sample',
      username: 'test',
      password: 'Helloworld890!',
      trustStorePath: "cert.pem"
    })

    await ottoman.start();

    const port = 4500;
    app.listen(port, () => {
      console.log(`API started at http://localhost:${port}`);
      console.log(`API docs at http://localhost:${port}/api-docs/`);
    });
  } catch (e) {
    console.log("********");
    console.log(e)
  }
}

main();

