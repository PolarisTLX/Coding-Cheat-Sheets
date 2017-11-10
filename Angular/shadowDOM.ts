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



@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',  // external template form-2
  styleUrls: ['./favorite.component.css'],  // external style .css

  encapsulation: ViewEncapsulation.Emulated  // Angular default mode, it attaches aditional rules to our CSS, works best
  //encapsulation: ViewEncapsulation.Native  // Many browsers still not working with this
  // pretty much never use this ".None" one below:
  //encapsulation: ViewEncapsulation.None  // this will allow styles to be leaked to other components

  // need to go ot chrome dev tools -> Preferences -> Elements -> check off "Show user agent shadow DOM"
})
