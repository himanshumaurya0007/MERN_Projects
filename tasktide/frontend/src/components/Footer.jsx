import { FaCode, FaLinkedin, FaGithub, FaGlobe, FaRegCopyright } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="animate-in fade-in slide-in-from-bottom-5 mt-16 border-t border-gray-300 bg-gray-100 py-6 duration-700">
            <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 px-4 text-center text-sm text-gray-600">
                {/* 🔹 Top: Copyright with fade-in */}
                <div className="animate-in fade-in zoom-in-50 flex items-center space-x-1 duration-700">
                    <FaRegCopyright className="h-4 w-4" />
                    <span>2025 | Himanshu Maurya | All rights reserved.</span>
                </div>

                {/* 🔹 Bottom: Designed by + Social Links */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="animate-in fade-in zoom-in-50 flex items-center space-x-2 delay-200 duration-700">
                        <FaCode className="h-4 w-4" />
                        <span>
                            Designed & Built by{' '}
                            <strong className="text-blue-600">Himanshu Maurya</strong>
                        </span>
                    </div>

                    {/* 🔹 Social Icons with fast hover color change */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://himanshumaurya-0007.web.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-in fade-in transform transition-colors delay-300 duration-200 duration-700 hover:scale-110 hover:text-green-600"
                            aria-label="Personal Website"
                        >
                            <FaGlobe className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/himanshumaurya0007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-in fade-in transform transition-colors delay-400 duration-200 duration-700 hover:scale-110 hover:text-blue-700"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://github.com/himanshumaurya0007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-in fade-in transform transition-colors delay-500 duration-200 duration-700 hover:scale-110 hover:text-gray-800"
                            aria-label="GitHub"
                        >
                            <FaGithub className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
