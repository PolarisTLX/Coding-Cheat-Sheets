// this file is just about getting fake data from a simluated server
// from jsonplaceholder.typicode.com

import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent  {


  // GETTING DATA FROM THE SERVER:

  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
    // http.get('http://jsonplaceholder.typicode.com/posts')
    // shortened by putting into variable above
    http.get(this.url)
      .subscribe(response => {
        // console.log(response);
        // console.log(response.json());
        this.posts = response.json();
      });
  }


  // SENDING DATA TO THE SERVER:

  // createPost(title: HTMLInputElement) {
  createPost(input: HTMLInputElement) {
    // let post = { title: title.value}
    let post: any = { title: input.value};

    // clear the input field and user presser enter:
    input.value = '';

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = response.json().id;
        this.posts.splice(0, 0, post);
        // to add something to the top of the list:
        // .splice(starting positiong, # of items to delete, what you want to add at this location)
        console.log(response.json());
      });
  }


  // UPDATING DATA TO THE SERVER:

  updatePost(post) {
    // .put() and .patch() are same, but .patch() is to update just small details
    // .patch() is not widely supported

    // this.http.patch(this.url, JSON.stringify({ isRead: true })
    // the one above is a small part of the "post" object, so is smaller packet of information to send
    this.http.put(this.url + '/' + post.id, JSON.stringify(post))
    // this.url targets the whole "posts" section,
    // "this.url + '/' + post.id" targets the 1 specific post that was interacted with
          .subscribe(response => {
        console.log(response.json());
      });
  }


  // DELETING DATA FROM THE SERVER:

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        let indexOfPost = this.posts.indexOf(post);
        this.posts.splice(indexOfPost, 1);
      });
  }

}
