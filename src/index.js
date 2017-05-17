import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAoVm3tPaVzke13g2_vbHeeAZqqqR6mIi8'; 

// component makes html
class App extends Component {

	constructor(props){
		super(props);
		this.state ={
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('guinea pig dandelion')
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
				this.setState({ 
					videos: videos,
					selectedVideo: videos[0]
				});
			});
	}

	render() {
		const videoSearch = _.debounce( (term) => {this.videoSearch(term+' guinea pig')}, 10 )
		return (
			<div>
				<SearchBar onSearchTermChange={ videoSearch }/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos}/>
			</div>
		);
	}
}

// put that html into DOM
ReactDOM.render(<App />, document.querySelector('.container'));
