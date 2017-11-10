@Component({
  selector: 'favorite',
  // template: '',   // inline template form-1, for simple templates of <~5 lines of code
  templateUrl: './favorite.component.html',  // external template form-2
  // both inline and external can be present, but the last one is what is implemented
  // all aspects are the first listed style will be ignored if another style is called after
  styleUrls: ['./favorite.component.css'],  // external style .css
  styles: [                                 // inline style .css
    `
    .glyphicon {
      color: blue;
    }
    `
  ],
