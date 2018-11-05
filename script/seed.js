'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review
} = require('../server/db/models')

const dummyProducts = [
  {
    category: 'snowsports',
    name: "Jones Women's Solution Splitboard - Women's",
    description: `Directional rocker nose and tail offer excellent float, while camber between your feet delivers supreme edge grip
    Carbon split stringers deliver extra pop and a precise response
    Inner- and outer-edge Traction Tech 2.0 adds edge grip on icy skin tracks and firm descents
    Boltless Bridge split clip platform eliminates base hardware
    Includes Karakoram UltraClip clips that provide tremendous torsional board lock
    Stainless-steel tip and tail reinforcements improve durability
    Compatible with Jones Quick Tension Skin Tail clips (not included)`,
    imageUrl:
      'https://www.rei.com/media/50d7f9ab-0ca8-4b6c-b8c7-2c1ec8e61d03?size=784x588',
    price: 899,
    keyWords: ['snow', 'snowboards', 'Jones']
  },
  {
    category: 'snowsports',
    name: "Burton Yeasayer Flying V Snowboard - Women's",
    description: `Rocker overall, including between and outside your feet, enhances playfulness and float; subtle camber zones focus edge control for crisp snap, added pop and powerful turns
    FSC™ certified Super Fly® 800g core with extruded base
    Lightened and loaded with pop, the wood core uses dual-density strips of alternating soft and hard wood to reduce overall weight without sacrificing strength or performance
    Dualzone EGD wood grain along the toes/heels makes continuous zones perpendicular to the rest of the wood core for consistent edge hold and extra strength
    With an overall easier feel, Squeezebox low core profile brings high-end core profiling technology to the progressing rider`,
    imageUrl: `https://www.rei.com/media/590437aa-4489-498a-a4a3-6f738a3a2061?size=784x588`,
    price: 449.95,
    keyWords: ['snow', 'snowboards', 'Burton']
  },
  {
    category: 'snowsports',
    name: "Arbor Element Black Snowboard - Men's",
    description: `Parabolic rocker progressively reduces the amount of rocker toward tip and tail for low profiles that engage with the snow for high speeds, major turns and big landings
    Grip Tech is a tri-radial sidecut design that creates additional heel and toe contact points, providing a direct, ergonomic way to grip the snow when more control is needed
    Medium-flex mountain twin is recommended for intermediate to advanced riders
    Hand-dyed ash power-ply topsheet gives strength, durability and energy return`,
    imageUrl:
      'https://www.rei.com/media/6d390a99-bc18-4d29-bf7f-45352da29248?size=784x588',
    price: 399.95,
    keyWords: ['snow', 'snowboards', 'Arbor']
  },
  {
    category: 'snowsports',
    name: "Lib Tech Cold Brew Snowboard - Men's",
    description: `Magne-Traction® serrated steak knife tech turns ice to powder with 7 strategically located edge serrations that provide effortless edge hold and control in all conditions
    C2 base contour combines aggressive short rocker and lengthened camber for floating in powder and ripping everything with control and precision
    Light, strong, eco-conscious Original Power (OP) construction consists of a 75% aspen/25% paulownia wood core and triaxial/biaxial fibers for flex and magnified pop
    `,
    imageUrl:
      'https://www.rei.com/media/77b3261d-6e3b-4951-9e00-8ce636b6b552?size=784x588',
    price: 459.95,
    keyWords: ['snow', 'snowboards']
  },
  {
    category: 'snowsports',
    name: "William Gibbon's Artic Snowslicer",
    description: `FSC® certified Panda Core™ with bamboo power rods is super lightweight and designed for all-terrain technical freestyle riding
    Grid-woven Amplitex™ V-Tech Amplifier tech tape balances the response of carbon with the dampness of flax
    Impregnated with plant-based Magic Bean resin, Holysheet fiberglass with triax/biax has a higher glass-to-weight ratio than normal fiberglass for a powerful, dynamic ride`,
    imageUrl:
      'https://www.rei.com/media/f34ecbb3-1848-446c-818f-7da28ad4f840?size=784x588',
    price: 2999.95,
    keyWords: ['snow', 'snowboards', 'William Gibbons']
  },
  {
    category: 'camping',
    name: 'REI co-op Passage 2',
    description: `A new combination 6061/7001 aluminum pole set allows for increased vertical space at the ends of the tent
  Two twin stake-out vestibules provide large covered areas for gear storage, hanging out and more
  Adjustable ceiling vents help reduce condensation by moving moist air outside`,
    imageUrl:
      'https://www.rei.com/media/3e73042d-aded-4741-9b26-a8da7395b69e?size=784x588',
    price: 159,
    keyWords: ['camp', 'tents']
  },
  {
    category: 'camping',
    name: 'Marmot Catalyst 2P Tent with Footprint',
    description: `This 3-season, 2-person tent features a seam-taped catenary cut floor, color-coded poles for easy setup, 2 D-shaped doors and 2 vestibules with plenty of room to stash gear
    Strategic clip placement enhances interior volume
    Seam-taped, full-coverage fly with vents
    Seam-taped, catenary cut floor
    Interior pockets for small-gear organization; Lamp Shade pocket securely holds your headlamp to provide ambient light
    Jingle-free nylon zipper pulls
    `,
    imageUrl:
      'https://www.rei.com/media/2fdd3ba7-eb69-480d-8d2c-ad690aa3f5fe?size=784x588',
    price: 169,
    keyWords: ['camp', 'tents', 'Marmot']
  },
  {
    category: 'hiking',
    name: 'Black Diamond Alpine Carbon Cork Trekking Poles',
    description: `Three-piece 100% carbon fiber shafts offer quick and secure length changes thanks to dual FlickLock Pro adjustability
    Comfortable, moisture-wicking cork grips with dual-density tops feature durable padded wrist straps and nonslip EVA extensions for quick choke-ups on steep terrain
    Interchangeable Tech Tips allow you to switch between carbide and rubber tips to account for changing trail surfaces`,
    imageUrl:
      'https://www.rei.com/media/b12bc048-5fe1-4ccb-86ec-d74202360cee?size=784x588',
    price: 169.95,
    keyWords: ['hiking', 'trek', 'poles', 'Black Diamond']
  },
  {
    category: 'hiking',
    name: 'Leki Micro Vario Carbon DSS Trekking Poles',
    description: `Upper 2 shafts have diameters of 18mm and 16mm; lower 3 shafts have diameters of 14mm
    Push-button lock system for quick, easy assembly and packing
    Speedlock 2 system with strong external TUV locks provides up to 20cm of length adjustment
    Polyethylene-coated, Kevlar®-reinforced tension cord for lasting reliability
    Maximum tension between shaft sections is made possible by an internal spring in the lower shaft
    Carbon section ends are protected by machined aluminum sleeves for extra-long wear`,
    imageUrl:
      'https://www.rei.com/media/0304c676-519d-4976-953b-8891670d8125?size=784x588',
    price: 219.95,
    keyWords: ['hiking', 'trek', 'poles', 'Leki']
  },
  {
    category: 'hiking',
    name: 'REI Co-op Flash Carbon Trekking Poles',
    description: `REI exclusive grips offer light, breathable EVA foam in ergonomic shapes that accommodate a variety of hand sizes and positions comfortably
    Carbon-composite construction and a 3-section design combine to minimize trail weight without sacrificing sturdiness
    Adjustable wrist-straps help you control your poles
    Low-profile Powerlock 3.0 enables easy adjustments while out on the trail
    Trail basket has a minimalist profile to cut down on weight while retaining stability`,
    imageUrl:
      'https://www.rei.com/media/a994411c-f172-4373-9624-1301ffe9723b?size=784x588',
    price: 139,
    keyWords: ['hiking', 'trek', 'poles', 'REI']
  }
]

