const Hapi = require('@hapi/hapi');
const routing = require('./routing');

const initialisasi = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routing);

  await server.start();
  console.log(`Server Running In : ${server.info.uri}`);
};

initialisasi();
