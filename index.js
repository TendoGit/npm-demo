const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const courses = require('./routes/courses');
const express =  require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(helmet());
app.use('/api/courses', courses);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...')
}


//Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Welcome'
    });
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));