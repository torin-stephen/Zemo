import React, { Component } from "react";
import { db } from '../firebase/firebase';
import "../config";
import "../css/Home.css"


class Home extends Component {
  constructor (){
    super()
		this.state = {
      loc: window.location.pathname,
      newloc: ""
    }
 
    const self = this;
    console.log(self.state.loc);

    if (self.state.loc === "/"){
      self.setState({newloc: "/admin"});
      window.location = "/admin"
    }
    else{
      var docid = self.state.loc.substring(1);
      var docref = db.collection('links').doc(docid);
      docref.get().then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          var data = doc.data();
          self.setState({yt: data.ytlink});
          self.setState({ig: data.iglink});
          self.setState({tw: data.twlink});
          self.setState({bio: data.bio});
          self.setState({pfp: data.photoURL});
          self.setState({name: data.name})
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    }
  }

  render() {

    return (
      <div className="whole-wrap">
        <div className="profile-wrap">
          <div className="profile-head">
          </div>
          <div className="profile-img-wrap">
            <img src={ this.state.pfp } alt=""/>
          </div>
          <div className="profile-text-block">
            <div className="profile-primary-head">
              <h2>{ this.state.name }</h2>
            </div>
            <div className="profile-sub-head">
            </div>
            <div className="profile-hire-block">
            { this.state.bio }
            </div>
          </div>
          <div className="profile-social-wrap">
            <div className="row">
              <div className="col-1-of-3">
              <a href={ this.state.yt } target="_blank" without rel="noopener noreferrer">
                <span className="icon-dribbble">
                  YT
                </span>
                </a>
                <label>YouTube</label>
              </div>
              <div className="col-2-of-3">
                <a href={ this.state.ig } target="_blank" without rel="noopener noreferrer">
                <span className="icon-behance">
                  IG
                </span>
                </a>
                <label>Instagram</label>
              </div>
              <div className="col-3-of-3">
                <a href={ this.state.tw } target="_blank" without rel="noopener noreferrer">
                  <span className="icon-fb">
                    TW
                  </span>
                  </a>
                <label>Twitter</label>  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
