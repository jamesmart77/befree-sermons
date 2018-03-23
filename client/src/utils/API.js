import axios from "axios";

export default {

  //call news api based on search criteria
  searchNews: (searchParams) => axios.post("/api/search", searchParams),
  
  //call news api based on search criteria
  getSavedSermons: () => axios.get("/api/sermon"),

  //save new sermon
  saveSermon: (params) => axios.post("/api/sermon", params),
  
  //save new article
  deleteArticle: (articleId) => axios.delete("/api/article/" + articleId)
};
