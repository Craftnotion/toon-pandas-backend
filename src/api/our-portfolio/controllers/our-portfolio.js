'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::our-portfolio.our-portfolio', ({ strapi }) => ({
  async find(ctx) {
    const entities = await strapi.entityService.findMany(
      'api::our-portfolio.our-portfolio',
      {
        ...ctx.query,        
        populate: '*',      
        
      }
    );

    const sanitized = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitized);
  },
}));
