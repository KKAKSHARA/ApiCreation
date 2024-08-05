import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const res = await axios.post('https://your-vercel-backend-url.vercel.app/bfhl', parsedJson);
            setResponseData(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };

    const filteredResponse = () => {
        if (!responseData) return null;
        let filteredData = {};
        selectedOptions.forEach(option => {
            filteredData[option.value] = responseData[option.value];
        });
        return filteredData;
    };

    return (
        <div>
            <h1>RA2111026050030</h1> {/* Replace with your roll number */}
            <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON" />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {responseData && (
                <>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                    />
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default App;
