// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../prisma/prismaClient";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req.body.posX);
    const station = await prismaClient.station.findMany({
        where: {
            pos_x: req.body.posX,
            pos_y: req.body.posY,
        },
    });
    console.log(station);

    res.status(200).json({ name: "John Doe" });
}
