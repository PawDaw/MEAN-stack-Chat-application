import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ChatService} from "./chat.service";



@Injectable()
export class SocketService {

    private url = window.location.origin;
    //private url = 'http://localhost:3004';

    private socket;


    constructor() {
        this.socket = io(this.url);

    }









}