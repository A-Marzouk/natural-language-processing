// make sure to export the function you would like to import

const errorElement = document.getElementById('errorFeedback');
const evaluationElement = document.getElementById('evaluation');
const evaluationElementWrapper = document.getElementById('evaluationWrapper');

function handleFormSubmit(event) {
    errorElement.innerText = '';
    event.preventDefault();

    // take the value entered in the input
    let textInput = document.getElementById('textInput').value;

    // validate the form input | it should not be empty and maximum of 3000 chars.
    if (textInput.length > 3000 || textInput.length < 4) {
        // update error layout
        errorElement.innerText = 'Text can not be less than 7 chars or more than 3000 chars.';
        return;
    }

    // send it to the server ( to evaluate through the API )

    postText('/evaluate', {textInput: textInput})
        .then((response) => {
            // update layout with result from server:
            let HTML = "";

            Object.keys(response.evaluationData).forEach(function (key) {
                HTML += `<b>${key}</b>: ${response.evaluationData[key]} <br/>`;
            });

            evaluationElement.innerHTML = HTML;
            evaluationElementWrapper.style.display = 'block';
        });


}

const postText = async (url = '', data = {}) => {
    // use Fetch API to Post data: // use try here for internet failing error.
    try{
        const request = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // read the response of this request:
        try {
            return await request.json();
        } catch (e) {
            errorElement.innerHTML = 'Error: ' + e.message;
        }
    }catch (e) {
        errorElement.innerHTML = 'Error: ' + e.message + ' | Please check your internet connection.';
    }

};

export {handleFormSubmit};
