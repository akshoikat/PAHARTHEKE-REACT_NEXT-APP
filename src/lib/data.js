
export const getCategories = async (search = "") => {
  try {
    const res = await fetch(
      `https://pahartheke.com/api/v6/products`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return data.data.data; // because Laravel pagination wraps inside data
  } catch (error) {
    console.error(error);
    return [];
  }
};

import React from "react";
import axios from "axios";


// export const getCategories = async (search = "") => {
//   try {
//     const res = await fetch(
//       `https://pahartheke.com/api/v6/products`
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await res.json();

//     return data.data.data; // because Laravel pagination wraps inside data
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };







// import React from "react";
// import axios from "axios";


// export const getCategories = async (search = "") => {
//   try {
//     const res = await fetch(
//       `https://pahartheke.com/api/v6/products`
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await res.json();

//     return data.data.data; // because Laravel pagination wraps inside data
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// import React from "react";
// import axios from "axios";


// export const getCategories = async (search = "") => {
//   try {
//     const res = await fetch(
//       `https://pahartheke.com/api/v6/products`
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     const data = await res.json();

//     return data.data.data; // because Laravel pagination wraps inside data
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };











