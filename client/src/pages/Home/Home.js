import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import ArticleCard from "../../components/ArticleCard";
import SavedCard from "../../components/SavedCard";
import Button from '../../components/Button';
import API from '../../utils/API'

class Home extends Component {

    state = {
        searchCriteria: "",
        startYear: 2018,
        endYear:2018,
        searchResults: [],
        savedArticles: []
        };

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedArticles()
        .then((res) => {
            this.setState({savedArticles: res.data})
        })
        .catch((err) => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    //if user performs empty search, find current top stories
    if(this.state.searchCriteria === ''){
        this.setState({
        searchCriteria: "top stories"
        })
    }

    const searchParams = {
        queryText: this.state.searchCriteria,
        startYear: this.state.startYear,
        endYear: this.state.endYear
    }

    //call search API
    API.searchNews(searchParams)
    .then((res) => {
        console.log("Success")
        
        //transform results to JSON object
        const results = JSON.parse(res.data);
        
        //loop thru articles
        results.response.docs.slice(0,6).map(article => {
            //if no photo url is provided by NYT, insert generic
            if(article.multimedia.length !== 0){
                article.multimedia[0].url = "https://static01.nyt.com/" + article.multimedia[0].url
            } else {
                article.multimedia.push({});//must add 0th element to add url for standard reference
                article.multimedia[0].url = "http://wldywjbl.co/wp-content/uploads/2014/11/news2.jpg"
            }                
        });
        
        //set first 5 results array elements to state
        this.setState({searchResults: results.response.docs.slice(0,6)});
        
        //reset the query text field only...assuming user may search again in same year range
        this.setState({
        searchCriteria: ""
        });
    })
    .catch((err) => console.log(err));
    };
    
    saveArticle = article => {
        //store article details in object and server to api
        const data = {
            title: article.headline,
            summary: article.snippet,
            photo: article.photo,
            link: article.url
        }

        API.saveArticle(data)
        .then(res =>{

            //add saved article to existing state array (push)
            this.setState({ savedArticles: [...this.state.savedArticles, res.data] })
        })
        .catch(console.log)
    }

    deleteArticle = articleId => {
        console.log(articleId)
        API.deleteArticle(articleId)
        .then(res =>{
            
            //filter out the deleted article and reset state
            this.setState({ savedArticles: this.state.savedArticles.filter(article => article._id !== res.data.id) })

          })
        .catch(console.log)
    }

  render() {
    return (
        <main>
            <div className='container padding-1'>
                {/* search news section */}
                <div className="col s12 m12 l12 xl12">
                    <Row>
                        <div>
                            <h4 className='dash-title center-align'>Sermons</h4>
                        </div>
                        <div>
                            <p className="mission-statement">
                            Befree Community Church in Somersworth is a family of ordinary people doing life together so we can love God, love others, and make disciples. Since God first loved us in spite of our brokenness, all are welcome in our community.
                            </p>
                        </div>

                    </Row>
                </div>
            </div>
        </main>);
    }
}

export default Home;
