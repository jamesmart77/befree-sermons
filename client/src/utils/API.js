import axios from "axios";
import * as scriptureData from './allBibleData.json';

export default {
  
  //call news api based on search criteria
  getSavedSermons: () => axios.get("/api/sermon"),

  //save new sermon
  saveSermon: (params) => axios.post("/api/sermon", params),

  //save new sermon
  searchSermons: (params) => axios.post("/api/sermon/search", params),
  
  //login
  login: (params) => axios.post("/api/admin", params),

  //authenticate user --> fail redirect to root
  validateUser: () => {
    axios.get("/api/admin")
    .catch(err => {
      console.log("USER AUTHENTICATION ERROR: ", err);
      window.location = "/";
    })
  },

  //save new article
  deleteArticle: (articleId) => axios.delete("/api/article/" + articleId),

  getScriptureBooks: () => {
    let scriptureBooks = [];
    scriptureData.books.map(book => {
      scriptureBooks.push(book.name)
    })

    return scriptureBooks;
  },

  getBookChapters: (bookName) => {
    let chapters = 0; 

    scriptureData.books.map(book => {
      if(book.name === bookName){
        chapters = book.chapters[book.chapters.length - 1].chapter
      }
    })

    return chapters;
  },

  getChapterVerse: (bookName, selectedChapter) => {
    let verses = 0; 

    scriptureData.books.map(book => {
      if(book.name === bookName){
        book.chapters.map(chapter => {
          chapter.chapter === selectedChapter ? verses = chapter.verses : "";
        })
      }
    })

    return verses;
  }
};
