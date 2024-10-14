const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const redisClient = require("../utils/redis");

exports.fetch = async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;
    const cacheKey = `videos:${+cursor > 0 ? cursor : "start"}:${limit}`;

    // Check if data is cached in Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Serving from cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Fetch data from PostgreSQL using cursor-based pagination
    const videos = await prismaClient.video.findMany({
      take: +limit,
      skip: +cursor > 0 ? 1 : 0,
      cursor: cursor ? { id: +cursor } : undefined,
      include: {
        user: true,
        products: {
          include: { product: true },
        },
        music: true,
      },
    });

    // Determine the next cursor
    const nextCursor = videos.length > 0 ? videos[videos.length - 1].id : null;

    const response = {
      data: videos,
      pagination: {
        next_cursor: nextCursor,
        limit: +limit,
      },
    };

    // Cache the response in Redis
    await redisClient.set(cacheKey, JSON.stringify(response), {
      EX: 3600,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
