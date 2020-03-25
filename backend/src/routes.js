const express = require('express');

const ongController = require('./controller/ongController');
const incidentController = require('./controller/incidentController');
const ProffilerController = require('./controller/ProffilerController')
const SessionController = require('./controller/SessionController')
const routes = express.Router();

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profile', ProffilerController.index);

routes.post('/session',SessionController.create)

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;    