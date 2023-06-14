

# Human Library App: <a href="https://human-library.up.railway.app/" target="_blank">Visit Here</a>
<a href="https://human-library.up.railway.app/" target="_blank">
<img src="https://github.com/lauraoprisan/lauraoprisan/blob/main/media/human-library.gif" width="100%" alt="Human Library App"/>
</a>

A full stack web application designed to be a place where people can share
their life story and discover others. The app can be used independently of the login state of the
user. Non-logged in users can read stories and filter them, while logged in users have
additional features: they can post their story, like/unlike and save/unsave other stories, edit and
delete their own post, comment to each post, like/unlike the comments and delete their own
comment.


## Tech used: ![HTML5 BADGE](https://img.shields.io/static/v1?label=|&message=HTML5&color=23555f&style=plastic&logo=html5)![CSS BADGE](https://img.shields.io/static/v1?label=|&message=CSS3&color=285f65&style=plastic&logo=css3)![JAVASCRIPT BADGE](https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=3c7f5d&style=plastic&logo=javascript)![EXPRESS BADGE](https://img.shields.io/static/v1?label=|&message=EXPRESS&color=bbb111&style=plastic&logo=express)![MONGODB BADGE](https://img.shields.io/static/v1?label=|&message=MONGO-DB&color=cdd148&style=plastic&logo=mongodb)


## Optimizations
- solve image dimension limitation
- rebuild it using React
- automatically correlate country with continent

## Lessons Learned

Utilized callback functions in the server to try and build a modular and scalable backend. Through this I learned , how to effectively simplify backend routes into independent functions


## Installation

1. Clone repo
2. run `npm install`
3. create a file .env in the config folder and update the followeing variables:
- PORT
- MONGO_URI (from MongoDB)
- CLOUD_NAME (from cloudinary) 
- API_KEY (from cloudinary) 
- API_SECRET (from cloudinary) 

## Usage

1. run `npm start`
2. Navigate to `localhost:<PORT>`

