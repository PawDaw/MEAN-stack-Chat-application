import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Chat }           from './chat.model';
import { Observable }     from 'rxjs/Observable';

import * as io from 'socket.io-client';
import {Room} from "./room.model";


@Injectable()
export class ChatService {
    private getBlogsUrl = 'chat/get';  // URL to web API
    private postAddMessageUrl = 'chat/addMessage';  // URL to web API
    private postAddRoomUrl = 'chat/addRoom';  // URL to web API
    private updateBlogUrl = '/update';  // URL to web API


    constructor (private http: Http) {}

    private socket;

    //private url = 'http://localhost:3004';
    private url = window.location.origin;


    /* getBlogs (): Observable<Blog[]> {
         let observable = new Observable(observer => {

             console.log("Socket:",this.url);
             this.socket = io(this.url);
             this.socket.on('new-message', (data) => {
                 observer.next(data);
             });

             return () => {
                 this.socket.disconnect();
             };
         });
         return observable;
     }*/



    getUserName(): Observable<string[]> {
        return new Observable(observer => {

            // print out the socket port
            console.log("Socket:",this.url);

            // get data
            this.socket = io(this.url);
            this.socket.on('new-getUsername', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });

    }

    getRooms(): Observable<Room[]> {
        return new Observable(observer => {


            // get data
            this.socket = io(this.url);
            this.socket.on('new-rooms', (data) => {
                observer.next(data);
                console.log("Rooms Test:", data);

            });


            return () => {
                this.socket.disconnect();
            };
        });

    }



    getMessages (): Observable<Chat[]> {
        return new Observable(observer => {

            // print out the socket port
            console.log("Socket:",this.url);

            // get data
            this.socket = io(this.url);
            this.socket.on('new-message', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });

    }


    /*
     * Send room to server
     */
    addRoom (room: Room): Observable<Room> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postAddRoomUrl, room, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Send meassge to the server
     */
    addMessage (message: Chat): Observable<Chat> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postAddMessageUrl, message, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Update blog meassge to server
     */
    updateBlog (message: Chat): Observable<Chat> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.updateBlogUrl, message, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
