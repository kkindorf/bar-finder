import React, { Component } from'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ResultCard extends Component {
    constructor(props) {
        super(props);
        this.handleUserGoing = this.handleUserGoing.bind(this);
        this.handleReviewRequest = this.handleReviewRequest.bind(this);
    }
    handleUserGoing() {
        this.props.handleUserSubmission(this.props.alias);
    }
    handleReviewRequest() {
        this.props.handleReviewRequest(this.props.alias);
    }    
    render() {
    return  (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img className="img-responsive img-rounded" src={this.props.image_url}/>
                        </div>
                        <div className="col-md-9">
                            <div className="content-container">
                                <h2><a href={this.props.url} target="_blank">{this.props.name}</a></h2>
                                <p>Address: {this.props.display_address1}, {this.props.display_address2}</p>
                                <p>Price: {this.props.price}</p>
                                <p>Rating: <span className="visually-hidden">{this.props.rating + "stars"}</span><span className="yellow-stars">{this.props.rating}</span></p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button className="btn btn-info" onClick={this.handleReviewRequest} role="button">Read a Review</button>
                                        <div className="review-container">
                                            {this.props.review}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                       <button className="btn btn-success" onClick={this.handleUserGoing} value={this.props.alias}>Number going: {this.props.numberGoing}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}
export default connect(null, actions)(ResultCard);