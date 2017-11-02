import { LikeComponent } from './like.component';

// create instance of this class:
let component = new LikeComponent(10, true);
// this example it has 10 likes to start, and like has already been clicked
// call the onClick function
component.onClick();
console.log(`likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`);


// after the two files are compiles in Command Promt or Git Bash,
// result should give:
// "likesCount: 9, isSelected: false"

//with the protected version need to instead type in git bash:
//   tsc *.ts --target ES5 && node main.js
// to force it into the correct version of ES5
