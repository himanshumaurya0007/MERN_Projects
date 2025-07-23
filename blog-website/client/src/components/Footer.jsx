import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <>
            <footer className='footer-container'>
                <div className='footer-content'>
                    <p>&copy; 2025 | All rights reserved.</p>
                    <p className="footer-designer">Designed by <strong>Himanshu Maurya</strong> |
                        <a href="https://www.linkedin.com/in/himanshumaurya0007" target="_blank" rel="noopener noreferrer" id="linkedin-link">
                            LinkedIn </a>
                        <a href="https://github.com/himanshumaurya0007" target="_blank" rel="noopener noreferrer">
                            GitHub </a>
                    </p>
                </div>
            </footer>

        </>
    );
}

export default Footer;