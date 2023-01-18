import React, { useEffect, useState } from 'react';

const SpeechToText = () => {
    const [transcription, setTranscription] = useState('');

    useEffect(() => {
        const recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.addEventListener('result', (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscription(transcript);
                } else {
                    interimTranscript += transcript;
                }
            }
            setTranscription(interimTranscript);
        });

        recognition.start();

        return () => {
            recognition.abort();
        };
    }, []);

    return (
        <div>
            <p>{transcription}</p>
        </div>
    );
};

export default SpeechToText;
