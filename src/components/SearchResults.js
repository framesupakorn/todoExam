import React from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/ContextStore'
import ToDoList from './ToDoList'
class SearchResults extends React.Component {
    static contextType = Context
    state = {
        listOfItem: [],
        listOfHistory: [],
        searchInput: null
    }
    componentDidMount() {
        this.setState({
            listOfItem: this.context.listOfItem,
            listOfHistory: this.context.listOfHistory,
            searchInput: this.context.searchInput
        })
    }



    handleClickSave = (oldtext, newtext, itemId, finalIndexKey) => {
        const foundItem = this.state.listOfItem.find(item => item.itemName === oldtext)
        foundItem.itemName = newtext
        foundItem.isEditing = false
        this.setState({ listOfItem: this.state.listOfItem })
        let history = this.state.listOfHistory
        let saveHistory = {
            itemName: newtext,
            itemStatus: 'Edited',
            timeSubmit: new Date().toLocaleTimeString(),
            itemId: itemId,
            finalIndexKey: finalIndexKey

        }
        let newHistory = [...history, saveHistory]
        this.setState({ listOfHistory: newHistory })
        this.setState({ searchInput: this.state.searchInput })

    }
    onClickCancle = (itemId) => {
        const List = this.state.listOfItem.find(item => item.itemId === itemId)
        console.log(List)
        List.isEditing = false
        this.setState({ listOfItem: this.state.listOfItem })
    }
    onClickBackButton = () => {
        this.setState({ searchInput: null })
        this.props.ChangeType()
    }

    changeCheckingStatusToFalse = (oldtext) => {
        const foundItem = this.state.listOfItem.find(item => item.itemName === oldtext)
        foundItem.isChecking = false
        this.setState({ listOfItem: this.state.listOfItem })
    }
    changeCheckingStatusToTrue = (oldtext) => {
        const foundItem = this.state.listOfItem.find(item => item.itemName === oldtext)
        foundItem.isChecking = true
    }
    addHistoryClickCheckBox = (myObj) => {
        let newObjHistory = [...this.state.listOfHistory, myObj]
        this.setState({ listOfHistory: newObjHistory })
        this.setState({ listOfItem: this.state.listOfItem })
    }
    onClickEdit = (itemId) => {

        const List = this.state.listOfItem.find(item => item.itemId === itemId)
        List.isEditing = true
        this.setState({ listOfItem: this.state.listOfItem })
    }
    onClickSearchButton = (newSearchWord) => {
        if (newSearchWord.trim() === '') {
            alert('you cant search with null value')
            this.refs.searchText2.value = ''

        }
        else if (newSearchWord.trim() !== '')
            this.setState({ searchInput: newSearchWord })
    }
    renderSearchWord = () => {
        if (this.state.searchInput === '') {
            return ('no keyword searched')
        } else {
            return (this.state.searchInput)
        }
    }
    render() {
        console.log(this.state.searchInput)

        console.log(this.context)
        const listItem2 = this.state.listOfItem.filter(item => { return item.itemName.indexOf(this.state.searchInput) !== -1 })
        const itemList2 = listItem2.map((item, index) =>
            <ToDoList
                key={index}
                itemName={item.itemName}
                itemId={item.itemId}
                onHandleClickSave={this.handleClickSave}
                listOfItem={this.state.listOfItem}
                handleClickDelete={this.handleClickDelete}
                finalIndexKey={item.finalIndexKey}
                addHistoryClickCheckBox={this.addHistoryClickCheckBox}
                isEditing={item.isEditing}
                isChecking={item.isChecking}
                onClickEdit={this.onClickEdit}
                onClickCancle={this.onClickCancle}
                changeCheckingStatusToTrue={this.changeCheckingStatusToTrue}
                changeCheckingStatusToFalse={this.changeCheckingStatusToFalse} />
        )
        return (
            <ul>

                <center>
                    <div className='ui menu' style={{ maxWidth: '500px', maxHeight: '100px' }}>

                        <h3>Search Results</h3>
                        <div className='ui right menu' >
                            <i className='ui circle red icon' onClick={() => this.setState({ searchInput: '' })} />

                            display all item

                    </div>
                    </div>
                    <div>
                        <input
                            ref='searchText2'
                            placeholder='search new item here' />
                        <button
                            onClick={() => this.onClickSearchButton(this.refs.searchText2.value)}>
                            <i className='search icon' />
                            Search
                       </button>
                    </div>

                    SearchWord: {this.renderSearchWord()}
                    <div>ItemFound : {itemList2.length} </div>
                    {itemList2}
                    <Link onClick={() => this.context.onSaveListOfItem(this.state.listOfItem, this.state.listOfHistory, this.state.searchInput)} to='/'>
                        <button>
                            Back To MainPage
                        </button>
                    </Link>
                </center>

            </ul>
        )
    }
}
export default SearchResults;

