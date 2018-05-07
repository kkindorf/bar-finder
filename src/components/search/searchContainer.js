import React, { Component } from 'react';
import SearchBar from './searchBar';
import ResultCard from './resultCard';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '' };
        this.searchBarChange = this.searchBarChange.bind(this);
        this.searchBarSubmit = this.searchBarSubmit.bind(this);
    }
    searchBarChange(e) {
        this.setState({ value: e.target.value })
    }
    searchBarSubmit(e) {
        e.preventDefault();
        this.props.processSearchTerm(this.state.value);
    }
    render() {
        if(!this.props.loadingBars) {
            let review = "";
            if(this.props.review) {
                review = this.props.review;
            }
            const bars = this.props.businesses.map(function(bar) {
                let arrayOfStars = [];
                if(bar.rating % 1 !== 0) {
                    let roundedRating = Math.floor(bar.rating);
                    for(var i = 0; i < roundedRating; i++) {
                        arrayOfStars.push(<span key={i} aria-hidden="true"><i className="fas fa-star" aria-hidden="true"></i></span>);
                    }
                    arrayOfStars.push(<span aria-hidden="true" key={roundedRating + 1}><i className="fas fa-star-half" aria-hidden="true"></i></span>);

                } 
                else {
                    for(var i = 0; i < bar.rating; i++) {
                        arrayOfStars.push(<span key={i} aria-hidden="true"><i className="fas fa-star" aria-hidden="true"></i></span>);
                    }
                }
               
                return (
                    <ResultCard key={bar.id}
                                alias={bar.alias}
                                name={bar.name}
                                url={bar.url}
                                image_url={bar.image_url}
                                display_address1={bar.location.display_address[0]}
                                display_address2 = {bar.location.display_address[1]}
                                price={bar.price}
                                rating={arrayOfStars}
                                review={bar.review}
                                numberGoing={bar.numberGoing} />
                )
            })
            return (
                <div>
                <SearchBar onChange={this.searchBarChange}
                           onSubmit={this.searchBarSubmit}
                           value={this.state.value}/>
                {bars}
                </div>
            )
        }
        return (
            <div>
                <SearchBar onChange={this.searchBarChange}
                            onSubmit={this.searchBarSubmit}
                            value={this.state.value}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {businesses: state.barData.businesses, loadingBars: state.barData.loadingBars,
            authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, actions)(SearchContainer);