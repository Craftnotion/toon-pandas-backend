// 'use strict';

// /**
//  * project router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::project.project', );

"use strict";

/**
 * project router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/projects/filter",
      handler: "project.filter",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/projects/slugs",
      handler: "project.getSlugs",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/projects/:id",
      handler: "project.findOne",
    },
  ],
};
