import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from "../services/api.js";
import { Helmet } from 'react-helmet-async';
import "./BlogTag.css"
import BlogCard from '../components/BlogCard';

function BlogTag() {
    const { tag } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/blogs/tag/${tag}`)
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching tagged blogs:', err);
                setLoading(false);
            });
    }, [tag]);

    if (loading) return <p>Loading blogs tagged with "{tag}"...</p>;

    return (
        <>
            <Helmet>
                <title>{tag.charAt(0).toUpperCase() + tag.slice(1)} Blogs | Demo User</title>
            </Helmet>
            <div className="blog-tag-container">
                <header className='blog-tag-header'>
                    <h1>{tag.charAt(0).toUpperCase() + tag.slice(1)} Blogs</h1>
                </header>
                <div className="blog-tag">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                    ) : (
                        <p>No blogs found with this tag.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogTag;
