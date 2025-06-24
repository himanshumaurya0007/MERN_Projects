import React, { useState, useEffect } from "react";
import "./BlogPost.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import API from "../services/api.js";
import { Link } from "react-router-dom";

function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/blogs/${slug}`)
            .then((res) => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching blog post:', err);
                setLoading(false);
            });
    }, [slug]);


    if (loading) return <p>Loading blog post...</p>;

    if (!blog) return <p>Blog not found!</p>;

    return (
        <>
            <Helmet>
                <title>Blog Wesbite</title>
            </Helmet>
            <div className="blog-post-container">

                <div className="blog-post-header">
                    <h1 className="blog-post-title">{blog.title}</h1>
                    {blog.coverImage && (
                        <img
                            className="cover-image"
                            // src={blog.coverImage}
                            alt={blog.title}
                        />
                    )}
                </div>

                <div className="meta-top">
                    <span className="category">Category: {blog.category}</span>
                    <span className="views">Views: {blog.views}</span>
                </div>

                <div className="blog-post-content">
                    <div className="blog-post-excerpt">
                        <p>{blog.excerpt}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {blog.tags && blog.tags.length > 0 && (
                    <div className="blog-post-tags">
                        <ul>
                            {blog.tags.map((tag, index) => (
                                <li key={index} className="tag">
                                    <Link to={`/blog/tag/${tag}`}>#{tag}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="meta-bottom">
                    <span className="author">By {blog.author.name}</span>
                    <span className="date-read-time">
                        {blog.createdAt.split("T")[0]} | {blog.readingTime}
                    </span>
                </div>
            </div>
        </>
    );
}


export default BlogPost;
