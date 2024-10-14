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
    // Upsert User
    const userData = jsonData.videos[0].user;
    const user = await prisma.user.upsert({
      where: { username: userData.username },
      update: {},
      create: {
        username: userData.username,
        display_name: userData.display_name,
        profile_picture_url: userData.profile_picture_url,
        bio: userData.bio,
        followers_count: userData.followers_count,
        verified: userData.verified,
        id: userData.id,
      },
    });

    console.log(`User ${user.username} inserted/updated.`);

    // Upsert Store
    const storeData = jsonData.videos[0].products[0].store;
    const store = await prisma.store.upsert({
      where: { id: storeData.id },
      update: {},
      create: {
        name: storeData.name,
        logo_url: storeData.logo_url,
        id: storeData.id,
      },
    });

    console.log(`Store ${store.name} inserted/updated.`);

    // Upsert Product with Store Connection
    const productData = jsonData.videos[0].products[0];
    const product = await prisma.product.upsert({
      where: { id: productData.id },
      update: {},
      create: {
        name: productData.name,
        price: productData.price,
        original_price: productData.original_price,
        discount_percentage: productData.discount_percentage,
        image_url: productData.image_url,
        timestamp: productData.timestamp,
        currency: productData.currency,
        in_stock: productData.in_stock,
        id: productData.id,
        store: {
          connect: { id: store.id }, // Connect existing store
        },
      },
    });

    console.log(`Product ${product.name} inserted/updated.`);

    // Insert Product Variants
    for (const variant of productData.variants) {
      await prisma.variant.upsert({
        where: { id: variant.id },
        update: {},
        create: {
          name: variant.name,
          id: variant.id,
          product_id: product.id,
          size_options:
            variant.name === "Size"
              ? variant.options.map((option) => Size[option])
              : [],
          color_options:
            variant.name === "Color"
              ? variant.options.map((option) => Color[option.toUpperCase()])
              : [],
        },
      });

      console.log(`Variant ${variant.name} inserted/updated.`);
    }

    // Upsert Music
    const musicData = jsonData.videos[0].music;
    const music = await prisma.music.upsert({
      where: { id: musicData.id },
      update: {},
      create: musicData,
    });

    console.log(`Music ${music.name} inserted/updated.`);

    // Insert Video with Product and Music Connections
    const videoData = jsonData.videos[0];
    await prisma.video.create({
      data: {
        id: videoData.id,
        video_url: videoData.video_url,
        thumbnail_url: videoData.thumbnail_url,
        description: videoData.description,
        view_count: videoData.view_count,
        duration: videoData.duration,
        created_at: new Date(videoData.created_at),
        user_id: user.id,
        music_id: music.id,
        likes_count: videoData.likes_count,
        comments_count: videoData.comments_count,
        shares_count: videoData.shares_count,
        is_liked: videoData.is_liked,
        is_bookmarked: videoData.is_bookmarked,
        hashtags: videoData.hashtags,
        products: {
          create: { product_id: product.id },
        },
      },
    });

    console.log(`Video ${videoData.id} inserted.`);
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

loadData();
