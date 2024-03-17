# URL Shortener Microservice

Project 3 of Back End Development through FreeCodeCamp curriculum

## Function

- Accepts a date string (DD Month YYYY), date (YYYY-MM-DD) or unix timestamp and provides a JSON object with unix and UTC properties
- A blank query returns the current date

## How to use 

```

```

## Learning

- The first argument to Mongoose model constructor defines the name of the MongoDB collection

```
let Url = mongoose.model('url', urlSchema);

//Collection name becomes 'urls'
```

- Mongoose queries such as `model.countDocuments()` return a promise. To declare the results of a query in a variable, use `async await`
- This was useful general JavaScript learning, but also database/back end related

```
async (req, res) => {
  const count = await Url.countDocuments({}).then((count) => {return count}).catch((err) => console.log(err))
}

//Note that the .then() and .catch() aren't strictly needed to return the value. I commented out the .then() but left in the .catch() for error handling purposes
```

- A general debugging issue I came across was in lines 40, 41 and 46, 47. On first pass, I'd named the JSON properties in `res.json()` as required by FreeCodeCamp but also named the properties for my MongoDB with these values, which was different to my schema. In hindsight, I should have aligned the schema with the FreeCodeCamp requirements.