import React, { useState, useEffect } from "react"
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
import PostTags from "./PostTags"

const BlogPostList = () => {
  const data = useStaticQuery(graphql`
    query blogIndex {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
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
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { edges: posts } = data.allMdx

  useEffect(() => {
    if (posts && !selectedTags.length) {
      const tagsArraysWithDupes: any = [
        ...posts.map((post: string[]) => {
          // @ts-ignore Property 'node' does not exist on type 'string[]'
          return post.node.frontmatter.tags
        }),
      ]
      setSelectedTags(tagsArraysWithDupes.flat())
    }
  })
  useEffect(() => {
    console.log("selectedTags", selectedTags)
  }, [selectedTags])

  const onTagClicked = (label: string) => {}
  return (
    <div id="postIndexContainer">
      {posts.map(({ node: post }) => {
        return (
          <Card
            key={`${post.id}-${Date.now().toString()}`}
            className="blogCard"
          >
            <Img
              key={Date.now().toString()}
              className="blogCardImage"
              fluid={
                post.frontmatter.featuredImage?.childImageSharp?.fluid ??
                defaultImage
              }
              alt="A corgi smiling happily"
            />

            <CardContent className={"blogCardContent"}>
              <div className="blogCardLinkContainer">
                <Link to={post.fields.slug} className="fancyLink">
                  {post.frontmatter.title}
                </Link>
              </div>
              <div className="blogCardPostDescription">
                <Typography variant="body2" component="p">
                  {post.frontmatter.description}
                </Typography>
              </div>
              <PostTags
                tags={post.frontmatter.tags}
                onTagClicked={onTagClicked}
              />
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
