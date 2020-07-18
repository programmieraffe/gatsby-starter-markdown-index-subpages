Based on

- [https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-hello-world/](https://www.youtube.com/playlist?list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ)
- Tutorial series: [https://www.youtube.com/playlist?list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ](https://www.youtube.com/playlist?list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ)

# Very Simple Markdown Starter in Gatsby

status: experimental!

**Goal:** Custom index page (content retrieved from markdown) and generic subpages (retrieved from markdown as well). Important: The index page has "id: 'index'" in the front matter data.

*(Alternative approach would be to have "type: " in front matter and use /templates/page.js and templates/index.js)*

## Trying it out

1. Clone repo to local drive
2. `cd` into directory
3. run `npm install`
4. run `npm install gatsby-cli`
5. run `gatsby develop`
6. Open webbrowser at [http://localhost:8000/](http://localhost:8000/)

## Documentation of coding

In the tutorial Alan Campora uses the "hello world" starter ([https://github.com/gatsbyjs/gatsby-starter-hello-world](https://github.com/gatsbyjs/gatsby-starter-hello-world)) instead of the more complex "gatsby new" command. You can replace "my-project" with your project title:

```
gatsby new my-project https://github.com/gatsbyjs/gatsby-starter-hello-world
```

**Follow the tutorial:**
[https://www.youtube.com/playlist?list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ
](https://github.com/gatsbyjs/gatsby-starter-hello-world)

Install source file system:

`npm i gatsby-source-filesystem`

**Error: Invalid hook call after installation**

If you encounter the following error, you can solve it via un- and re-install: [Solution](https://github.com/gatsbyjs/gatsby/issues/19827#issuecomment-573986378)

```
npm uninstall react react-dom gatsby
npm install react react-dom gatsby
```

## Working with files (gatsby-source-filesystem)

Two sources defined in *gatsby-config.js*

```
  {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `index`,
        path: `${__dirname}/content/index/`,
      },
    },
 ```

**Filter by name field**

[GraphQL query](http://localhost:8000/___graphql?query=%7B%0A%20%20allFile(filter%3A%20%7B%20sourceInstanceName%3A%20%7B%20eq%3A%20%22index%22%20%7D%20%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20extension%0A%20%20%20%20%20%20%20%20dir%0A%20%20%20%20%20%20%20%20modifiedTime%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)

```
{
  allFile(filter: { sourceInstanceName: { eq: "index" } }) {
    edges {
      node {
        extension
        dir
        modifiedTime
      }
    }
  }
}
```

Result:

```
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "extension": "md",
            "dir": "/Users/admin/webserver/tmp-projects/very-simple-markdown-starter/content/index",
            "modifiedTime": "2020-07-18T11:23:30.047Z"
          }
        },
        {
          "node": {
            "extension": "png",
            "dir": "/Users/admin/webserver/tmp-projects/very-simple-markdown-starter/content/index",
            "modifiedTime": "2020-07-18T11:23:01.884Z"
          }
        }
      ]
    }
  }
}
```

**Use it in index.js to get subpages (markdown files)**

`import {graphql} from gatsby;`

```
export const query = graphql`
{
  allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
    edges {
      node {
        relativePath
        prettySize
        extension
        dir
        modifiedTime
      }
    }
  }
}`;
```

It is transmitted via {data}:

```
export default ({data}) =>
  <Layout title="Hello World">
    <div>Content of blog</div>

    {data.allFile.edges.map(({node}) =>
    <div>
      <h1>{node.relativePath}</h1>
      <h2>{node.extension}</h2>
      <h3>{node.prettySize}</h3>
    </div>
  )}
  </Layout>
```
 
## Working with Markdown (gatsby-transformer-remark for rendering)

`npm i gatsby-transformer-remark`

and add it to *gatsby-config.js*. It is now available via graphiQL. With transformer-remark you can access the YAML frontmatter information as well as the rendered HTML from markdown. (This is not possible with gatsby-source-filesystem)

```
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter{
        	title
        }
        html
      }
    }
  }
}
```

Sample output:

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "id": "9a5d60f3-c907-5ae8-b57e-600aeea9582f",
            "frontmatter": {
              "title": "Credits"
            },
            "html": "<p>This is the license: </p>"
          }
        },
        {
          "node": {
            "id": "dc5530cf-7934-5405-a746-d2d1e7dae7c2",
            "frontmatter": {
              "title": "About"
            },
            "html": "<p>Hi, my name is.</p>"
          }
        },
        {
          "node": {
            "id": "a45df9d6-757d-5aa6-9791-6a55cb641ac4",
            "frontmatter": {
              "title": ""
            },
            "html": "<p>2DO: IMAGE</p>"
          }
        }
      ]
    }
  }
}
```


Unfortunately there is currently no way of filtering  the remark query for "sourceInstanceName" as defined in gatsby-config for sourcefile-system ([See open issues @ github](https://github.com/gatsbyjs/gatsby/issues/16466)). Therefore we need to use hacky ways like path regex or frontmatter. I decided to use frontmatter:

*content/index/index.md*

```
---
title: 'Welcome to my homepage'
id: 'index'
---

# This is the index page / landing page

Rub face on owner find a way to fit in tiny box yet kick up litter, meow to be let in lick human with sandpaper tongue immediately regret falling into bathtub. Mrow lick the other cats howl on top of tall thing or floof tum, tickle bum, jellybean footies curly toes, for grab pompom in mouth and put in water dish so destroy house in 5 seconds. Knock dish off table head butt cant eat out of my own dish get my claw stuck in the dog's ear. Scratch the box meow loudly just to annoy owners so all of a sudden cat goes crazy. Found somthing move i bite it tail stare at imaginary bug. Use lap as chair cats are cute. Meeeeouw run off table persian cat jump eat fish and scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food.
```

query:

```
query MyQuery {
  allMarkdownRemark(filter: { frontmatter: { id: { eq: "index" } } }) {
    edges {
      node {
        id
        frontmatter {
          title
          id
        }
        html
      }
    }
  }
}
```

Sample output:

```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "id": "a45df9d6-757d-5aa6-9791-6a55cb641ac4",
            "frontmatter": {
              "title": "Klimakrise Schnelldurchlauf INDEX",
              "id": "index"
            },
            "html": "<p>This is the index page / landing page</p>\n<p>Rub face on owner find a way to fit in tiny box yet kick up litter, meow to be let in lick human with sandpaper tongue immediately regret falling into bathtub. Mrow lick the other cats howl on top of tall thing or floof tum, tickle bum, jellybean footies curly toes, for grab pompom in mouth and put in water dish so destroy house in 5 seconds. Knock dish off table head butt cant eat out of my own dish get my claw stuck in the dog's ear. Scratch the box meow loudly just to annoy owners so all of a sudden cat goes crazy. Found somthing move i bite it tail stare at imaginary bug. Use lap as chair cats are cute. Meeeeouw run off table persian cat jump eat fish and scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food.</p>"
          }
        }
      ]
    }
  }
}
```

### Two queries (for index page and pages)

`ne` means "not equal"

```
/* get index page and subpages */
export const query = graphql`
{
  indexPage: allMarkdownRemark(filter: { frontmatter: { id: { eq: "index" } } }) {
    edges{
      node{
        excerpt,
        frontmatter{
          title
        }
        html
      }
    }
  }
  pages: allMarkdownRemark(filter: { frontmatter: { id: { ne: "index" } } }) {
    edges{
      node{
        excerpt,
        frontmatter{
          title
        }
        html
      }
    }
  }
}`;
```

Using it in render:

```
export default ({data}) =>
  <Layout title="Hello World">
    <div>Content of blog</div>

    {data.indexPage.edges.map(({node}) =>
    <div>
      <h1>{node.frontmatter.title}</h1>
      <p>{node.excerpt}</p>
    </div>
  )}

  <h3>Pages:</h3>

  {data.pages.edges.map(({node}) =>
  <div>
    <h4>{node.frontmatter.title}</h4>
    <p>{node.excerpt}</p>
  </div>
)}
  </Layout>
