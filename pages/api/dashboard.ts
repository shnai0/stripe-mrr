import { NextApiRequest, NextApiResponse } from "next";
import { getCombinedData } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getCombinedData();
      res.status(200).json(data);
    } catch (error) {
      console.error("API route error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
