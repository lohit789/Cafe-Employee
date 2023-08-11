import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'

export default function NavBar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${query}`)
    }
    return (
        <div className="header">
            <div className="header-item">
                <Link to="/"><strong>Awesome Blog</strong></Link>
            </div>
            <div className="header-item">
                <form onSubmit={handleSubmit}>
                    <input name="query" type="text" placeholder="search Post" onChange={e => setQuery(e.target.value)}></input>
                    <button>GO</button>
                </form>
            </div>
            <div className="header-item">
                <a href="/login">Login</a>
                <button onClick={toggleTheme}>{theme === 'light' ? 'Theme:light' : 'Theme:dark'}</button>
            </div>
        </div>
    )
}
