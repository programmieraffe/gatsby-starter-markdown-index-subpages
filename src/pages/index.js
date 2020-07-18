import React from "react"
import Layout from '../components/layout';
import {graphql, Link} from 'gatsby';


export default ({data}) =>
  <Layout title="Hello World">
    <div>Content of blog</div>

    {data.indexPage.edges.map(({node}) =>
    <div>
      <h1>{node.frontmatter.title}</h1>
      <p>{node.excerpt}</p>
    </div>
  )}

  <h3>Sub pages:</h3>

    {data.pages.edges.map(({node}) =>
      <div>
        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        <p>{node.excerpt}</p>
      </div>
    )}
  </Layout>

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
        excerpt
        fields{
          slug
        }
        frontmatter{
          title
        }
        html
      }
    }
  }
}`;
