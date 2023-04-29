import { render, screen } from "@testing-library/react";
import findStaionHandler from "../pages/api/station";
import "@testing-library/jest-dom";
import { RequestMethod, createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

// write a test for the api station
// 1. test if the api returns a 200 status code
// 2. test if the api returns a json object

describe("api/station", () => {
    it("should return a 200 status code", async () => {
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

    it("should return a json object", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                posX: 6,
                posY: 6,
            },
        });

        await findStaionHandler(req, res);

        expect(res._getJSONData()).toEqual(
            expect.objectContaining({
                station_x: 5,
                station_y: 5,
                speed: 134.2304473782995,
            })
        );
    });
});
