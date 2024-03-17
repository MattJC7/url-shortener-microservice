# URL Shortener Microservice

Project 3 of Back End Development through FreeCodeCamp curriculum

## Function

- Input form accepts a valid URL checked via DNS lookup
- If a valid URL is submitted, the original URL and a new URL are submitted to a MongoDB
- A JSON object is returned with the above information
- Inputting the new URL into the API redirects to the original URL

## How to use 

### Shorten a URL

- Input original URL to form

### Retrieve an original URL

- Input new URL as below:

```
[project_URL]/api/shorturl/<new_URL>
```

## Further development

1) Add functionality to display recently submitted URLs, with new URL alongside

## Learning

- The first argument to Mongoose model constructor defines the name of the MongoDB collection

```
let Url = mongoose.model('url', urlSchema);

//Collection name becomes 'urls'
```
***

- Mongoose queries such as `model.countDocuments()` return a promise. To declare the results of a query in a variable, use `async await`
- This was useful general JavaScript learning, but also database/back end related

```
async (req, res) => {
  const count = await Url.countDocuments({}).then((count) => {return count}).catch((err) => console.log(err))
}

//Note that the .then() and .catch() aren't strictly needed to return the value. I commented out the .then() but left in the .catch() for error handling purposes
```
***

- A general debugging issue I came across was in lines 40, 41 and 46, 47. On first pass, I'd named the JSON properties in `res.json()` as required by FreeCodeCamp but also named the properties for my MongoDB with these values, which was different to my schema. In hindsight, I should have aligned the schema with the FreeCodeCamp requirements.