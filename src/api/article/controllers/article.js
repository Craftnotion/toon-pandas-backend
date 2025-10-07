// 'use strict';

// /**
//  * article controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::article.article');
"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({

  // Custom filter API
  async filter(ctx) {
    const { categorySlug, subCategorySlug, page = 1, pageSize = 5 } = ctx.query;

    const filters = {
      sub_category: {
        ...(subCategorySlug && { slug: subCategorySlug }),
        ...(categorySlug && { category: { slug: categorySlug } }),
      },
    };

    const articles = await strapi.entityService.findMany("api::article.article", {
      filters,
      populate: ["sub_category", "sub_category.category", "background", "card_image"],
      start: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    const totalCount = await strapi.entityService.count("api::article.article", {
      filters,
    });

    return {
      data: articles,
      meta: {
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
          pageCount: Math.ceil(Number(totalCount) / Number(pageSize)),
          total: Number(totalCount),
        },
      },
    };
  },

  // Custom findOne API (by id or slug)
  async findOne(ctx) {
    const { id } = ctx.params; // dynamic param from route (can be id or slug)

    // check if id is numeric → then search by id, else by slug
    let filters = {};
    if (Number(id)) {
      filters = { id: Number(id) };
    } else {
      filters = { slug: id }; // if you have slug field
    }

    const article = await strapi.entityService.findMany("api::article.article", {
      filters,
      populate: ["sub_category", "sub_category.category", "background", "card_image"],
      limit: 1,
    });

    if (!article || article.length === 0) {
      return ctx.notFound("Article not found");
    }

    return { data: article[0] };
  },

}));
