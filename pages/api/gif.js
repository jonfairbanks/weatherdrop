import { GiphyFetch } from '@giphy/js-fetch-api'

// Init Giphy SDK
const giphy = new GiphyFetch(process.env.GIPHY_KEY)

export default function handler(req, res) {
  // Get weather id, and grab related search keyword
  let { weatherId } = req.query
  const searchTerm = getFunnySearchTerm(weatherId)

  // Search giphy for gif based on weather keyword
  return giphy.search( searchTerm, { sort: 'relevant', lang: 'en', limit: 2, type: 'gifs' })
    .then(response => {
      // select random gif from response
      let rndInt = Math.floor(Math.random() * response.data.length)
      let gifUrl = response.data[rndInt].images.original.url
      // Respond with selected gif url
      res.status(200).json({ gif: gifUrl })
    })
}

function getFunnySearchTerm(weatherId) {
  const funnySearchTerms = searchTermMappings[weatherId]
  const rndInt = Math.floor(Math.random() * funnySearchTerms.length) 
  const funnyTerm = funnySearchTerms[rndInt]
  return funnyTerm
}

const searchTermMappings = {
  //thunderstorms
  '200' : ['thunderstorm with light rain'], //thunderstorm with light rain
  '201' : ['thunderstorm with rain'], //thunderstorm with rain
  '202' : ['thunderstorm with heavy rain'], //thunderstorm with heavy rain
  '210' : ['light thunderstorm'], //light thunderstorm
  '211' : ['thunderstorm'], //thunderstorm
  '212' : ['heavy thunderstorm'], //heavy thunderstorm
  '221' : ['ragged thunderstorm'], //ragged thunderstorm
  '230' : ['thunderstorm with light drizzle'], //thunderstorm with light drizzle
  '231' : ['thunderstorm with drizzle'], //thunderstorm with drizzle
  '232' : ['thunderstorm with heavy drizzle'], //thunderstorm with heavy drizzle
  //drizzle
  '300' : ['light intensity drizzle'], //light intensity drizzle
  '301' : ['drizzle'], //drizzle
  '302' : ['heavy intensity drizzle'], //heavy intensity drizzle
  '310' : ['light intensity drizzle rain'], //light intensity drizzle rain
  '311' : ['drizzle rain'], //drizzle rain
  '312' : ['heavy intensity drizzle rain'], //heavy intensity drizzle rain
  '313' : ['shower rain and drizzle'], //shower rain and drizzle
  '314' : ['heavy shower rain and drizzle'], //heavy shower rain and drizzle
  '321' : ['shower drizzle'], //shower drizzle
  //rain
  '500' : ['light rain'], //light rain
  '501' : ['moderate rain'], //	moderate rain
  '502' : ['heavy intensity rain'], //heavy intensity rain
  '503' : ['very heavy rain'], //very heavy rain
  '504' : ['extreme rain'], //extreme rain
  '511' : ['freezing rain'], //freezing rain
  '520' : ['light intensity shower rain'], //light intensity shower rain
  '521' : ['shower rain'], //shower rain
  '522' : ['heavy intensity shower rain'], //heavy intensity shower rain
  '531' : ['ragged shower rain'], //ragged shower rain
  //snow
  '600' : ['light snow'], //light snow
  '601' : ['Snow'], //Snow
  '602' : ['Heavy snow'], //Heavy snow
  '611' : ['Sleet'], //Sleet
  '612' : ['Light shower sleet'], //Light shower sleet
  '613' : ['Shower sleet'], //Shower sleet
  '615' : ['Light rain and snow'], //Light rain and snow
  '616' : ['Rain and snow'], //Rain and snow
  '620' : ['Light shower snow'], //Light shower snow
  '621' : ['Shower snow'], //Shower snow
  '622' : ['Heavy shower snow'], //Heavy shower snow
  //atmosphere
  '701' : ['mist'], //mist
  '711' : ['Smoke'], //	Smoke
  '721' : ['Haze'], //Haze
  '731' : ['sand dust whirls'], //sand/ dust whirls
  '741' : ['fog'], //fog
  '751' : ['sand'], //sand
  '761' : ['dust'], //dust
  '762' : ['volcanic ash'], //volcanic ash
  '771' : ['squalls'], //squalls
  '781' : ['tornado'], //tornado
  //Clear
  '800' : ['clear sky'], //clear sky
  //Clouds
  '801' : ['few clouds'], //few clouds: 11-25%
  '802' : ['scattered clouds'], //scattered clouds: 25-50%
  '803' : ['broken clouds'], //broken clouds: 51-84%
  '804' : ['overcast clouds'], //overcast clouds: 85-100%
}