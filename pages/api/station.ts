import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prisma/prismaClient";
import { number } from "react-admin";

import { IStationInReach } from "../../types/interfaces";

// to see if given query was already calculated
async function checkDB(posX: number, posY: number) {
    return await prismaClient.previous_results.findMany({
        where: {
            pos_x: posX,
            pos_y: posY,
        },
        select: {
            station_x: true,
            station_y: true,
            speed: true,
        },
    });
}

// to calculate best possible station for given inputs
function findStation(posX: number, posY: number) {
    console.log(posX, posY);

    // to-do: get all stations from db
    const stations = [
        { pos_x: 0, pos_y: 0, reach: 9 },
        { pos_x: 20, pos_y: 20, reach: 6 },
        { pos_x: 10, pos_y: 0, reach: 12 },
        { pos_x: 5, pos_y: 5, reach: 13 },
        { pos_x: 99, pos_y: 25, reach: 2 },
    ];
    // initialize array for stations in reach
    let stationsInReach: IStationInReach[] = [];
    // calculate if in reach and speed for each station
    stations.map((station) => {
        // calculate distance between user input and station
        const distance = Math.sqrt(
            Math.pow(posX - station.pos_x, 2) +
                Math.pow(posY - station.pos_y, 2)
        );
        // calculate speed for station if in reach
        if (distance <= station.reach) {
            let speed = Math.pow(station.reach - distance, 2);
            stationsInReach.push({
                station_x: station.pos_x,
                station_y: station.pos_y,
                speed: speed,
            });
        }
    });
    // sort by speed, descending
    stationsInReach.sort((a, b) => {
        return b.speed - a.speed;
    });
    // return stations in reach
    return stationsInReach;
}

// to save result to db
async function saveResult(
    posX: number,
    posY: number,
    stationsInReach: IStationInReach[]
) {
    // initialize result object
    let result = {};
    // to avoid invalid invocation with null values
    if (stationsInReach.length > 0) {
        result = {
            pos_x: posX,
            pos_y: posY,
            station_x: stationsInReach[0].station_x,
            station_y: stationsInReach[0].station_y,
            speed: stationsInReach[0].speed,
        };
    } else {
        result = {
            pos_x: posX,
            pos_y: posY,
        };
    }
    await prismaClient.previous_results.create({
        data: result,
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // check db if result for input exists
        const station = await checkDB(req.body.posX, req.body.posY);
        if (station.length > 0) {
            // return value from db if exists
            res.status(200).json(station[0]);
        } else {
            // calculate best station for given input
            const stationsInReach = findStation(req.body.posX, req.body.posY);
            // save result to db
            await saveResult(req.body.posX, req.body.posY, stationsInReach);
            // set null if no station in reach for given input to make testable
            if (stationsInReach.length === 0) {
                stationsInReach.push({
                    station_x: null,
                    station_y: null,
                    speed: null,
                });
            }
            // return calculated result
            res.status(200).json(stationsInReach[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ name: "error" });
    }
}
