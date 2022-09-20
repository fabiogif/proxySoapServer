var parseString = require('xml2js').parseString;
const soapRequest = require('easy-soap-request');


exports.handler = async (event, context) => {
    let response;
    
    if (!event || !event.body) {
        return {'statusCode': 400, 
                'body': JSON.stringify({message: "Enter a parameter {\"data\": number}"})
        };
    }
    
    const valueToConvert = JSON.parse(event.body).data;
    console.log ("Value Convert: " + valueToConvert);

    try {
        let valueInSring = await callSoapServer(valueToConvert);
        
        response = {'statusCode': 200, 'body': JSON.stringify({message: valueInSring})};
                    
    } catch (err) {
        return err;
    }
    
    return response;
};

async function callSoapServer (valueToConvert) {
    let ret;
    const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

    const sampleHeaders = {
      'Content-Type': 'text/xml;charset=UTF-8'
      };
      
    const xml2 = '<x:Envelope  xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" \
                        xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/"> \
                  <x:Header/> \
                  <x:Body> \
                    <cli:consultaCEP> \
                        <cep>' + valueToConvert + '</cep> \
                    </cli:consultaCEP> \
                  </x:Body> \
                </x:Envelope>';
                 
      const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml2});
      const { body } = response;
      
    console.log ("Response SOAP Server: " + JSON.stringify(response));
    
    // Parsing XML to get the value
    parseString(body, function (err, result) {
        if (!err) {
            ret = result['soap:Envelope']['soap:Body'][0]['ns2:consultaCEPResponse'][0]['return'][0];
        }
    });

    return ret;
}