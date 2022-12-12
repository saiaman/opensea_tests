(async()=>{
    const { OpenSeaStreamClient, Network } = require('@opensea/stream-js');
    const WebSocket=require("ws")
    const AWS=require('aws-sdk')
    let snsClient=AWS.SNS()
    const client = new OpenSeaStreamClient({
      network: Network.MAINNET,
      token: 'openseaApiKey',
      connectOptions: {
        transport: WebSocket
      }
    });

    await client.connect();

    client.onItemListed('myformidablecollection', async (event) => {
        var params = {
            Message: JSON.stringify(event),
            TopicArn: 'arn:aws:sns:us-east-2:444455556666:opensea'
          };
          
        await snsClient.publish(params).promise();
    });
      
})()