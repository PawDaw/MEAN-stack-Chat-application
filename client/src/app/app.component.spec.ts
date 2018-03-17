import {AppComponent} from "./app.component";
import { TestBed } from '@angular/core/testing';
import {ChatService} from "./chat.service";
import { HttpModule } from '@angular/http';

let testService: ChatService;

describe('App Component, Services', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChatService,AppComponent],
            imports: [HttpModule]
        });

        //Get the injected service into our tests
        testService= TestBed.get(ChatService);

    });

    it('should be truthly', ()=>{

        let app = new AppComponent(testService);
        expect(app).toBeTruthy();
    });

    it('Retrieve Messages from the server, the data is not null. ', ()=>{

        let app = new AppComponent(testService);

        expect(app.getData()).not.toBeNull();

    });

    it('Retrieve Rooms from the server, the data is not null', ()=>{

        let app = new AppComponent(testService);

        expect(app.getRoom()).not.toBeNull();

    });

    it('Retrieve User NAME from the server, the data is not null.', ()=>{

        let app = new AppComponent(testService);

        expect(app.getUserName()).not.toBeNull();


    });

});

