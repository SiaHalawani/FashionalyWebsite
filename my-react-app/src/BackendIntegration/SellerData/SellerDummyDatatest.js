// BackendIntegration/SellerData/SellerDummyData.js

export const dummySellers = [
  {
    sellerId: 'seller1',
    brandName: 'Kharrat Clothing',
    website: 'https://kharratwear.com',
    instagram: '@kharratwear',
    email: 'contact@kharratwear.com',
    phone: '+961 71 123 456',
    joined: '2025-04-17T09:00:00Z',
    verified: true,
    stats: {
      sales: 2134,
      revenue: 18420, // 💡 Estimated or random
      followers: 6789,
      orders: 150,
      returns: 6,
      rating: 4.7
    },
    
    sellerItems: [
      {
        id: 1,
        title: 'Shoes',
        items: [
          {
            id: 's1',
            itemName: 'Urban White Sneakers',
            category: 'shoes',
            color: 'white',
            brand: 'Nike',
            material: 'leather',
            season: 'all',
            image: 'https://example.com/sneakers.jpg',
            gender: 'male',
            occasion: 'casual',
            price: 85,
            type: 'sneakers',
            temperature_range: [10, 30],
            essential: true
          },
          {
            id: 's2',
            itemName: 'Urban White Sneakers',
            category: 'shoes',
            color: 'white',
            brand: 'Nike',
            material: 'leather',
            season: 'all',
            image: 'https://example.com/sneakers.jpg',
            gender: 'male',
            occasion: 'casual',
            price: 85,
            type: 'sneakers',
            temperature_range: [10, 30],
            essential: true
          }
        ]
      },
      {
        id: 2,
        title: 'Tops',
        items: [
          {
            id: 't1',
            itemName: 'Black Cotton T-Shirt',
            category: 'top',
            color: 'black',
            brand: 'Uniqlo',
            material: 'cotton',
            season: 'summer',
            image: 'https://example.com/tshirt.jpg',
            gender: 'male',
            occasion: 'casual',
            price: 25,
            type: 't-shirt',
            temperature_range: [20, 35],
            essential: true
          }
        ]
      },
      {
        id: 3,
        title: 'Accessories',
        items: [
          {
            id: 'a1',
            itemName: 'Leather Belt',
            category: 'accessories',
            color: 'brown',
            brand: 'Zara',
            material: 'leather',
            season: 'all',
            image: 'https://example.com/belt.jpg',
            gender: 'unisex',
            occasion: 'formal',
            price: 40,
            type: 'belt',
            temperature_range: [10, 35],
            essential: true
          }
        ]
      },
      {
        id: 4,
        title: 'Bottoms',
        items: [
          {
            id: 'b1',
            itemName: 'Blue Jeans',
            category: 'bottom',
            color: 'blue',
            brand: 'Levi',
            material: 'denim',
            season: 'spring',
            image: 'https://example.com/jeans.jpg',
            gender: 'male',
            occasion: 'casual',
            price: 70,
            type: 'jeans',
            temperature_range: [15, 25],
            essential: true
          }
        ]
      },
      {
        id: 5,
        title: 'Jackets',
        items: [
          {
            id: 'j1',
            itemName: 'Puffer Jacket',
            category: 'outerwear',
            color: 'black',
            brand: 'North Face',
            material: 'nylon',
            season: 'winter',
            image: 'https://example.com/puffer.jpg',
            gender: 'male',
            occasion: 'outdoor',
            price: 120,
            type: 'jacket',
            temperature_range: [-10, 10],
            essential: true
          }
        ]
      },
      {
        id: 6,
        title: 'Hats',
        items: [
          {
            id: 'h1',
            itemName: 'Wool Beanie',
            category: 'hats',
            color: 'gray',
            brand: 'Carhartt',
            material: 'wool',
            season: 'winter',
            image: 'https://example.com/beanie.jpg',
            gender: 'unisex',
            occasion: 'casual',
            price: 30,
            type: 'beanie',
            temperature_range: [-10, 10],
            essential: true
          }
        ]
      }
    ],
    sellerPosts: [
      {
        id: 1,
        title: 'New Drops',
        items: [
          {
            id: 'p1',
            caption: '🔥 New arrivals this week!',
            image: 'https://example.com/new-drop1.png',
            timestamp: '2025-04-15T12:30:00Z',
            likes: 45,
            comments: 6
          }
        ]
      },
      {
        id: 2,
        title: 'Behind The Brand',
        items: [
          {
            id: 'p2',
            caption: 'Sneak peek at our next shoot 👀',
            image: 'https://example.com/behind-scene.png',
            timestamp: '2025-04-10T15:00:00Z',
            likes: 31,
            comments: 3
          }
        ]
      },
      {
        id: 3,
        title: 'Style & Fits',
        items: [
          {
            id: 'p3',
            caption: 'Today’s outfit: street-ready 🖤',
            image: 'https://example.com/street-style.png',
            timestamp: '2025-03-29T12:00:00Z',
            likes: 168,
            comments: 24
          }
        ]
      },
      {
        id: 4,
        title: 'Life Updates',
        items: [
          {
            id: 'p4',
            caption: 'Working from our new studio ☕',
            image: 'https://example.com/studio.png',
            timestamp: '2025-04-04T09:00:00Z',
            likes: 110,
            comments: 8
          }
        ]
      },
      {
        id: 5,
        title: 'Fitness Journey',
        items: [
          {
            id: 'p5',
            caption: 'Leg day vibes 🦵🔥',
            image: 'https://example.com/fitness1.png',
            timestamp: '2025-03-08T18:00:00Z',
            likes: 130,
            comments: 12
          }
        ]
      },
      {
        id: 6,
        title: 'Nature Escapes',
        items: [
          {
            id: 'p6',
            caption: 'Spring blossoms are here 🌸',
            image: 'https://example.com/nature1.png',
            timestamp: '2025-03-12T11:00:00Z',
            likes: 98,
            comments: 11
          }
        ]
      }
    ],
    adBudget: {
      currentBudget: 300,
      spent: 175,
      campaignStats: {
        impressions: 5500,
        clicks: 210,
        ctr: 3.8,
      },
    },
   
  },
];
