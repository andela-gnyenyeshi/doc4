(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var localStorage = require('localStorage');
  var DocumentAction = require('../../actions/DocumentActions');
  var toastr = require('toastr');

  var Create = new React.createClass({
    mixins: [History],
    componentWillMount: function() {
      var token = localStorage.getItem('x-access-token');
      if(!token) {
        window.location.assign('/dashboard');
      }
    },

    getInitialState: function() {
      return {
        document: {
          title: '',
          content: '',
          access: ''
        }
      };
    },

    fetchInputValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.document[field] = value;
      this.setState({document: this.state.document});
    },

    saveDocument: function() {
      var token = localStorage.getItem('x-access-token');
      DocumentAction.createDocument(this.state.document, token);
      toastr.success('Document successfully created', {timeout: 1500});
      window.location.assign('/dashboard');
      // this.history.pushState(null, '/dashboard');
    },

    render: function() {
      return (
        <div className="mdl-grid">
        <div id="create-doc" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
        <div className="demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__supporting-text">
            <form id ="form-document" action="post">
              <div className="mdl-textfield mdl-js-textfield  mdl-cell--12-col">
                  <input className="mdl-textfield__input" type="text" id="title" name="title" onChange={this.fetchInputValues}/>
                  <label className="mdl-textfield__label" htmlFor="title">Document Title</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield mdl-cell--12-col">
                <textarea className="mdl-textfield__input" type="text" rows= "20" id="text" name="content" onChange={this.fetchInputValues}></textarea>
                <label className="mdl-textfield__label" htmlFor="text">Content</label>
              </div>
              <div className="mdl-grid">
                <div className="mdl-cell--3-col">
                  <input id="roles" type="radio" name="access" value="Admin" onChange={this.fetchInputValues}>Admin</input>
                </div>
                <div className="mdl-cell--3-col">
                  <input id="roles" type="radio" name="access" value="Staff" onChange={this.fetchInputValues}>Staff</input>
                </div>
                <div className="mdl-cell--3-col">
                  <input id="roles" type="radio" name="access" value="Viewer" onChange={this.fetchInputValues}>Viewer</input>
                </div>
                <div className="mdl-cell--3-col">
                  <input id="roles" type="radio" name="access" value="None" onChange={this.fetchInputValues}>None</input>
                </div>
              </div>
              </form>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a id="createdoc" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.saveDocument}>
              CREATE
            </a>
            <a href={'/dashboard'} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              CANCEL
            </a>
          </div>
        </div>
      </div>
      </div>
      );
    }
  });
  module.exports = Create;
})();
