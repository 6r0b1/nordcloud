import { render, screen } from "@testing-library/react";
import findStaionHandler from "../pages/api/station";
import "@testing-library/jest-dom";
import { RequestMethod, createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

describe("api/station", () => {
    // set input values and expected results
    // according to the task description
    // note: test for (15, 10) and (18, 18) will fail on the last digit
    //       when run on fresh db due to rounding errors .
    //       On 2nd run, the test will pass as db will be filled with
    //       expected results specified here.
    //       This is due to prisma/postgres storing floats with less digits.
    const testValues = [
        {
            userInput: {
                posX: 0,
                posY: 0,
            },
            expected: {
                station_x: 0,
                station_y: 0,
                speed: 81,
            },
        },
        {
            userInput: {
                posX: 100,
                posY: 100,
            },
            expected: {
                station_x: null,
                station_y: null,
                speed: null,
            },
        },
        {
            userInput: {
                posX: 15,
                posY: 10,
            },
            expected: {
                station_x: 5,
                station_y: 5,
                speed: 3.311162925027337,
            },
        },
        {
            userInput: {
                posX: 18,
                posY: 18,
            },
            expected: {
                station_x: 20,
                station_y: 20,
                speed: 10.05887450304572,
            },
        },
        {
            userInput: {
                posX: 13,
                posY: 13,
            },
            expected: {
                station_x: 5,
                station_y: 5,
                speed: 2.843579026396227,
            },
        },
        {
            userInput: {
                posX: 25,
                posY: 99,
            },
            expected: {
                station_x: null,
                station_y: null,
                speed: null,
            },
        },
    ];
    // check if query with valid input returns status 200
    it("should return a 200 status code for valid inputs", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                posX: 0,
                posY: 0,
            },
        });

        await findStaionHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
    });
    // check if api error returns status 500
    it("should return a 500 status code for invalid inputs", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                posX: "0",
                posY: 0,
            },
        });
        await findStaionHandler(req, res);

        expect(res._getStatusCode()).toBe(500);
    });
    // check if api returns json object on error
    it("should return a JSON object for invalid inputs containing error message", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                posX: "0",
                posY: 0,
            },
        });
        await findStaionHandler(req, res);
        expect(res._getJSONData()).toEqual(
            expect.objectContaining({ result: "error" })
        );
    });
    // test if api returns expected results for specified inputs
    testValues.forEach((testValue) => {
        it("should return a json object with the expected data", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "POST",
                body: testValue.userInput,
            });

            await findStaionHandler(req, res);

            expect(res._getJSONData()).toEqual(
                expect.objectContaining(testValue.expected)
            );
        });
    });
});
