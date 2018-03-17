import { TestBed, inject } from '@angular/core/testing';
import {ChatService} from "./chat.service";
import { HttpModule } from '@angular/http';
import {Chat} from './chat.model';


let testService: ChatService;
let responsePropertyNamesCHAT : Chat;
let responsePropertyNames;

describe('ChatService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChatService],
            imports: [HttpModule]
        });



        //Get the injected service into our tests
        testService= TestBed.get(ChatService);

    });

    it('Retrieve Messages from the server, compared data are the same',async() => {

        testService.getMessages().subscribe(value => {
            //Checking the property names of the returned object and the mockPaste object
            this.responsePropertyNamesCHAT = Object.getOwnPropertyNames(value[0]);

            expect(this.responsePropertyNamesCHAT.nickname).toContain('ania@gmail.com');

        });
    });


    it('Retrieve Rooms from the server, compared data are the same ',async() => {

        testService.getRooms().subscribe(value => {
            //Checking the property names of the returned object and the mockPaste object
            responsePropertyNames = Object.getOwnPropertyNames(value[0]);

            expect(responsePropertyNames).toContain('Python');
        });
    });




    it('Retrieve User name from the server, compared data are the same',async() => {

        testService.getUserName().subscribe(value => {
            //Checking the property names of the returned object and the mockPaste object
            responsePropertyNames = Object.getOwnPropertyNames(value[0]);

            expect(responsePropertyNames).toContain('ania@gmail.com');

        });
    });
});