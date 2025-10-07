"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::category.category", ({ strapi }) => ({
  async getCategoriesWithSubcategories(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query;

    const categories = await strapi.entityService.findMany("api::category.category", {
      fields: ["name", "slug"],
      populate: {
        sub_categories: {
          fields: ["name", "slug"],
        },
      },
      start: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    const totalCount = await strapi.entityService.count("api::category.category");

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
      meta: {
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
          pageCount: Math.ceil(Number(totalCount) / Number(pageSize)),
          total: totalCount,
        },
      },
    };
  },
}));
