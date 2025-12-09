"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::category.category", ({ strapi }) => ({
  async getCategoriesWithSubcategories(ctx) {

    const categories = await strapi.entityService.findMany("api::category.category", {
      fields: ["name", "slug"],
      populate: {
        sub_categories: {
          fields: ["name", "slug"],
        },
      },
     
    });



    const formatted = (categories || []).map((cat) => ({
      id: cat.id,
      attributes: {
        name: cat.name,
        slug: cat.slug,
        // @ts-ignore
        subCategories: cat.sub_categories || [],
      },
    }));

    
    return {
      data: formatted,
     
    };
  },
}));
