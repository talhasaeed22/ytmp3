import { useState } from 'react';
import './App.css';
import Spinner from './Images/Spinner.gif'
import youtube from './Images/youtube.png'

function App() {
  const [error, setError] = useState('false')
  const [loading, setLoading] = useState('false')
  const [cred, setCred] = useState({link:"", title:"" })
  const [link, setLink] = useState(null)
  const handleInput = async (e) => {
    setLoading('true');
    setError('false')
    e.preventDefault();
    const giveLink = link.videoID;
    
    var givenID = youtube_parser(giveLink);
    console.log(givenID)
    if(givenID === false){
      setError('true'); 
    }else{
      // const givenID = id.videoID;
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${givenID}`, {
      "method": "GET",
      "headers": {
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        'x-rapidapi-key': '0c77206198mshfedeafe1345fc80p19d3ecjsn48dd43210dbb'
      }
    });

    const apiResponse = await fetchAPI.json();
    setLoading('false');
    setCred({link:apiResponse.link, title:apiResponse.title})
    document.getElementById('link').style.display = 'flex';
    }

    
  }
  const onChange = (e) => {
    setLink({ ...link, [e.target.name]: e.target.value })
  }
  function youtube_parser(url){
    var regExp = /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n<>"']*)/i;
    var match = url.match(regExp);
    return (match && match[1].length===11)? match[1] : false;
}
  return (
    <>
      <div className="top-container">

        <form action="" id='form'>
          <h1>YouTube 2 MP3 Converter</h1>
          <label htmlFor="videoID">Enter Video Link</label> <br />
          <div >
            <input className='inp' type="text" name="videoID" id="videoID" onChange={onChange} />
            <button type="submit" onClick={handleInput} id='convert-btn'>Submit</button>
          </div>
        </form>
      </div>

      {error === 'true'? <div className='errors'> Please Enter Valid YouTube link </div> : (loading === 'true'? <img style={{display:'block', margin:'12px auto', width:'300px'}} src={Spinner} alt="Loading" /> :<div style={{display:'none'}} className="bottom-container container" id='link' >
        <div className="card"  style={{width:'28rem', color:'black', border:'1.5px solid blue', borderRadius:'23px'}} >
          <img src={youtube} style={{width:'26%', display:'block', margin:'auto'}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{cred.title}</h5>
            <a href={cred.link} id='download-btn' className="btn btn-primary">Download Here!</a>
          </div>
        </div>
      </div>) }

    </>
  );
}

export default App;
