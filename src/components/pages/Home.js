import React, {useState} from 'react'

import Layout from '../layout/Layout'
import OpenAiPrompter from '../openai/OpenAiPrompter'
import OpenAiConfiguration from '../openai/OpenAiConfiguration'

import './home.css'

const Home = () => {

    const [config, setConfig] = useState(null);

    return (
        <Layout>
            <h1>OpenAI Completion Generator</h1>
            <div className="home">
                <OpenAiConfiguration onConfigChanged={setConfig}/>
                <OpenAiPrompter config={config}/>
            </div>
        </Layout>
    )
}

export default Home;