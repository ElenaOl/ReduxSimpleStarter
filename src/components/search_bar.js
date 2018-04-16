import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

// const SearchBar = () => {
//     return <input />
// };

// class SearchBar extends React.Component {
//     render() {
//         return <input />;
//     }
// }

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            //whenever user updates the search section we will update the term
            term: ''
        };
    }
    render() {
        return (
           <div className="search-bar"> 
            {/* controlled field is element that it's value sets by the state */}
             <input 
                value={this.state.term}
                onChange={ e => this.onInputChange(e.target.value) } />
           </div> 
        );    
    }
    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}
export default SearchBar;