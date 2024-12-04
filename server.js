const soap = require('soap');
const http = require('http');

// Define el servicio SOAP
const service = {
  CalculatorService: {
    CalculatorPort: {
      Add: function (args) {
        const result = parseFloat(args.a) + parseFloat(args.b);
        return { result };
      },
    },
  },
};

// Define el WSDL (Web Services Description Language)
const wsdl = `
<definitions name="CalculatorService"
             targetNamespace="http://www.example.org/CalculatorService/"
             xmlns:tns="http://www.example.org/CalculatorService/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">

  <message name="AddRequest">
    <part name="a" type="xsd:float"/>
    <part name="b" type="xsd:float"/>
  </message>
  
  <message name="AddResponse">
    <part name="result" type="xsd:float"/>
  </message>
  
  <portType name="CalculatorPortType">
    <operation name="Add">
      <input message="tns:AddRequest"/>
      <output message="tns:AddResponse"/>
    </operation>
  </portType>
  
  <binding name="CalculatorBinding" type="tns:CalculatorPortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="Add">
      <soap:operation soapAction="http://www.example.org/CalculatorService/Add"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  
  <service name="CalculatorService">
    <port name="CalculatorPort" binding="tns:CalculatorBinding">
      <soap:address location="http://localhost:8000/calculator"/>
    </port>
  </service>
</definitions>
`;

// Crear el servidor HTTP
const server = http.createServer(function (req, res) {
  res.statusCode = 404;
  res.end('Not found');
});

// Configurar el servidor SOAP
soap.listen(server, '/calculator', service, wsdl);

// Iniciar el servidor
server.listen(8000, () => {
  console.log('Servidor SOAP ejecutándose en http://localhost:8000/calculator');
});
