import { Routes, Route } from 'react-router-dom';

import CreateTodo from './pages/CreateTodo';
import AllTodos from './pages/AllTodos';
import TodoDetail from './pages/TodoDetail';
import UpdateTodo from './pages/UpdateTodo';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <div className="flex min-h-screen w-screen flex-col justify-between bg-gray-50">
                <Navbar />

                <Routes>
                    <Route path="/" element={<AllTodos />} />
                    <Route path="/new" element={<CreateTodo />} />
                    <Route path="/:id/view" element={<TodoDetail />} />
                    <Route path="/:id/edit" element={<UpdateTodo />} />
                </Routes>

                <Footer />
            </div>
        </>
    );
}

export default App;
