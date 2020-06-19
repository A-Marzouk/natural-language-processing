const postData = require('../src/client/js/postData');


test('the data is peanut butter', () => {
    return postData('/evaluate', {textInput: 'John is a good man'}).then(data => {
        expect(data).toBeTruthy();
    });
});