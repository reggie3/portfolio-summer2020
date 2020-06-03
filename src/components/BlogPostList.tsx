import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import {
  Card,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
} from "@material-ui/core"
import Img from "gatsby-image"
import defaultImage from "../images/ocean.jpg"

const BlogPostList = () => {
  const data = useStaticQuery(graphql`
    query blogIndex {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date
              tags
              description
              featuredImage {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const { edges: posts } = data.allMdx

  return (
    <div id="postIndexContainer">
      {posts.map(({ node: post }) => {
        return (
          <Card key={post.id} className="blogCard">
            <Img
              className="blogCardImage"
              fluid={
                post.frontmatter.featuredImage?.childImageSharp?.fluid ??
                defaultImage
              }
              alt="A corgi smiling happily"
            />
            <CardContent className={"cardContent"}>
              {/*               <div className="blogCardLinkContainer">*/}

              <Link to={post.fields.slug} className="fancyLink">
                {post.frontmatter.title}
              </Link>
              {/*               </div>  */}

              <div className="blogCardPostDescription">
                <Typography variant="body2" component="p">
                  {post.frontmatter.description}
                </Typography>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})
export default BlogPostList