```

### Links (slugs) and templates

[Part 5 in the video series](https://www.youtube.com/watch?v=0l481EQDIYk&list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ&index=5)

#### Auto creating the slug with gatsby-node.js

We use the method [createFilepath](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createfilepath) to generate a slug from the title and insert it as a new field:

```
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
    const slug = createFilePath({
      node,
      getNode,
      basePath: "content/pages"
    });

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
```


It can be queried this way:

```
query MyQuery {
  pages: allMarkdownRemark(filter: {frontmatter: {id: {ne: "index"}}}) {
    edges {
      node {
        fields{
          slug
        }
        excerpt
        frontmatter {
          title
        }
        html
      }
    }
  }
}
```

Sample output: 

```
{
  "data": {
    "pages": {
      "edges": [
        {
          "node": {
            "fields": {
              "slug": "/about/"
            },
            "excerpt": "Hi, my name is. ABOUT",
            "frontmatter": {
              "title": "About"
            },
            "html": "<p>Hi, my name is. ABOUT</p>"
          }
        },
        {
          "node": {
            "fields": {
              "slug": "/credits/"
            },
            "excerpt": "This is the license: CREDITS",
            "frontmatter": {
              "title": "Credits"
            },
            "html": "<p>This is the license: CREDITS</p>"
          }
        }
      ]
    }
  }
}
```

If we use 

`<Link to={node.fields.slug}>{node.frontmatter.title}</Link>` 

(Import it via `import {graphql, Link} from 'gatsby';`)

it will give a 404. That's okay. We need to create a (virtual) page for the markdown file via API:

```
exports.createPages = ({graphql,actions}) => {
  const {createPage} = actions // get it from actions
  const templateFileForPages = path.resolve('src/templates/page.js');

// ! IMPORTANT USE FILTER, otherwise indexpage has template as well
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
```

#### Template

*gatsby-node.js*/

add on top:
```
const path = require('path');
```

and

```
exports.createPages = ({graphql,actions}) => {
  const {createPage} = actions // get it from actions
  const templateFileForPages = path.resolve('src/templates/page.js');

  return graphql(`
    {
      allMarkdownRemark{
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
```

Now we use the template to show the contents, therefore we have to query the markdown remark nodes by slug. This can be done with query variables:

```
query($slug: String!){
  markdownRemark(fields:{slug:{eq:$slug}}){
    html
    frontmatter{
      title
    }
    fields{
    	slug
    }
  }
}
```

e.g: `{"slug": "/credits/" }`

*src/templates/page.js*

Okay, not it gets a little bit crazy/automagical ([Video](https://www.youtube.com/watch?v=AU4VjehPzUs&list=PLIsuo97Nxttysrkraph7n5xcn3EPfJbnQ&index=7)):

```
import React from 'react'
import {graphql} from 'gatsby';

export default ({data}) => {
  console.log('data',data);
  const page = data.markdownRemark;
  const htmlContent = {__html: page.html};

  return (
    <div>
    <h1>{page.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={htmlContent} />
    </div>
  );
};



// I have no idea why this works, but it works! ;-)
// some automagical stuff, it is describe here https://www.gatsbyjs.org/docs/page-query/#how-to-add-query-variables-to-a-page-query
// "Keys in the context object that match up with arguments in the page query (in this case: "title"), will be used as variables. Variables are prefaced with $, so passing a title property will become $title in the query."
// get the node/contents by slug (filter)

export const query = graphql`
  query($slug: String!){
    markdownRemark(fields:{slug:{eq:$slug}}){
      html
      frontmatter{
        title
      }
      fields{
        slug
      }
    }
  }
`;
```

Navigating to a page with /credits/ or something else should work now. 