import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prisma/prismaClient";

type Data = {
    name: string;
};

// to calculate best possible station for given inputs
function findStation(posX, posY) {
    return 23;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // check db if result for input exists
    const station = await prismaClient.previous_results.findMany({
        where: {
            pos_x: req.body.posX,
            pos_y: req.body.posY,
        },
    });
    if (station.length > 0) {
        // return value from db if exists
        res.status(200).json({ name: station[0] });
    } else {
        // calculate best station for given input
        const bestStation = findStation(req.body.posx, req.body.posY);
        console.log(bestStation);
    }
}
