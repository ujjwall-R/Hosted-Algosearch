# ALGOsearch

ALGOsearch is a Search Engine designed specifically for Data Structure and Algorithm questions in platforms like codechef and codeforces.

<!-- ![alt text](https://github.com/ujjwall-R/Hosted-Algosearch/blob/master/pic.png?raw=true) -->

## Web Application

It uses TF-IDF Algorithm to implement search. The server is live on [https://algosearchujjwal.herokuapp.com/](https://algosearchujjwal.herokuapp.com/).

## Installation
 
### Dependencies

* [Node](https://nodejs.org/en/)
* [Python](https://www.python.org/downloads/)

### Local Building
Clone or unzip the [repository](https://github.com/ujjwall-R/Hosted-Algosearch.git).
```bash
git clone https://github.com/ujjwall-R/Hosted-Algosearch.git
cd Hosted-Algosearch
``` 
Install the dependency modules for both server and client side of the application. The client side is a [ReactJS](https://reactjs.org/) app built using  [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).
```bash
npm install
cd client
npm install
cd ..
```
### Rebuilding the DataSet [optional]
The DataSet is already build in markup: ```./DataSet```. Anyways you can rebuild the DataSet if you wish.

## Usage 
```python
import foobar
# returns 'words' foobar.pluralize('word')
# returns 'geese' foobar.pluralize('goose') # returns 'phenomenon' foobar.singularize('phenomena') 
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please contact to suggest any change in the corpus.
