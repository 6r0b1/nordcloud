import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prisma/prismaClient";
import { number } from "react-admin";

import { IStationInReach } from "../../types/interfaces";

// type Data = {
//     posX: number;
//     posY: number;
// };

// to see if given query was already calculated
async function checkDB(posX: number, posY: number) {
    return await prismaClient.previous_results.findMany({
        where: {
            pos_x: posX,
            pos_y: posY,
        },
    });
}

// to calculate best possible station for given inputs
function findStation(posX: number, posY: number) {
    console.log(posX, posY);

    // get all stations from db
    const stations = [
        [0, 0, 9],
        [20, 20, 6],
        [10, 0, 12],
        [5, 5, 13],
        [99, 25, 2],
    ];
    let stationsInReach: IStationInReach[] = [];
    // calculate if in reach and speed for each station
    stations.map((station) => {
        const distance = Math.sqrt(
            Math.pow(posX - station[0], 2) + Math.pow(posY - station[1], 2)
        );
        console.log(distance);

        if (distance <= station[2]) {
            let speed = Math.pow(station[2] - distance, 2);
            stationsInReach.push({
                stationX: station[0],
                stationY: station[1],
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
            res.status(200).json(stationsInReach[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ name: "error" });
    }
}
