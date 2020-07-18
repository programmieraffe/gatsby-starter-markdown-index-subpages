const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({node, getNode,actions}) => {

  console.log('Trying to figure out what to do with ', node.id, node.internal.type);

  const { createNodeField } = actions

  // only for markdown filesystem
  if(node.internal.type === 'MarkdownRemark'){
    console.log('Markdown file recognized, we create a slug field for that entry', node);

    /*
    createFilePath({
    // The node you'd like to convert to a path
    // e.g. from a markdown, JSON, YAML file, etc
    node,
    // Method used to get a node
    // The parameter from `onCreateNode` should be passed in here
    getNode,
    // The base path for your files.
    // Defaults to `src/pages`. For the example above, you'd use `src/content`.
    basePath,
    // Whether you want your file paths to contain a trailing `/` slash
    // Defaults to true
    trailingSlash,
      })
    */

    // create from file name:
    // https://www.gatsbyjs.org/docs/creating-slugs-for-pages/
    const slug = createFilePath({
      node,
      getNode,
      basePath: "content/pages"
    });

    // 2DO: create from front matter title?
    // 2DO: check if exists in frontmatter, otherwise fall back to file name slug=?
    // const slug = _.kebabCase(node.frontmatter.title);

    console.log('Generate a slug: ', slug);

    // Creates new query'able field with name of 'slug'
    // this will be added to markdownRemark query as fields.slug
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

  }

}

exports.createPages = ({graphql,actions}) => {
  const {createPage} = actions // get it from actions
  const templateFileForPages = path.resolve('src/templates/page.js');

  // ! IMPORTANT USE FILTER, otherwise indexpage has template page.js as well
  return graphql(`
    {
      allMarkdownRemark (filter: { frontmatter: { id: { ne: "index" } } }) {
        edges{
          node{
            fields{
              slug
            }
          }
        }
      }
    }`).then(({data}) => {
      data.allMarkdownRemark.edges.forEach(({node}) =>{
        createPage({
          path: node.fields.slug,
          component: templateFileForPages, // template
          context: {
            slug: node.fields.slug
          }
        })
      })
    });
};
