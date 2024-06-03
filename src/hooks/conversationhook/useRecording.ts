export const useRecording = () => {
    let mediaRecorder: MediaRecorder | null = null;

    async function record(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // Ask user for access to the microphone.
            navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
                // Instantiate the media recorder.
                mediaRecorder = new MediaRecorder(stream);

                // Create a buffer to store the incoming data.
                let chunks: Blob[] = [];
                mediaRecorder.ondataavailable = (event) => {
                    chunks.push(event.data);
                };

                // When you stop the recorder, create a single blob from all chunks and convert it to Base64.
                mediaRecorder.onstop = async (event) => {
                    // Combine the audio chunks into a single blob.
                    const combinedBlob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});

                    // Read the blob as a Data URL and convert it to Base64.
                    const reader = new FileReader();
                    reader.readAsDataURL(combinedBlob);
                    reader.onloadend = () => {
                        if (reader.result && typeof reader.result === "string") {
                            // Extract the Base64 string from the Data URL.
                            const base64String = reader.result.split(",")[1];
                            resolve(base64String);
                        } else {
                            reject(new Error("Failed to read blob as Data URL."));
                        }
                    };

                    // Clear the `chunks` buffer so that you can record again.
                    chunks = [];
                };

                // Start recording.
                mediaRecorder.start();
            }).catch((err) => {
                // Reject the promise if the browser is unable to access the microphone.
                reject(new Error("Oh no! Your browser cannot access your computer's microphone."));
            });
        });
    }

    function stopRecording(): void {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
    }

    return {
        record,
        stopRecording
    };
};
