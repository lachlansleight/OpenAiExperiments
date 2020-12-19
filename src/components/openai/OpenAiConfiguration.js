import React, {useState, useEffect} from 'react'

import Slider from 'rc-slider'
import Checkbox from 'rc-checkbox'
import 'rc-slider/assets/index.css';
import 'rc-checkbox/assets/index.css'

import './openaiconfiguration.css'

const OpenAiConfiguration = ({onConfigChanged}) => {
    const [config, setConfig] = useState({
        engine: "ada",
        max_tokens: 16,
        temperature: 1,
        top_p: 1,
        n: 1,
        logprobs: 0,
        echo: false,
        stop: "",
        presence_penalty: 0,
        frequency_penalty: 0,
        best_of: 1,
    });

    const handleChange = e => {
        setConfig({...config, [e.target.id]: e.target.value});
    }

    const handleSliderChange = (id, value) => {
        let newConfig = {...config};
        newConfig[id] = value;
        if(id === "temperature") {
            newConfig["top_p"] = 1.0;
        } else if(id === "top_p") {
            newConfig["temperature"] = 1.0;
        }
        setConfig(newConfig);
    }

    const handleCheckboxChange = e => {
        setConfig({...config, [e.target.id]: e.target.checked});
    }

    useEffect(() => {
        if(onConfigChanged) onConfigChanged(config);
    }, [config, onConfigChanged]);

    return (
        <div className="openAiConfiguration">
            <label htmlFor="engine">Engine</label>
            <select 
                id="engine" 
                value={config.engine} 
                onChange={handleChange}
            >
                <option value="davinci">Da Vinci ($6 per 100K tokens)</option>
                <option value="curie">Curie ($0.60 per 100K tokens)</option>
                <option value="babbage">Babbage ($0.12 per 100K tokens)</option>
                <option value="ada">Ada ($0.08 per 100K tokens)</option>
            </select>

            <label htmlFor="max_tokens">Max Tokens (Response Length)</label>
            <input 
                id="max_tokens" 
                onChange={handleChange}
                value={config.max_tokens}
                type="number" 
            />

            <label htmlFor="temperature">Temperature % (Riskiness)</label>
            <div className="sliderGroup">
                <Slider 
                    id="temperature"
                    onChange={val => handleSliderChange("temperature", val)}
                    value={config.temperature}
                    min={0} max={1} step={0.01}  
                />
                <input readOnly={true} value={config.temperature} />
            </div>

            <label htmlFor="top_p">Top P (Probability Threshold)</label>
            <div className="sliderGroup">
                <Slider 
                    id="top_p"
                    onChange={val => handleSliderChange("top_p", val)}
                    value={config.top_p}
                    min={0} max={1} step={0.01}  
                />
                <input readOnly={true} value={config.top_p} />
            </div>

            <label htmlFor="n">Completion Count</label>
            <input 
                id="n" 
                onChange={handleChange}
                value={config.n}
                type="number" 
            />

            <label htmlFor="logprobs">Log Prob Inclusion Count</label>
            <input 
                id="logprobs" 
                onChange={handleChange}
                value={config.logprobs}
                type="number" 
            />

            <label htmlFor="echo">Echo Prompt</label>
            <Checkbox
                id="echo"
                onChange={handleCheckboxChange}
                checked={config.echo}
            />

            <label htmlFor="stop">Stop Sequence</label>
            <input 
                id="stop" 
                onChange={handleChange}
                value={config.stop}
                type="text" 
            />

            <label htmlFor="presence_penalty">Presence Penalty</label>
            <div className="sliderGroup">
                <Slider 
                    id="presence_penalty"
                    onChange={val => handleSliderChange("presence_penalty", val)}
                    value={config.presence_penalty}
                    min={0} max={1} step={0.01}  
                />
                <input readOnly={true} value={config.presence_penalty} />
            </div>

            <label htmlFor="frequency_penalty">Frequency Penalty %</label>
            <div className="sliderGroup">
                <Slider 
                    id="frequency_penalty"
                    onChange={val => handleSliderChange("frequency_penalty", val)}
                    value={config.frequency_penalty}
                    min={0} max={1} step={0.01}  
                />
                <input readOnly={true} value={config.frequency_penalty} />
            </div>

            <label htmlFor="best_of">Candidate Completions Count</label>
            <input 
                id="best_of" 
                onChange={handleChange}
                value={config.best_of}
                type="number" 
            />
        </div>
    )
}

export default OpenAiConfiguration;