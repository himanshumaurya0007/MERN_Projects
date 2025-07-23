import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/BlogCard";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/blogs')
            .then((res) => {
                console.log(res.data);
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching blogs:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading blogs...</p>;

    return (
        <>
            <Helmet>
                <title>Blog Website</title>
            </Helmet>
            <div className="blog-container">
                <header className="blog-header">
                    <h1>All Blogs</h1>
                </header>
                <div className="blog-list">
                    <div className="blog-list-container">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                        ) : (
                            <p>No blogs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;