import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../app';


chai.use(chatHttp);
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const { expect } = chai;

const user = {
    username: 'antoha-2',
    password: 'my_pass-2'
}

const another_user = {
    username: 'antoha',
    password: 'my_pass'
}

let token = null
before(function(done){
    chai.request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.data).to.include({
                user_id: 2,
                username: user.username
            });
            expect(res.body.data).to.have.keys('token', 'user_id', 'username')
            token = res.body.data.token;
            done();
        });
});

const note = {
    title: "My Diary",
    text: "Should finish test challenge by May 6th"
}

describe('Testing the note endpoints:', () => {
    it('It should create a note for the user', (done) => {
        // console.log(token)
        chai.request(app)
            .post('/api/note/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(note)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1
                });
                expect(res.body.data).to.have.keys('id', 'text', 'title', 'user_id', 'updatedAt', 'createdAt')
                done();
            });
    });
    
    it('It should get all notes', function(done){
        // console.log(token)
        chai.request(app)
            .get('/api/note/')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                // console.log(res.statusCode)
                // console.log(res.body)
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.be.an('array').that.contains.something.like({'id': 1, 'title': note.title, 'user_id': 2, text: note.text})
                done();
            })
    });

    it('It should not get all notes if not authorized', function(done){
        // console.log(token)
        chai.request(app)
            .get('/api/note/')
            .end((err, res) => {
                // console.log(res)
                // console.log(res.message)
                expect(res.statusCode).to.equal(302);
                done();
            })
    });

    const new_note = {
        title: 'Changes Title',
        text: 'Lets finish testing!'
    }
    it('It should edit note', function(done) { 
        chai.request(app)
            .put('/api/note/edit/1')
            .set('Authorization', `Bearer ${token}`)
            .send(new_note)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    title: new_note.title,
                    text: new_note.text
                })
                done();
            })
    })

    let another_token = null

    it('It should login as another user', function(done){
        // console.log(token)
        chai.request(app)
            .post('/api/user/login')
            .send(another_user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.have.keys('token', 'username')
                another_token = res.body.data.token;
                done();
            })
    });

    it('It should not give edit note to not owner of a note', function(done) {
        const new_note = {
            title: 'Changes Title',
            text: 'Lets finish testing!'
        }
        chai.request(app)
            .put('/api/note/edit/1')
            .set('Authorization', `Bearer ${another_token}`)
            .send(new_note)
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            })
    })

    let link = null
    it('It should share note', function(done) {
        chai.request(app)
            .get('/api/note/share/1')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.have.property('link')
                link = res.body.data.link
                done();
            })
    })
    
    it('It should get a note by a link even if unauthorized', function(done) {
        console.log(link)
        chai.request(app)
            .get(link)
            .end((err, res) => {
                console.log(err)
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.include({
                    id: 1,
                    title: new_note.title,
                    text: new_note.text
                })
                done();
            })
    })

  });