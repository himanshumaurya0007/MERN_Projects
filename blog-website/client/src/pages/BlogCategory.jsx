import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from "../services/api.js";
import { Helmet } from 'react-helmet-async';
import './BlogCategory.css';
import BlogCard from '../components/BlogCard';

function BlogCategory() {
    const { category } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/blogs/category/${category}`)
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching category blogs:', err);
                setLoading(false);
            });
    }, [category]);

    if (loading) return <p>Loading blogs tagged with "{category}"...</p>;

    return (
        <>
            <Helmet>
                <title>{category.charAt(0).toUpperCase() + category.slice(1)} Blogs | Demo User</title>
            </Helmet>
            <div className="blog-category-container">
                <header className='blog-category-header'>
                    <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Blogs</h1>
                </header>
                <div className="blog-category">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                    ) : (
                        <p>No blogs found in this category.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogCategory;
