import {Component, OnInit} from '@angular/core';
import {Chat} from './chat.model';
import {Room} from './room.model';
import './rxjs-operators';
import {SocketService} from "./socket.service";
import {ChatService} from "./chat.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ChatService, SocketService]
})
export class AppComponent implements OnInit {


    public chatMessages = [];
    public chatRooms = [];
    public selectedMessages = [];
    public userName = [];

    title = 'Chat APP';
    roomModel = new Room('');
    model = new Chat('', '', '', '');
    newRoom = { name: ''};



    constructor(private chatService: ChatService) {
    }


    addMessage() {

        var date = new Date();

        this.model = {room: this.roomModel.name, nickname : this.userName.toString() , message: this.model.message, updated_at: date.getDate().toString()};

        this.chatService.addMessage(this.model).subscribe(
            blogMsg => {
                console.log("Post message:", blogMsg);


                this.model.nickname = '';
                this.model.message = '';


            },
            error => this.title = <any>error
        );
    }


    addRoom() {

            this.chatService.addRoom(this.newRoom).subscribe(
                blogMsg => {
                    console.log("new Room:", blogMsg);
                    // this.model = blogMsg;
                    //this.getBlogs();

                    this.newRoom.name = '';

                },
                error => this.title = <any>error
            );
    }

    getData() {
        console.log("Subscribe to service");

        this.chatService.getMessages().subscribe(
            data => {
                console.log("Messages:", data);
                this.chatMessages = data;
                this.joinRoom();

            },
            error => this.title = <any>error
        );
    }


    getRoom() {
        console.log("Subscribe to service");
        console.log("Room ", this.roomModel.name);

        this.chatService.getRooms().subscribe(
            data => {
                console.log("Rooms:", data);

                this.chatRooms = data;

            },
            error => this.title = <any>error
        );
    }


    getUserName(){
        this.chatService.getUserName().subscribe(
            data => {
                console.log("User name:", data);
                this.userName = data;
            },
            error => this.title = <any>error
        );
    }



    joinRoom() {

        // clear Array
        this.selectedMessages = [];


        for (let i = 0; i < this.chatMessages.length; i++) {
            let message: Chat = this.chatMessages[i];

            if (message.room == this.roomModel.name) {
                this.selectedMessages.push(message);
            }
        }

        /*  this.selectedMessages.forEach( (item, index) => {
          if(item.room == this.roomModel.name)
              this.selectedMessages.push(item);
      });
     */

        // Console LOGS
        console.log("Selected Messages", this.selectedMessages);
        console.log("Messages ROOMS", this.roomModel);
    }



// Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
// Called once, after the first ngOnChanges().


    ngOnInit() {
        this.getRoom();
        this.getData();
        this.getUserName();

    }

}
