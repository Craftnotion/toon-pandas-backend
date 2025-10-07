'use strict';

/**
 * news-letter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news-letter.news-letter', ({ strapi }) => ({

  async create(ctx) {
    try {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest('Email is required');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest('Invalid email format');
      }

      // Prevent duplicate
      const existing = await strapi.entityService.findMany('api::news-letter.news-letter', {
        filters: { email },
      });
      if (existing.length > 0) {
        return ctx.badRequest('This email is already subscribed');
      }

      // Use entityService (so it shows in Content Manager)
      const entry = await strapi.entityService.create('api::news-letter.news-letter', {
        data: {
          email,
          publishedAt: new Date(), // auto-publish
        },
      });

      const sanitizedEntry = await this.sanitizeOutput(entry, ctx);
      return this.transformResponse(sanitizedEntry);

    } catch (err) {
      ctx.throw(500, err);
    }
  },

}));
