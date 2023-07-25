import { useState } from 'react'
import axios from 'axios'



const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const googleApiKey = 'AIzaSyDpOoQdB6Q5_1J4fk8YJ_vx0uSsCBOZChw'
    const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=017576662512468239146:omuauf_lfve&q=${searchTerm}&num=5`

    setLoading(true)

    try {
      const googleResponse = await axios.get(googleSearchUrl);
      const urls = googleResponse.data.items.map((item) => item.link);

      
      const serverScrapeUrl = 'https://scrapy-n4n0.onrender.com/scrape' 

      const scrapeResponse = await axios.post(serverScrapeUrl, { urls })

      console.log(scrapeResponse)

      const textResults = scrapeResponse.data

      setSearchResults(textResults);
      setLoading(false)


    } catch (error) {
      setLoading(false)
      console.log(error)
      alert(error)
    }
    
  }


  return (
    <div className="app">
        <div className="search_box">
          <form onSubmit={handleSubmit}>
            <input placeholder="Search..." className='app_input' required type="text" onChange={(e)=>setSearchTerm(e.target.value)}/>
          </form>
        </div>

        <div className="search_results">
          {loading ? (
            <div className="lode">
              <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            </div>
          ):(
            <>
            {searchResults.map((result, index) => (
            <p key={index} className="main_content">
              {result}
            </p>
          ))}
            </>
          )}
        </div>
    </div>
  )
}

export default App