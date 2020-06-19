const handleFormSubmitModule = require('../src/client/js/handleFormSubmit');

test('Function postData is defined.', () => {
    expect(handleFormSubmitModule.handleFormSubmit).toBeDefined();
});