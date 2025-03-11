import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// const uploadProductsToFirebase = async () => {
//   try {
//     const productsCollection = collection(db, "Products");
//     for (const product of Products) {
//       await addDoc(productsCollection, product);
//     }
//     console.log("Products uploaded succefully!");
//   } catch (error) {
//     console.error("Error uploading products: ", error);
//   }
// };

const productsCollection = collection(db, "Products");

// Function to check if a product exists in Firebase
const checkIfProductExists = async (productId) => {
  const q = query(productsCollection, where("id", "==", productId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if the product exists
};

// Function to upload only new products
export const uploadNewProductsToFirebase = async () => {
  try {
    for (const product of Products) {
      const exists = await checkIfProductExists(product.id);
      if (!exists) {
        await addDoc(productsCollection, product);
        console.log(`Added: ${product.name}`);
      } else {
        console.log(`Skipped (Already Exists): ${product.name}`);
      }
    }
    console.log("New products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products: ", error);
  }
};

// Run the function to add only new products
uploadNewProductsToFirebase();

const Products = [
  {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpac...",
    src: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 1099,
    category: "Men's Clothing",
  },
  {
    id: 2,
    name: "SanDisk SSD PLUS 1TB Internal SSD -...",
    src: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    price: 699,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Silicon Power 256GB SSD 3D NAND A55...",
    src: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    price: 5000,
    category: "Electronics",
  },
  {
    id: 4,
    name: "WD 4TB Gaming Drive Works with Play...",
    src: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    price: 25000,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Acer SB220Q bi 21.5 inches Full HD ...",
    src: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    price: 19999,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Samsung 49-Inch CHG90 144Hz Curved ...",
    src: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    price: 70000,
    category: "Electronics",
  },
  {
    id: 7,
    name: "BIYLACLESEN Women's 3-in-1 Snowboar...",
    src: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    price: 2599,
    category: "Women's Clothing",
  },
  {
    id: 8,
    name: "Lock and Love Women's Removable Hoo...",
    src: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    price: 2599,
    category: "Women's Clothing",
  },
  {
    id: 9,
    name: "Rain Jacket Women Windbreaker Strip...",
    src: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    price: 3333,
    category: "Women's Clothing",
  },
  {
    id: 10,
    name: "MBJ Women's Solid Short Sleeve Boat...",
    src: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    price: 799,
    category: "Women's Clothing",
  },
  {
    id: 11,
    name: "Opna Women's Short Sleeve Moisture...",
    src: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    price: 699,
    category: "Women's Clothing",
  },
  {
    id: 12,
    name: "Mens Casual Premium Slim Fit T-Shir...",
    src: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 300,
    category: "Men's Clothing",
  },
  {
    id: 13,
    name: "DANVOUY Womens T Shirt Casual Cotto...",
    src: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    price: 999,
    category: "Women's Clothing",
  },
  {
    id: 14,
    name: "Mens Cotton Jacket...",
    src: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    price: 1155,
    category: "Men's Clothing",
  },
  {
    id: 15,
    name: "Mens Casual Slim Fit...",
    src: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    price: 900,
    category: "Men's Clothing",
  },
  {
    id: 16,
    name: "John Hardy Women's Legends Naga Gol...",
    src: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    price: 6950,
    category: "Jewelery",
  },
  {
    id: 17,
    name: "Solid Gold Petite Micropave ..",
    src: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    price: 7500,
    category: "Jewelery",
  },
  {
    id: 18,
    name: "White Gold Plated Princess...",
    src: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    price: 3999,
    category: "Jewelery",
  },
  {
    id: 19,
    name: "Pierced Owl Rose Gold Plated Stainl...",
    src: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    price: 10999,
    category: "Jewelery",
  },
  {
    id: 20,
    name: "WD 2TB Elements Portable External H...",
    src: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    price: 999,
    category: "Electronics",
  },
  {
    id: 21,
    name: "Essence Mascara Lash Princess",
    src: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    price: 999,
    category: "beauty",
  },
  {
    id: 22,
    name: "Eyeshadow Palette with Mirror",
    src: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    price: 1999,
    category: "beauty",
  },
  {
    id: 23,
    name: "Powder Canister",
    src: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    price: 1499,
    category: "beauty",
  },
  {
    id: 23,
    name: "Red Lipstick",
    src: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png",
    price: 899,
    category: "beauty",
  },
  {
    id: 24,
    name: "Red Nail Polish",
    src: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png",
    price: 999,
    category: "beauty",
  },
  {
    id: 25,
    name: "Calvin Klein CK One",
    src: "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
    price: 4999,
    category: "fragrances",
  },
  {
    id: 26,
    name: "Chanel Coco Noir Eau De",
    src: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png",
    price: 12999,
    category: "fragrances",
  },
  {
    id: 27,
    name: "Dior J'adore",
    src: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png",
    price: 8999,
    category: "fragrances",
  },
  {
    id: 28,
    name: "Dolce Shine Eau de",
    src: "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png",
    price: 6999,
    category: "fragrances",
  },
  {
    id: 29,
    name: "Gucci Bloom Eau de",
    src: "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png",
    price: 7999,
    category: "fragrances",
  },
  {
    id: 30,
    name: "Annibale Colombo Bed",
    src: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
    price: 1899.99,
    category: "furniture",
  },
  {
    id: 31,
    name: "Annibale Colombo Sofa",
    src: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png",
    price: 2499.99,
    category: "furniture",
  },
  {
    id: 32,
    name: "Bedside Table African Cherry",
    src: "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png",
    price: 299.99,
    category: "furniture",
  },
  {
    id: 33,
    name: "Knoll Saarinen Executive Conference Chair",
    src: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png",
    price: 499.99,
    category: "furniture",
  },
  {
    id: 34,
    name: "Wooden Bathroom Sink With Mirror",
    src: "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png",
    price: 799.99,
    category: "furniture",
  },
];
// **uploaded the file once and they are present in firabase dabase. thats why commented this line
// uploadProductsToFirebase();

export { Products };
