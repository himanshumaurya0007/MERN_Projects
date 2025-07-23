import { NavLink } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
    return (
        <>
            <div className="blog-card">
                <div className="blog-card-header">
                    <h3 className="blog-card-title">{blog.title}</h3>
                </div>
                <hr />
                <div className="blog-card-body">
                    <p className="blog-card-description">{blog.excerpt}</p>
                    <NavLink to={`/blog/${blog.slug}`}>
                        <button className="blog-card-read-more">Read more...</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
