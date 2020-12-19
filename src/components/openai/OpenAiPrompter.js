import React, {useEffect, useState} from 'react'

import ReactJson from 'react-json-view'
import ReactMarkdown from 'react-markdown'
import GridLoader from "react-spinners/GridLoader";
import axios from 'axios'

import './openaiprompter.css'

const enginePrices = {
    davinci: 0.06,
    curie: 0.006,
    babbage: 0.0012,
    ada: 0.0008
}

const OpenAiPrompter = ({config}) => {

    const [estimatedCost, setEstimatedCost] = useState(0);
    const [prompt, setPrompt] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const [formattedResponse, setFormattedResponse] = useState("");

    useEffect(() => {
        if(!config) return;
        const perTokenPrice = enginePrices[config.engine] || 0;
        const fullLength = (prompt.length + config.max_tokens * Math.max(config.n, config.best_of));
        const finalPrice = fullLength * perTokenPrice * 0.001;
        setEstimatedCost(Math.round(finalPrice * 100000000) / 100000000);
    }, [config, prompt]);

    useEffect(() => {
        if(!apiResponse) {
            setFormattedResponse("");
            return;
        }
        try {
            let choiceText = apiResponse.choices[0].text;
            choiceText = choiceText.replace(/\n/g, "\n\n");
            setFormattedResponse(choiceText);
        } catch(error) {
            setError("Failed to format response: " + error);
        }
    }, [apiResponse])

    const sendRequest = e => {
        const doRequest = async prompt => {
            setWaiting(true);
            setError("");
            try {
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
                };
                let data = {prompt};
                if(config.max_tokens !== 16) data.max_tokens = Number(config.max_tokens);
                if(config.temperature !== 1) data.temperature = Number(config.temperature);
                if(config.top_p !== 1) data.top_p = Number(config.top_p);
                if(config.n !== 1) data.n = Number(config.n);
                if(config.logprobs !== 0) data.logprobs = Number(config.logprobs);
                if(config.echo !== false) data.echo = Boolean(config.echo);
                if(config.stop !== "") data.stop = config.stop;
                if(config.presence_penalty !== 0) data.presence_penalty = Number(config.presence_penalty);
                if(config.frequency_penalty !== 0) data.frequency_penalty = Number(config.frequency_penalty);
                if(config.best_of !== 1) data.best_of = Number(config.best_of);

                console.log("Request Data", data);

                const response = await axios.request({
                    url: `https://api.openai.com/v1/engines/${config.engine}/completions`,
                    method: "post", headers, data
                });
                setApiResponse(response.data);
            } catch(error) {
                console.error("Failed to get OpenAI response", error);
                setError(error.message);
            } finally {
                setWaiting(false);
            }
        }

        e.preventDefault();

        if(estimatedCost > 0.0001) {
            if(!window.confirm(`Warning - your API call will cost $${estimatedCost} - proceed?`)) return;
        }

        if(localStorage.getItem("secret") !== process.env.REACT_APP_SECRET) {
            setError("You are not authenticated");
            return;
        }

        doRequest(prompt);
    }

    if(waiting) {
        return (
            <div className="loadingContainer">
                <div>
                    <GridLoader
                        size={50}
                        color={"rgba(122, 207, 91, 1)"}
                        loading={true}
                    />
                    <p>Please wait</p>
                </div>
            </div>
        )
    }

    return (
        <div className="openAiPrompter">
            <form onSubmit={sendRequest}>
                <textarea id="prompt" placeholder="Prompt Text" value={prompt} onChange={e => {
                    setPrompt(e.target.value)
                }}></textarea>
                <p className="estimatedCost">Estimated Cost: ${estimatedCost}</p>
                <input type="submit" value="Send Prompt to OpenAI" />
            </form>
            {error ? <p style={{color: "salmon"}}>{error}</p> : null}
            {apiResponse ? (
                <>
                    <div className="response">
                        <h2>Response</h2>
                        <div>
                            <ReactMarkdown source={formattedResponse} />
                        </div>
                    </div>
                    <div className="rawResponse">
                        <h2>Raw Response</h2>
                        <ReactJson src={apiResponse} theme="monokai" displayObjectSize={false} displayDataTypes={false} enableClipboard={false} />
                    </div>
                </>
             ) : null}
        </div>
    )

}

export default OpenAiPrompter;