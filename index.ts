
import AWS from 'aws-sdk';
const ddb = new AWS.DynamoDB.DocumentClient({region:'local-env', endpoint: 'localhost:8000'});

export type DbScema = {
    andpt: string,
    reqPayload: string,
    mtd: string,
    refNo: string
}

type ParamInput = {
    TableName: string,
    FilterExpression: string,
    ExpressionAttributeNames: {
        "#a": string,
        "#m": string
    },
    ExpressionAttributeValues:{
        ":ap":string,
        ":me":string
    },
    ExclusiveStartKey:any
}

export const scanDataFromDb = async(requestBody): Promise<boolean>=>{
    let param = {
        TableName: "Table_name",
        FilterExpression: "#a = :ap AND #m = :me",
        ExpressionAttributeNames: {
            "#a": "andpt",
            "#m": "mtd"
        },
        ExpressionAttributeValues:{
            ":ap": "/string",
            ":me": "POST"
        }
    } as ParamInput;

    let record: DbScema[] =[];

    let items;
    let compareRes: boolean=false

    do{
        try{
            items = await ddb.scan(param).promise().catch(err=>{
                //console.error(err)
                throw err
            });
        }catch(err){
            const DbScema = {
                andpt: "/string",
                reqPayload: "Abhinav",
                mtd: "POST",
                refNo: "mock-123"
            }
            items = {
                Item:[DbScema]
            }
        }

        
        
        items.Items.forEach((data)=>record.push(data))

         compareRes = await someFunctionToCompare(requestBody, record);

        if(compareRes){
            break
        }

    }while(typeof items.LastEvaluatedKey!=="undefined");

    return compareRes;
}

export const someFunctionToCompare= async (requestBody: any, record: DbScema[]): Promise<boolean> =>{
    let isEqual = false
    record.forEach(data=>{
        if("requestBody"===data.reqPayload){
            isEqual = true;
        }

    });

    return isEqual;
}
