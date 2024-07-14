/**
 * Custom-Hook for voice recording
 */

export const useRecording = () => {
    let mediaRecorder: MediaRecorder | null = null;

    /**
     *  Starts the recording of audio and returns the Base64-encoded audio file after the recording is stopped.
     */
    async function record(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
                mediaRecorder = new MediaRecorder(stream);

                let chunks: Blob[] = [];
                mediaRecorder.ondataavailable = (event) => {
                    chunks.push(event.data);
                };

                mediaRecorder.onstop = async (event) => {
                    const combinedBlob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});

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
                    chunks = [];
                };

                // Start recording.
                mediaRecorder.start();
            }).catch((err) => {
                reject(new Error("Browser cannot access microphone."));
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
