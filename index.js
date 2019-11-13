const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

function AddDiary(id, title, isActive){
    this.id = id,
    this.title = title,
    this.isActive = true;
};

const diaryBook = new Array();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to my diary'));
app.get('/diaries', (req, res) => {
    if(!diaryBook[0]){
        res.send('No diary written!');
    }
    else{
        res.send(diaryBook.map(i => `#${i.id}: ${i.title} (${i.isActive})`).join('\n'));
        
    }
});
app.get('/diary/:id', (req, res) => {
    if(!diaryBook[req.params.id]){
        res.status(404).send(`Diary #${req.params.id} does not exist!`);
    }
    else{
        if(diaryBook[req.params.id].isActive === true){
            res.send(`#${req.params.id}: ${diaryBook[req.params.id].title} (${diaryBook[req.params.id].isActive})`);
        }
        else{
            res.send(`Diary #${req.params.id} has already been deleted`);
        }
    }
});
app.get('/diary', (req, res) => {
    const query = req.query;
    res.redirect(`/diary/${Object.values(query)[0]}`);
});
app.post('/diary', (req, res) => {
    let id = 0;
    for(; diaryBook[id]; id++){

    }
    const body = req.body;
    console.log(Object.values(body));
    const Diary1 = new AddDiary(id, `${Object.values(body)[0]}`, true);
    diaryBook.push(Diary1);
    res.send(`Added Diary #${id}: ${diaryBook[id].title} (${diaryBook[id].isActive})`);
});
app.put('/diary', (req, res) => {
    const body = req.body;
    const id = Object.values(body)[0];
    if(!diaryBook[id]){
        res.status(404).send('Diary does not exist!');
    }
    else if(diaryBook[id].isActive  === false){
        res.send(`Diary #${id} has already been deleted`);
    }
    else{
        const changedTitle = Object.values(body)[1];
        diaryBook[id].title =  changedTitle;
        res.send(`Changed Diary #${id}: ${diaryBook[id].title} (${diaryBook[id].isActive})`);
    }
});
app.delete('/diary', (req, res) => {
    const body = req.body;
    const id = Object.values(body)[0];
    if(!diaryBook[id]){
        res.status(404).send('Diary does not exist!');
    }
    else if(diaryBook[id].isActive === false){
        res.send(`Diary #${id} has already been deleted`);
    }
    else{
        diaryBook[id].title = '';
        diaryBook[id].isActive = false;
        res.send(`Deleted diary #${id}: ${diaryBook[id].title} (${diaryBook[id].isActive})`);
    }
});

app.listen(port, () => console.log('Week 5 assignment server is running...'));
