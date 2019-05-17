import React from 'react';
import Context from '../context/ContextStore'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
    static contextType = Context
    state = {
        isTyping: true
    }
    onClickSearchButton = (searchText) => {
        console.log(searchText)
        if (searchText.trim()) {
            this.setState({ isTyping: false })
            this.props.onClickSearchButton(searchText.trim())
            this.refs.searchInput.value = ''
        } else if (searchText.trim() === '') {
            alert('you cant search with null value')
            this.setState({ isTyping: true })
        }

    }
    render() {
        return (
            <div>
                <input placeholder='search here'
                    ref='searchInput'
                    type='text'
                    onChange={() => { this.setState({ isTyping: false }) }}
                />
                <Link to='/SearchResults1'>
                    <button disabled={this.state.isTyping} onClick={() => this.onClickSearchButton(this.refs.searchInput.value)}>
                        <i className='search icon' />
                        Search
                </button>
                </Link>
            </div>
        )
    }

}
export default SearchBar;