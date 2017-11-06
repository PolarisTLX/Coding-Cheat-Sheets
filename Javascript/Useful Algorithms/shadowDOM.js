//took the innerHTML.js example to show how you can Use
// "shadow DOM" to prevent a rule like one below affecting and <h1> element
// from affecting all <h1> elements:

var el = document.querySelector('htmlElementName');
var root = el.createShadowRoot();    // <--- this line and below is what is added / chnaged

root.innerHTML = `
    <h1>Hello</h1>
    <style>h1 { color: red }</style>
`;

//this will apparently assurethat only this one <h1> element is affected
