// https://www.youtube.com/watch?v=xRyM33359bY
const youtubeid = require('get-video-id');

var id = youtubeid("https://www.youtube.com/watch?v=xRyM33359bY");

console.log(id)

function youtube_parser(url){
    var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    return (match && match[1].length==11)? match[1] : false;
}

console.log(youtube_parser("https://www.youtube.com/watchasd?v=xRyM33359bY"))