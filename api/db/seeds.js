const mongoose = require('mongoose');
const config   = require('../config/config');
const async      = require('async');
const Bluebird   = require('bluebird');

mongoose.Promise = Bluebird;

mongoose.connect(config.db, () => {
  console.log(`Connected to ${config.db}`);
});

const User    = require('../models/user');
const Event   = require('../models/event');
const Request = require('../models/request');

async.waterfall([
  dropCollections,
  createUsers,
  createFirstEvent,
  createFirstRequest,
  createSecondRequest,
  createThirdRequest,
  pickAttendee,
  createSecondEvent,
  createFourthRequest,
  createFifthRequest,
  createSixthRequest,
  pickSecondAttendee
], function(err) {
  if (err) return console.log(err);
  console.log('Seeding complete');
  return process.exit();
});

function dropCollections(done) {
  User.collection.drop();
  Event.collection.drop();
  done();
}

function createUsers(done){
  const users = [
    {
      firstName: 'Thom',
      lastName: 'Yorke',
      email: 'thom@yorke.com',
      profilePicture: 'https://static.stereogum.com/uploads/2015/03/Thom-Yorke.jpg',
      dob: '08/08/1968',
      lat: '51.522245',
      lng: '-0.083897',
      bio: 'Radiohead man',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Nils',
      lastName: 'Frahm',
      email: 'nils@frahm.com',
      profilePicture: 'https://f4.bcbits.com/img/0006744075_10.jpg',
      dob: '20/09/1982',
      lat: '51.522245',
      lng: '-0.083897',
      bio: 'Piano man',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Brian',
      lastName: 'Eno',
      email: 'brian@eno.com',
      profilePicture: 'https://readersrecommend.files.wordpress.com/2012/10/brian_eno_2.jpg',
      dob: '15/05/1948',
      lat: '51.522245',
      lng: '-0.083897',
      bio: 'Ambient man',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Damon',
      lastName: 'Albarn',
      email: 'damon@albarn.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/2f/13/73/2f1373dd2352bd91afd72b1ee3138bdb.jpg',
      dob: '23/07/1968',
      latlng: '51.522245, -0.083897',
      bio: 'Ambient man',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Beyonce',
      lastName: 'Knowles',
      email: 'beyonce@knowles.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/39/6c/53/396c53b3d8d43cc3d1a8c2a54c1d68f0.jpg',
      dob: '01/09/83',
      bio: 'Triple Threat',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Preston',
      lastName: 'Oshita',
      email: 'towkio@towkio.com',
      profilePicture: 'https://video-images.vice.com/articles/57d9a79011e73165641e74dd/lede/noiseynext_1440x785.jpg',
      dob: '02/04/1991',
      bio: 'I rap',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Harley E.',
      lastName: 'Streten',
      email: 'flume@flume.com',
      profilePicture: 'https://ichef.bbci.co.uk/images/ic/1200x675/p033s76j.jpg',
      dob: '05/11/1991',
      bio: 'Flume',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Matthew',
      lastName: 'Walker',
      email: 'julio@bashmore.com',
      profilePicture: 'https://www.residentadvisor.net/images/features/2015/julio-bashmore-pop-fish.jpg',
      dob: '03/04/1990',
      bio: 'DJ',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Monica',
      lastName: 'Belluci',
      email: 'monica@belluci.com',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Monica_Bellucci,_Women%27s_World_Awards_2009_b.jpg/1200px-Monica_Bellucci,_Women%27s_World_Awards_2009_b.jpg',
      dob: '30/09/1964',
      bio: 'Actress/Model',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Louis',
      lastName: 'Celestin',
      email: 'kaytranada@kaytranada.com',
      profilePicture: 'https://i.ytimg.com/vi/tMcaJMvDtLc/maxresdefault.jpg',
      dob: '25/08/1992',
      bio: 'Music Producer',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Kelela',
      lastName: 'Mizanekristos',
      email: 'kelela@miz.com',
      profilePicture: 'https://warpnet-media.s3.amazonaws.com/1c37853afa53a0150b1d27cda3a83faf9f7f5470be8eacbe6f8b615d',
      dob: '06/06/1983',
      bio: 'Singer, Artist and Songwriter',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'David',
      lastName: 'Gilmour',
      email: 'david@gilmour.com',
      profilePicture: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/28/02/5864463.jpg',
      dob: '06/03/1946',
      bio: 'Pink Floyd',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Emma',
      lastName: 'Stone',
      email: 'emma@stone.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/97/1d/36/971d3692557fb7d177227bf763948b9f.jpg',
      dob: '06/11/1988',
      bio: 'Actress',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Kerry',
      lastName: 'Washington',
      email: 'kerry@washington.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/79/ac/86/79ac865dc1ab576d2b114baad37e6b8c.jpg',
      dob: '31/01/1977',
      bio: 'Actress',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Yayoi',
      lastName: 'Kusama',
      email: 'yayoi@kusama.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/53/dc/a3/53dca34d15a6b1cb9e3313f4db3a41fd.jpg',
      dob: '22/03/1929',
      bio: 'Artist',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Barack',
      lastName: 'Obama',
      email: 'barack@obama.com',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Poster-sized_portrait_of_Barack_Obama_OrigRes.jpg',
      dob: '04/08/1961',
      bio: 'unemployed atm - lots of free time',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      firstName: 'Gautama',
      lastName: 'Buddha',
      email: 'gautama@buddha.com',
      profilePicture: 'https://s-media-cache-ak0.pinimg.com/originals/57/44/4e/57444e409202d25bb85c81c7bfbe792d.jpg',
      dob: '567bc',
      bio: 'A spiritual leader, offering guidance',
      password: 'password',
      passwordConfirmation: 'password'
    }
  ];

  Bluebird.map(users, user => {
    return User.create(user);
  }).then(users => {
    console.log(`${users.length} were created.`);
    done(null);
  }).catch(done);
}

