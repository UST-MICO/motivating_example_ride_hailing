const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  console.log("hello");
  const Consumer = kafka.HighLevelConsumer;
  const client = new kafka.KafkaClient(config.KAFKA_BOOTSTRAP_SERVERS);
  let consumer = new kafka.Consumer(
    client,
    [{ topic: config.KAFKA_TOPIC_INPUT, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', async function(message) {
    console.log('here');
    console.log(
      'kafka-> ',
      message.value
    );
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}