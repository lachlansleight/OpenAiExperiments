import React from 'react'

import Layout from '../layout/Layout'

const Home = () => {

    const applySecret = e => {
        localStorage.setItem("secret", e.target.value);
    }

    return (
        <Layout>
            <h1>Login</h1>
            <div>
                <label htmlFor="secret">Secret</label>
                <input style={{
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.2em",
                    color: "#fff",
                    padding: "0.25em 0.5em",
                    backgroundColor: "#303030",
                    display: "block",
                    width: "60%"
                }} type="password" id="secret" onChange={applySecret} />
            </div>
        </Layout>
    )
}

export default Home;