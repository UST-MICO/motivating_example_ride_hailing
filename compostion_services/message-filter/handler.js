"use strict"

module.exports = async (event, callback) => {
    const cloudEventMessage = JSON.parse(event);
    const eventData = cloudEventMessage.data;
    const routerConfig = require('./config.json');
    const comparisons = {
        GREATER: 'greater',
        LESS: 'less',
        EQUAL: 'equal',
        GREATEROREQUAL: 'greaterorequal',
        LESSOREQUAL: 'lessorequal',
        NOTEQUAL: 'notequal'
    }

    // only return messages that match the criteria defined in the routerConfig 
    if (isMatchingCriteria(eventData, routerConfig)) {
        return event
    }

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
