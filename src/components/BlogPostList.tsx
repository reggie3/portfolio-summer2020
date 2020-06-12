import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import {
  Card,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
} from "@material-ui/core";
import Img from "gatsby-image";
import PostTags from "./PostTags";
import BlogCard from "./BlogCard";
import TagCloud from "./TagCloud";
import styled from "styled-components";
import { motion } from "framer-motion";
// @ts-ignore importing JPG
import defaultImage from "../images/ocean.jpg";

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
  `);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { edges: posts } = data.allMdx;

  useEffect(() => {
    if (posts && !selectedTags.length) {
      const tagsArraysWithDupes: any = [
        ...posts.map((post: string[]) => {
          // @ts-ignore Property 'node' does not exist on type 'string[]'
          return post.node.frontmatter.tags;
        }),
      ];
      const tags: string[] = ([
        ...new Set(tagsArraysWithDupes.flat()),
      ].sort() as unknown) as string[];
      setSelectedTags(tags);
      setAllTags(tags);
    }
  });

  const onTagClicked = (label: string) => {
    // if all the tags are currently selected, then only select the passed tag
    if (selectedTags.length === allTags.length) {
      setSelectedTags([label]);
    } else {
      if (selectedTags.includes(label)) {
        setSelectedTags(selectedTags.filter(tag => tag !== label));
      } else {
        setSelectedTags([...selectedTags, label]);
      }
    }
  };

  const onSelectAllTagsClicked = () => {
    setSelectedTags([...allTags]);
  };

  const shouldShowPost = (postTags: string[]) => {
    return !!selectedTags.some(tag => postTags.includes(tag));
  };

  return (
    <div style={{ position: "relative" }}>
      <TagCloud
        allTags={allTags}
        selectedTags={selectedTags}
        onSelectAllTagsClicked={onSelectAllTagsClicked}
        onTagClicked={onTagClicked}
      />
      <PostIndexContainer>
        {posts.map(({ node: post }) => {
          return (
            <BlogCard
              key={`${post.id}-${Date.now().toString()}`}
              isShown={shouldShowPost(post.frontmatter.tags)}
            >
              <Img
                key={Date.now().toString()}
                className="blogCardImage"
                fluid={
                  post.frontmatter.featuredImage?.childImageSharp?.fluid ??
                  defaultImage
                }
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
              </CardContent>
              <PostTags
                tags={post.frontmatter.tags}
                selectedTags={selectedTags}
                onTagClicked={onTagClicked}
              />
            </BlogCard>
          );
        })}
      </PostIndexContainer>
    </div>
  );
};

export default BlogPostList;

export const PostIndexContainer = styled(motion.div)`
background-color: var(--clr-bg-very-light);
display: grid;
gap: 1rem;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
padding: 1rem;
padding-bottom: 5rem;
}`;