const dummyUsers = [
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'murphy@email.com',
    password: '123'
  },
  {
    email: 'lily@email.com',
    password: '123',
    isAdmin: true
  }
]

const dummyCart = [
  {
    sessionId: 'a'
  }
]

const dummyCartItems = [
  {
    quantity: 2,
    price: 50.0,
    cartId: 1,
    productId: 1
  },
  {
    quantity: 1,
    price: 100.0,
    cartId: 1,
    productId: 2
  }
]

const dummyOrders = [
  {
    totalPrice: 1000,
    status: 'received',
    address: '123 Cool Blvd',
    email: 'lily@email.com',
    userId: 3
  },
  {
    totalPrice: 1200,
    status: 'received',
    address: '123 Cool Blvd',
    email: 'lily@email.com',
    userId: 3
  },
  {
    totalPrice: 1200,
    status: 'shipped',
    address: '123 Cool Blvd',
    email: 'lily@email.com',
    userId: 3
  },
  {
    totalPrice: 1500,
    status: 'delivered',
    address: '123 Cool Blvd',
    email: 'lily@email.com',
    userId: 3
  }
]

const dummyReviews = [
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 1,
    userId: 3
  },
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 1,
    userId: 3
  },
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 2,
    userId: 3
  },
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 2,
    userId: 3
  },
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 3,
    userId: 3
  },
  {
    rating: 4,
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    title: 'This product changed my life',
    productId: 3,
    userId: 3
  }
]

const seed = async () => {
  await db.sync({ force: true })
  console.log('db synced!')
  try {
    await Promise.all(
      dummyProducts.map(product => {
        return Product.create(product)
      }),
      dummyUsers.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      dummyOrders.map(
        order => {
          return Order.create(order)
        },
        dummyReviews.map(review => {
          return Review.create(review)
        })
      )
    )
  } catch (err) {
    console.error('error in Product/User create', err)
  }
  try {
    await Promise.all(
      dummyCart.map(cart => {
        return Cart.create(cart)
      })
    )
  } catch (err) {
    console.error('error in cart create', err)
  }
  try {
    await Promise.all(
      dummyCartItems.map(cartItem => {
        return CartItem.create(cartItem)
      })
    )
  } catch (err) {
    console.error('error in cartItem create', err)
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