function createFirstEvent(done){
  User.findOne({
    email: 'thom@yorke.com'
  }).then(user => {
    const today = new Date();
    const event = new Event({
      address: '2, Oliver’s Yard, 55 City Rd, London EC1Y 1HQ',
      lat: '51.523928',
      lng: '-0.086171',
      name: 'Coffee with Thom',
      description: 'Enjoy this place I\'ve never been to',
      cost: '£100',
      url: 'http://lantanacafe.co.uk/',
      img: 'http://combiboilersleeds.com/images/coffee/coffee-2.jpg',
      emoji: '☕',
      host: user._id,
      startTime: today.setDate(today.getDate() + 10),
      finishTime: today.setDate(today.getDate() + 11)
    });
    return event.save();
  })
  .then(event => {
    console.log(`${event.description} was created`);
    return done(null, event);
  })
  .catch(done);
}

function createFirstRequest(event, done) {
  User.findOne({
    email: 'brian@eno.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Thom what\'s kicking?',
      sender: user._id,
      event: event._id,
      interested: true
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function createSecondRequest(event, done) {
  User.findOne({
    email: 'nils@frahm.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Yo let\'s party Thom.',
      sender: user._id,
      event: event._id,
      interested: true
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function createThirdRequest(event, done) {
  User.findOne({
    email: 'damon@albarn.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Who is dis?',
      sender: user._id,
      event: event._id,
      interested: false
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function pickAttendee(event, done) {
  User.findOne({
    email: 'nils@frahm.com'
  }).then(user => {
    return Request.findOne({
      event: event._id,
      sender: user._id
    });
  }).then(request => {
    request.status = 'accepted';
    return request.save();
  }).then(request => {
    console.log(`${request.text} was accepted`);
    return done(null);
  })
  .catch(done);
}

function createSecondEvent(done){
  User.findOne({
    email: 'thom@yorke.com'
  }).then(user => {
    const today = new Date();
    const event = new Event({
      address: '2, Oliver’s Yard, 55 City Rd, London EC1Y 1HQ',
      lat: '51.523928',
      lng: '-0.086171',
      name: 'Coffee with Thom',
      description: 'Enjoy this place I\'ve never been to',
      cost: '£100',
      url: 'http://lantanacafe.co.uk/',
      img: 'http://combiboilersleeds.com/images/coffee/coffee-2.jpg',
      emoji: '☕',
      host: user._id,
      startTime: today.setDate(today.getDate() + 10),
      finishTime: today.setDate(today.getDate() + 11)
    });
    return event.save();
  })
  .then(event => {
    console.log(`${event.description} was created`);
    return done(null, event);
  })
  .catch(done);
}

function createFourthRequest(event, done) {
  User.findOne({
    email: 'brian@eno.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Thom what\'s kicking?',
      sender: user._id,
      event: event._id,
      interested: true
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function createFifthRequest(event, done) {
  User.findOne({
    email: 'nils@frahm.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Yo let\'s party Thom.',
      sender: user._id,
      event: event._id,
      interested: true
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function createSixthRequest(event, done) {
  User.findOne({
    email: 'damon@albarn.com'
  })
  .then(user => {
    const request = new Request({
      text: 'Who is dis?',
      sender: user._id,
      event: event._id,
      interested: false
    });
    return request.save();
  })
  .then(request => {
    console.log(`${request.text} was created`);
    done(null, event);
  })
  .catch(done);
}

function pickSecondAttendee(event, done) {
  User.findOne({
    email: 'nils@frahm.com'
  }).then(user => {
    return Request.findOne({
      event: event._id,
      sender: user._id
    });
  }).then(request => {
    request.status = 'accepted';
    return request.save();
  }).then(request => {
    console.log(`${request.text} was accepted`);
    return done(null);
  })
  .catch(done);
}
