const soap = require('soap');

const url = 'http://localhost:8000/calculator?wsdl';

soap.createClient(url, (err, client) => {
  if (err) {
    return console.error('Error creando cliente SOAP:', err);
  }

  const args = { a: 5, b: 3 };
  client.Add(args, (err, result) => {
    if (err) {
      return console.error('Error en la llamada SOAP:', err);
    }
    console.log(`El resultado de la suma es: ${result.result}`);
  });
});
