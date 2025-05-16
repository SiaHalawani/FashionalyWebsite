export const exploreData = {
    wardrobes: Array(8).fill().map((_, i) => ({
      id: i,
      owner: `user_${i + 1}`,
      title: `Wardrobe ${i + 1}`,
      img: `/src/assets/wardrobe${(i % 3) + 1}.jpg`
    })),


  
    outfits: Array(15).fill().map((_, i) => ({
      id: i,
      title: `Outfit ${i + 1}`,
      img: `/src/assets/outfit${(i % 3) + 1}.jpg`
    })),
  
    items: Array(10).fill().map((_, i) => ({
      id: i,
      title: `Item ${i + 1}`,
      img: `/src/assets/item${(i % 4) + 1}.jpg`
    })),
  
    shein: {
      logo: '/src/assets/shein.jpg',
      collections: Array(6).fill().map((_, i) => ({
        id: i,
        title: `SHEIN ${i + 1}`,
        img: `/src/assets/outfit${(i % 3) + 1}.jpg`
      })),
      items: Array(6).fill().map((_, i) => ({
        id: i,
        title: `SHEIN Item ${i + 1}`,
        img: `/src/assets/item${(i % 4) + 1}.jpg`
      }))
    },
  
    alibaba: {
      logo: '/src/assets/alibaba.png',
      collections: Array(5).fill().map((_, i) => ({
        id: i,
        title: `Alibaba ${i + 1}`,
        img: `/src/assets/outfit${(i % 2) + 1}.jpg`
      })),
      items: Array(5).fill().map((_, i) => ({
        id: i,
        title: `Alibaba Item ${i + 1}`,
        img: `/src/assets/item${(i % 3) + 1}.jpg`
      }))
    },
  
  };
  