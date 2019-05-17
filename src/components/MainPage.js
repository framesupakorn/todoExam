import React from 'react';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import Context from '../context/ContextStore'

class MainPage extends React.Component {
    static contextType = Context
    state = {
        listOfItem: [],
        listOfHistory: [],
        searchInput: null
    }
    componentDidMount() {
        this.setState({
            listOfItem: this.context.listOfItem,
            listOfHistory: this.context.listOfHistory
        })
    }
    render() {

        return (
            <div className='ui container'>

                <center>
                    <div className='ui segment' style={{ maxWidth: '500px' }}>
                        <h1 style={{ textAlign: 'center' }}>ToDo List</h1>
                    </div>
                    <div>
                        {this.renderAddToDo()}
                        <br />
                        <SearchBar
                            onClickSearchButton={this.onClickSearchButton}
                        />
                        {this.renderToDoList()}
                    </div>

                    <div>
                        <Link to='/History'>
                            <button
                                onClick={() =>
                                    this.context.onSaveListOfItem(
                                        this.state.listOfItem,
                                        this.state.listOfHistory,
                                        this.state.searchInput)
                                }>
                                <i className='right arrow black icon' />
                                Go To History Page
                                </button>
                        </Link>
                    </div>
                    <br />
                </center>
            </div>
        )
    };
    onClickSearchButton = (searchText) => {

        console.log(searchText)
        this.setState({ searchInput: searchText.trim() })
        this.context.onSaveListOfItem(this.state.listOfItem, this.state.listOfHistory, searchText.trim())
    }
    onClickEdit = (itemId) => {

        const List = this.state.listOfItem.find(item => item.itemId === itemId)
        List.isEditing = true
        this.setState({ listOfItem: this.state.listOfItem })
    }
    handleClickAdd = (itemObj, itemObjHistory) => {
        console.log(this.state.listOfHistory)

        let itemArr = [...this.state.listOfItem, itemObj]
        let itemArr2 = this.state.listOfHistory
        itemArr2.unshift(itemObjHistory)
        this.setState({
            listOfItem: itemArr,
            listOfHistory: itemArr2
        })
    }
    handleClickDelete = (itemId, itemName, finalIndexKey) => {
        const newItemList = this.state.listOfItem.filter(item => item.itemId !== itemId)
        const List = this.state.listOfItem.find(item => item.itemId === itemId)
        List.isEditing = true
        let deleteHistory = {
            itemName: itemName,
            itemStatus: 'Deleted',
            timeSubmit: new Date().toLocaleTimeString(),
            itemId: itemId,
            finalIndexKey: finalIndexKey
        }
        let newHistory = this.state.listOfHistory
        newHistory.unshift(deleteHistory)
        this.setState({ listOfItem: newItemList })
        this.setState({ listOfHistory: newHistory })

    }
    renderToDoList = () => {

        if (this.state.searchInput === '') {
            alert('you cant search with null value')
            this.setState({ searchInput: null })
        } else if (this.state.searchInput === null) {

            const itemList = this.state.listOfItem.map((item, index) => <ToDoList
                key={index}
                itemName={item.itemName}
                itemId={item.itemId}
                finalIndexKey={item.finalIndexKey}
                isEditing={item.isEditing}
                isChecking={item.isChecking}
                onHandleClickSave={this.handleClickSave}
                listOfItem={this.state.listOfItem}
                handleClickDelete={this.handleClickDelete}
                addHistoryClickCheckBox={this.addHistoryClickCheckBox}
                onClickEdit={this.onClickEdit}
                onClickCancle={this.onClickCancle}
                changeCheckingStatusToTrue={this.changeCheckingStatusToTrue}
                changeCheckingStatusToFalse={this.changeCheckingStatusToFalse}
            />)
            return (<ul>
                {itemList}
            </ul>)
        } else if (this.state.searchInput.trim() !== '' && this.state.searchInput !== null) {
            const listItem2 = this.state.listOfItem.filter(item => { return item.itemName.indexOf(this.state.searchInput) !== -1 })
            const itemList2 = listItem2.map((item, index) => <ToDoList
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
                    <button onClick={() => this.setState({ searchInput: null })}>Back</button>
                    <h3>Search Results</h3>
                    <div>ItemFound : {itemList2.length} </div>
                    {itemList2}
                </ul>
            )
        }

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
        let historyCheckBox = this.state.listOfHistory
        historyCheckBox.unshift(myObj)
        this.setState({ listOfHistory: historyCheckBox })
        this.setState({ listOfItem: this.state.listOfItem })
    }
    handleClickSave = (oldtext, newtext, itemId, finalIndexKey) => {
        const foundItem = this.state.listOfItem.find(item => item.itemName === oldtext)
        foundItem.itemName = newtext
        foundItem.isEditing = false
        this.setState({ listOfItem: this.state.listOfItem })

        let saveHistory = {
            itemName: newtext,
            itemStatus: 'Edited',
            timeSubmit: new Date().toLocaleTimeString(),
            itemId: itemId,
            finalIndexKey: finalIndexKey

        }
        let history = this.state.listOfHistory
        history.unshift(saveHistory)
        this.setState({ listOfHistory: history })
    }
    onClickCancle = (itemId) => {
        const List = this.state.listOfItem.find(item => item.itemId === itemId)

        List.isEditing = false
        this.setState({ listOfItem: this.state.listOfItem })
    }
    renderAddToDo = () => {
        return (
            <AddToDo
                onClickAdd={this.handleClickAdd}
                listOfItem={this.state.listOfItem} />
        )
    }

};
export default MainPage;