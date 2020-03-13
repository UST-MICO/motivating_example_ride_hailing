module.exports = {
    KAFKA_BOOTSTRAP_SERVERS: process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092',
    //KAFKA_TOPIC_OUTPUT: process.env.KAFKA_TOPIC_OUTPUT || 'test-message-generator',
    KAFKA_TOPIC_INPUT: process.env.KAFKA_TOPIC_INPUT || 'ride_management_service'
}
