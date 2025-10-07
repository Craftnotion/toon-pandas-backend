'use strict';

/**
 * contact-submission controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-submission.contact-submission', ({ strapi }) => ({

  async create(ctx) {
    try {
      const { name, email, company, summary, meet_request } = ctx.request.body;

      if (!name || !email || !company || !summary) {
        return ctx.badRequest('Missing required fields: name, email, company, summary');
      }

      const entry = await strapi.entityService.create('api::contact-submission.contact-submission', {
        data: {
          name,
          email,
          company,
          summary,
          meet_request: meet_request || false,
          publishedAt: new Date(),
        },
      });
 
      const sanitizedEntry = await this.sanitizeOutput(entry, ctx);
      return this.transformResponse(sanitizedEntry);

    } catch (err) {
      ctx.throw(500, err);
    }
  },

}));
