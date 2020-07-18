import React from "react"
import Layout from '../components/layout';
import {graphql} from 'gatsby';


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

export const query = graphql`
{
  allFile(filter: { sourceInstanceName: { eq: "subpages" } }) {
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
