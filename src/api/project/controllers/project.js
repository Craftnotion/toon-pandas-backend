"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({

  // Custom filter API
  async filter(ctx) {
    const { categorySlug, subCategorySlug, page = 1, pageSize = 20 } = ctx.query;

    const filters = {
      sub_category: {
        ...(subCategorySlug && { slug: subCategorySlug }),
        ...(categorySlug && { category: { slug: categorySlug } }),
      },
    };

    const projects = await strapi.entityService.findMany("api::project.project", {
      filters,
      populate: ["sub_category", "sub_category.category", "background"],
      start: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    const totalCount = await strapi.entityService.count("api::project.project", {
      filters,
    });

    return {
      data: projects,
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

  //  Custom findOne API (by id or slug)
  async findOne(ctx) {
    const { id } = ctx.params; // dynamic param from route (can be id or slug)

    // check if id is numeric → then search by id, else by slug
    let filters = {};
    if (Number(id)) {
      filters = { id: Number(id) };
    } else {
      filters = { slug: id }; // if you have slug field
    }

    const project = await strapi.entityService.findMany("api::project.project", {
      filters,
      populate: ["sub_category", "sub_category.category", "background"],
      limit: 1,
    });

    if (!project || project.length === 0) {
      return ctx.notFound("Project not found");
    }

    return { data: project[0] };
  },

  // Get all project slugs for static generation
  async getSlugs(ctx) {
    try {
      const projects = await strapi.entityService.findMany("api::project.project", {
        fields: ["slug"],
      });

      return { 
        data: projects.map(project => ({ slug: project.slug }))
      };
    } catch (error) {
      console.error("Error fetching project slugs:", error);
      ctx.throw(500, "Internal server error");
    }
  },

}));
