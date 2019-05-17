import React from 'react';
const Context = React.createContext('')



export class ContextStore extends React.Component {
    state = {
        listOfItem: [],
        listOfHistory: [],
        searchInput: null
    }
    onSaveListOfItem = (listOfItem, listOfHistory, searchInput) => {
        this.setState({
            listOfItem: listOfItem,
            listOfHistory: listOfHistory,
            searchInput: searchInput
        })

    }



    onClickClearHistoryList = () => {
        this.setState({ listOfHistory: [] })
    }
    render() {

        return (
            <Context.Provider value={{
                listOfItem: this.state.listOfItem,
                listOfHistory: this.state.listOfHistory,
                searchInput: this.state.searchInput,
                onSaveListOfItem: this.onSaveListOfItem,
                onClickClearHistoryList: this.onClickClearHistoryList,



            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
export default Context;