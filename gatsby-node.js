const path = require('path');
const postsPerPage = 5;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
    query($limit: Int!) {
      allFlickrPhoto(limit: $limit, filter: {media: {eq: "photo"}}) {
        pageInfo {
          pageCount
          currentPage
        }
      }
    }
    `
  , {limit: postsPerPage});

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const numPages = result.data.allFlickrPhoto.pageInfo.pageCount;

  Array.from({length: numPages}).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve('./src/templates/flickr-photo-list-template.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}
