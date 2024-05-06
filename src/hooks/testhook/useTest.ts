import axios from 'axios';


export const useTest = () => {

    const fetchTestString = () => {
      /*  fetch('/api/test')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // JSON-Daten aus der Antwort extrahieren
            })
            .then((content) => {
                console.log(content)
            })

            .catch(error => {
                console.error('Error', error);
            }); */

        axios.get('/api/test')
            .then(response => {
                return response.data;
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    return {
        fetchTestString
    };
};
