/*There are 2 ways to add/remove classes to DOM elements dynamically. What are they?

class binding: [class.name]

and

ngClass directive  <ngClass>
*/






// Style Binding Example
// (to change CSS style of elements based on coded scenarios)

template: `
  <button [style.backgroundColor]="isActive ? 'blue' : 'white'">Save</button>
`
})

export class CoursesComponent {
isActive = true;
}
// if true, the button's background will be blue, else it will be white
*/
