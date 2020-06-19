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

    Client.postData('/evaluate', {textInput: textInput})
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

module.exports = {
    handleFormSubmit
} ;