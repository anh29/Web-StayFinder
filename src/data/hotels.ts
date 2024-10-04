import { Hotel } from "types/hotels";

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Ocean View Resort",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 2,
    name: "Mountain Retreat Hotel",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 3,
    name: "Ocean View Resort 3",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 4,
    name: "Mountain Retreat Hotel 4",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 5,
    name: "Ocean View Resort 5",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 6,
    name: "Mountain Retreat Hotel 6",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 7,
    name: "Ocean View Resort 7",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 8,
    name: "Mountain Retreat Hotel 8",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 9,
    name: "Ocean View Resort 9",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 10,
    name: "Mountain Retreat Hotel 10",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 11,
    name: "Ocean View Resort 11",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 12,
    name: "Mountain Retreat Hotel 12",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
  {
    id: 13,
    name: "Ocean View Resort 13",
    description: "A luxurious beachfront resort offering panoramic ocean views and top-notch amenities.",
    location: {
      city: "Da Nang",
      country: "Vietnam",
      address: "123 Beachfront Ave, Da Nang",
      coordinates: {
        lat: 16.0471,
        lng: 108.2068
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 150, // In USD
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 5
      },
      {
        date: "2024-10-11",
        roomsAvailable: 3
      },
      // More availability dates
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 150,
        amenities: ["1 King Bed", "Air Conditioning", "Free WiFi", "Flat-screen TV"],
        maxGuests: 2,
        size: "30 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room2.jpg"
        ]
      },
      {
        type: "Deluxe Room",
        price: 200,
        amenities: ["2 Queen Beds", "Ocean View", "Free WiFi", "Balcony", "Mini Bar"],
        maxGuests: 4,
        size: "45 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room.jpg",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/deluxe-room2.jpg"
        ]
      }
    ],
    amenities: ["Pool", "Spa", "Beach access", "Restaurant", "Gym", "Free Parking", "Airport Shuttle"],
    rating: 4.5,
    totalReviews: 120,
    reviews: [
      {
        name: "John Doe",
        rating: 4.5,
        comment: "Amazing hotel with stunning ocean views!",
        date: "2024-09-15"
      },
      {
        name: "Jane Smith",
        rating: 4.0,
        comment: "Very clean and great service, but a bit pricey.",
        date: "2024-09-14"
      }
    ],
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation within 48 hours of booking. No refunds after that.",
      paymentOptions: ["Credit Card", "PayPal", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Marble Mountains",
        description: "A cluster of five marble and limestone hills.",
        distance: "5 km"
      },
      {
        name: "My Khe Beach",
        description: "A long stretch of sandy beach perfect for water sports.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 123 456 789",
      email: "info@oceanviewresort.com",
      website: "https://oceanviewresort.com"
    }
  },
  {
    id: 14,
    name: "Mountain Retreat Hotel 14",
    description: "A peaceful hotel nestled in the mountains, ideal for a relaxing getaway.",
    location: {
      city: "Sapa",
      country: "Vietnam",
      address: "456 Mountain Trail, Sapa",
      coordinates: {
        lat: 22.3355,
        lng: 103.8416
      }
    },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/467164133.jpg?k=6675d1b4a91513b663d2d4c299411ca87639054fc03f6e7bbcd2e7104f6c2f8e&o=&hp=1",
    pricePerNight: 100,
    currency: "USD",
    availability: [
      {
        date: "2024-10-10",
        roomsAvailable: 7
      },
      {
        date: "2024-10-11",
        roomsAvailable: 2
      }
    ],
    roomTypes: [
      {
        type: "Standard Room",
        price: 100,
        amenities: ["1 Queen Bed", "Free WiFi", "Mountain View", "Flat-screen TV"],
        maxGuests: 2,
        size: "25 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/standard-room-mountain.jpg"
        ]
      },
      {
        type: "Suite",
        price: 150,
        amenities: ["1 King Bed", "Mountain View", "Free WiFi", "Private Balcony"],
        maxGuests: 3,
        size: "40 sqm",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/suite-room-mountain.jpg"
        ]
      }
    ],
    amenities: ["Spa", "Restaurant", "Bar", "Hiking Trails", "Free Parking"],
    rating: 4.7,
    totalReviews: 85,
    reviews: [
      {
        name: "Alice Brown",
        rating: 5.0,
        comment: "Beautiful hotel with a breathtaking mountain view!",
        date: "2024-09-12"
      },
      {
        name: "Bob Johnson",
        rating: 4.7,
        comment: "The location is perfect for a quiet retreat, great service.",
        date: "2024-09-10"
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      paymentOptions: ["Credit Card", "Bank Transfer"]
    },
    nearbyAttractions: [
      {
        name: "Fansipan Mountain",
        description: "The highest peak in Vietnam, offering stunning views.",
        distance: "10 km"
      },
      {
        name: "Sapa Market",
        description: "A local market offering handmade goods and fresh produce.",
        distance: "2 km"
      }
    ],
    contactInfo: {
      phone: "+84 987 654 321",
      email: "info@mountainretreat.com",
      website: "https://mountainretreathotel.com"
    }
  },
];
