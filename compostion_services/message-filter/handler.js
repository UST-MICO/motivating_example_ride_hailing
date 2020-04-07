"use strict"
// { "cloudEvent": {"id": 1, "time": 11111, "source": "someSource", "data": { "timestamp": 1111, "customerRating": 9, "customerName": "Chris"}}, "patternConfig": { "key": "customerName", "comparison_value": "Chris", "comparison_sign": "equal"}}
// {"cloudEvent":{"id": 1, "source": "someSource", "data": { "timestamp": 1111, "customerRating": 9, "customerName": "Chris"}}, "patternConfig" :{ "key": "customerName", "comparison_value": "Chris", "comparison_sign": "equal"}}
module.exports = async (functionInput, callback) => {

    functionInput = JSON.parse(functionInput);
    const cloudEventMessage = functionInput.cloudEvent;
    const eventData = cloudEventMessage.data;
    const routerConfig = functionInput.patternConfig;
    let result = []
    //const routerConfig = require('./config.json');
    const comparisons = {
        GREATER: 'greater',
        LESS: 'less',
        EQUAL: 'equal',
        GREATEROREQUAL: 'greaterorequal',
        LESSOREQUAL: 'lessorequal',
        NOTEQUAL: 'notequal'
    }

    //return functionInput;
    // only return messages that match the criteria defined in the routerConfig 
    if (isMatchingCriteria(eventData, routerConfig)) {
        result.push(cloudEventMessage);

    }

    return result;

    function isMatchingCriteria(data, criteria) {
        switch (criteria.comparison_sign) {
            case comparisons.GREATER:
                return data[criteria.key] > criteria.comparison_value;
            case comparisons.LESS:
                return data[criteria.key] < criteria.comparison_value;
            case comparisons.EQUAL:
                return data[criteria.key] === criteria.comparison_value;
            case comparisons.GREATEROREQUAL:
                return data[criteria.key] >= criteria.comparison_value;
            case comparisons.LESSOREQUAL:
                return data[criteria.key] <= criteria.comparison_value;
            case comparisons.NOTEQUAL:
                return data[criteria.key] !== criteria.comparison_value;
        }
    }
}
