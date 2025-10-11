'use strict';

/**
 * article router
 */
 
//const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles/filter",
      handler: "article.filter",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/articles/editors-pick",
      handler: "article.editorPicks",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/articles/slugs",
      handler: "article.getSlugs",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/articles/:id",
      handler: "article.findOne",
    },
    
  ],
};
