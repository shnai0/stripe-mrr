import { NextApiRequest, NextApiResponse } from "next";
import { getCombinedData } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API route: Received request", req.method);

  if (req.method === "GET") {
    try {
      console.log("API route: Starting to fetch combined data");
      const data = await getCombinedData();
      console.log("API route: Successfully fetched combined data");
      res.status(200).json(data);
    } catch (error) {
      console.error("API route error:", error);
      res.status(500).json({
        error: "Failed to fetch dashboard data",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    console.log(`API route: Method ${req.method} not allowed`);
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
