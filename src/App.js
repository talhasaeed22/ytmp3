import { useState } from 'react';
import './App.css';
// import header from './Images/header.jpg'
import youtube from './Images/youtube.png'
function App() {
  const [cred, setCred] = useState({link:"", title:"" })
  const [id, setId] = useState(null)
  const handleInput = async (e) => {
    e.preventDefault();
    const givenID = id.videoID;
    console.log(id.videoID)
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${givenID}`, {
      "method": "GET",
      "headers": {
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        'x-rapidapi-key': '0c77206198mshfedeafe1345fc80p19d3ecjsn48dd43210dbb'
      }
    });

    const apiResponse = await fetchAPI.json();
    console.log(apiResponse)
    setCred({link:apiResponse.link, title:apiResponse.title})
    document.getElementById('link').style.display = 'flex';
  }
  const onChange = (e) => {
    setId({ ...id, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="top-container">

        <form action="" id='form'>
          <h1>YouTube 2 MP3 Converter</h1>
          <label htmlFor="videoID">Enter Video ID</label> <br />
          <div >
            <input className='inp' type="text" name="videoID" id="videoID" onChange={onChange} />
            <button type="submit" onClick={handleInput} id='convert-btn'>Submit</button>
          </div>
        </form>
      </div>

      <div className="bottom-container container" id='link' style={{display:'none'}}>
        <div className="card"  style={{width:'28rem', color:'black', border:'1.5px solid blue', borderRadius:'23px'}} >
          <img src={youtube} style={{width:'26%', display:'block', margin:'auto'}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{cred.title}</h5>
            <a href={cred.link} id='download-btn' className="btn btn-primary">Download Here!</a>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
