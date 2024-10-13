const { PrismaClient, Size, Color } = require("@prisma/client");
const prisma = new PrismaClient();

const jsonData = {
  videos: [
    {
      id: 2,
      video_url: "https://example.com/videos/newvideo.mp4",
      thumbnail_url: "https://example.com/thumbnails/newthumbnail.jpg",
      description: "Winter fashion trends 2024 #winterfashion #trendalert",
      view_count: 1500,
      duration: 60,
      created_at: "2023-06-15T14:00:00Z",
      user: {
        id: 1,
        username: "fashion_lover",
        display_name: "Fashion Lover",
        profile_picture_url: "https://example.com/profiles/user1.jpg",
        bio: "Fashion enthusiast and trendsetter",
        followers_count: 20000,
        verified: true,
      },
      products: [
        {
          id: 1,
          name: "Cozy Sweater",
          price: 59.99,
          original_price: 79.99,
          discount_percentage: 25,
          image_url: "https://example.com/products/cozy_sweater.jpg",
          timestamp: 15,
          currency: "USD",
          in_stock: true,
          store: {
            id: 5,
            name: "WinterWear Co.",
            logo_url: "https://example.com/stores/winterwear_logo.jpg",
          },
          variants: [
            {
              id: 101,
              name: "Size",
              options: ["S", "M", "L", "XL"],
            },
            {
              id: 102,
              name: "Color",
              options: ["Red", "Blue", "Green"],
            },
          ],
        },
      ],
      likes_count: 500,
      comments_count: 150,
      shares_count: 75,
      is_liked: false,
      is_bookmarked: false,
      music: {
        id: 301,
        name: "Winter Wonderland",
        artist: "Frosty Tunes",
        cover_url: "https://example.com/music/winter_wonderland.jpg",
      },
      hashtags: ["winterfashion", "trendalert"],
    },
  ],
};

async function loadData() {
  try {
    const userData = jsonData.videos[0].user;
    const user = await prisma.user.upsert({
      where: { username: userData.username },
      update: {},
      create: userData,
    });

    const storeData = jsonData.videos[0].products[0].store;
    const store = await prisma.store.upsert({
      where: { id: storeData.id },
      update: {},
      create: storeData,
    });

    const productData = jsonData.videos[0].products[0];
    const product = await prisma.product.upsert({
      where: { id: productData.id },
      update: {},
      create: { ...productData, storeId: store.id },
    });

    for (const variant of productData.variants) {
      await prisma.variant.upsert({
        where: { id: variant.id },
        update: {},
        create: {
          id: variant.id,
          productId: product.id,
          name: variant.name,
          sizeOptions:
            variant.name === "Size"
              ? variant.options.map((option) => Size[option])
              : [],
          colorOptions:
            variant.name === "Color"
              ? variant.options.map((option) => Color[option.toUpperCase()])
              : [],
        },
      });
    }

    const musicData = jsonData.videos[0].music;
    const music = await prisma.music.upsert({
      where: { id: musicData.id },
      update: {},
      create: musicData,
    });

    const videoData = jsonData.videos[0];
    const video = await prisma.video.create({
      data: {
        ...videoData,
        userId: user.id,
        musicId: music.id,
        products: {
          create: { productId: product.id },
        },
      },
    });

    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

loadData();
