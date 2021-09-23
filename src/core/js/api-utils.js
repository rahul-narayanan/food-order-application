/* eslint-disable no-await-in-loop */
import AWS from "aws-sdk";

// Remove this code when deploying to production
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
});

const DocClient = new AWS.DynamoDB.DocumentClient();

export const readAllItemsFromTable = async (params = {
    TableName: "",
    key: {}
}) => {
    const scanResults = [];
    let items;
    do {
        items = await DocClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
};

export const readLastItemFromTable = async (tableName) => {
    const scanResults = [];
    let items;
    const params = {
        TableName: tableName,
        Limit: 1,
        ScanIndexForward: false
    };
    do {
        items = await DocClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults[0] || null;
};

export const queryItemsFromTable = async (params) => {
    const scanResults = [];
    let items;
    do {
        items = await DocClient.query(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
};

export const putItemIntoTable = async (params) => {
    const response = await DocClient.put(params).promise();
    return response;
};
