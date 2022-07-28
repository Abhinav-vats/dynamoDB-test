/**
 *  "jest": "^27.4.7",
    "@types/jest": "^27.4.0",
    "ts-jest": "^28.0.7",
    "@types/node": "^17.0.8"
 */

import { scanDataFromDb } from "../..";

 const DbScema = {
        andpt: "/string",
        reqPayload: "Abhinav",
        mtd: "POST",
        refNo: "mock-123"
    }

const mockDb = jest.fn().mockImplementation(()=>{
    return {
        promise(){
            return Promise.resolve({
                Item:[DbScema]
            });
        }
    }
});

jest.doMock('aws-sdk',()=>{
    return {
        DynamoDB:{
            DocumentClient:jest.fn(()=>({
                scan: mockDb
            }))
        }
    }
});

describe('xyz',()=>{
    it('abc', async()=>{
        const data = await scanDataFromDb("Abhinav");
        expect(data).toBe(true);
    }, 30000)
})