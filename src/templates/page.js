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
