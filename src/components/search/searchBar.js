import React, { Component } from 'react';


export default (props) => {
    return (
        <div className="search-bar">
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label className="sr-only">Search for bars</label>
                    <input type="text" className="form-control"  placeholder="Let's find your next favorite bar." onChange={props.onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
} 
