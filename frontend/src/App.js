import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import './styles/main.css';

function App() {
    return (
        <AuthProvider>
            <Router basename={process.env.PUBLIC_URL}>
                <div className="app">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/profile/:username" component={Profile} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
