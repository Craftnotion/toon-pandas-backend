// 'use strict';

// /**
//  * category router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::category.category');

"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/categories-with-subcategories",
      handler: "category.getCategoriesWithSubcategories",
      config: {
        auth: false,
      },
    },
  ],
};
