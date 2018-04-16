import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC6_J0aHLue5Dc0EiYEcOTUwMnRhJD9z60';	
//creating new component. 

// const App = function(){
//     return <div>Hi!</div>
// }


// this component is parent and will be responsible for fetching the data
//refuctoring to class component to keep track of the list of videos
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards'); 
    }
    
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
        // it is the same as writing: YTSearch({key: API_KEY, term: 'surfboards'}, (data) => {
        //     this.setState({videos: data});
        // }); only when key and property are the same variable name. {videos: videos}
    }
    
    
    render(){
        //with this function the search can be performed only every 300 miliseconds.
        //debounce takes the inner function and returns new function that can 
        // be called only once every 300 milliseconds.
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }    
}
//puting on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));