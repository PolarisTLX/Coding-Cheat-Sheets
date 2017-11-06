// examples to grab and modify the innerHTML of elements in our HTML file:

var el = document.querySelector('htmlElementName');

//NOTE the backticks make it easier for multi-line code:
el.innerHTML = `
    <h1>Hello</h1>
    <style>h1 { color: red }</style>
`;
