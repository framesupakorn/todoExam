import React from 'react';

class ToDoList extends React.Component {
    state = {
        isEditing: false,
        oldText: this.props.itemName,
        newText: '',
        isChecking: false
    }
    componentDidMount() {
        this.setState({ newText: this.props.itemName })
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemName !== prevProps.itemName) {
            this.setState({ newText: this.props.itemName })
        }
    }
    onClickCheckBox = () => {
        if (this.props.isChecking === false) {

            let myObj = {
                itemName: this.props.itemName,
                itemStatus: 'Check',
                itemId: this.props.itemId,
                finalIndexKey: this.props.finalIndexKey,
                timeSubmit: new Date().toLocaleTimeString()

            }
            this.props.changeCheckingStatusToTrue(this.props.itemName)
            this.props.addHistoryClickCheckBox(myObj)
        } else if (this.props.isChecking === true) {


            let myObj = {
                itemName: this.props.itemName,
                itemStatus: 'UnCheck',
                itemId: this.props.itemId,
                finalIndexKey: this.props.finalIndexKey,
                timeSubmit: new Date().toLocaleTimeString()

            }
            this.props.changeCheckingStatusToFalse(this.props.itemName)
            this.props.addHistoryClickCheckBox(myObj)
        }

    }
    onClickEdit = () => {
        const itemId = this.props.itemId
        this.setState({
            newText: this.props.itemName
        })


        this.props.onClickEdit(itemId)

    }
    onValue = () => {
        this.setState({ newtext: this.props.itemName })
        return (
            this.state.newText
        )
    }
    renderListItem = () => {

        const itemName = this.props.itemName
        if (this.props.isEditing === false) {
            return <div id={`${itemName}`}>
                <input value='correct' ref='checkingCorrect' type='checkbox' style={{ marginRight: '10px', width: '15px', height: '15px' }} checked={this.props.isChecking} onChange={() => this.onClickCheckBox()} ></input>
                {itemName}
                <button style={{ marginLeft: '10px', marginTop: '5px' }} className='ui button blue' disabled={this.props.isChecking} onClick={() => this.onClickEdit()}>
                    Edit
                </button>
                <button style={{ marginLeft: '10px', marginTop: '5px' }} className='ui button red' disabled={this.props.isChecking} onClick={() => this.onClickDelete()}>
                    Delete
                </button>
            </div>
        } else {

            return <div id={`${itemName}`} >
                <input type='checkbox' style={{ marginRight: '10px', width: '15px', height: '15px' }} checked={this.props.isChecking} onChange={() => this.onClickCheckBox()} ></input>
                <input disabled={this.props.isChecking} value={this.state.newText}
                    ref='newTextCreated'
                    onChange={() => this.setState({ newText: this.refs.newTextCreated.value })} />
                <button style={{ marginLeft: '10px', marginTop: '5px' }} className='ui button green' disabled={this.props.isChecking} onClick={() => this.onClickSave()}>
                    Save
                </button>
                <button style={{ marginLeft: '10px', marginTop: '5px' }} className='ui button yellow' disabled={this.props.isChecking} onClick={() => this.onClickCancle()}>
                    Cancle
                </button>
            </div >
        }
    }
    onClickCancle = () => {
        const itemId = this.props.itemId
        this.setState({ newText: this.props.itemName })
        this.props.onClickCancle(itemId)
    }

    onClickSave = () => {

        const itemId = this.props.itemId
        const oldtext = this.props.itemName
        const newtext = this.state.newText
        const finalIndexKey = this.props.finalIndexKey
        if (oldtext.trim() === newtext.trim()) {
            alert('this is the same value as before edited')
        } else if (newtext === '') {
            alert('you cant submit the null value')
        } else if (this.props.listOfItem.find(item => item.itemName === newtext)) {
            alert('this word already exits')
        } else {
            this.props.onHandleClickSave(oldtext, newtext, itemId, finalIndexKey)
            this.setState({ isEditing: false })
        }
    }
    onClickDelete = () => {
        const itemId = this.props.itemId
        const itemName = this.props.itemName
        const finalIndexKey = this.props.finalIndexKey
        this.props.handleClickDelete(itemId, itemName, finalIndexKey)
        this.setState({ newText: this.state.oldText })
    }
    render() {

        return (
            <div className='ui segment' style={{ maxWidth: '280px', backgroundColor: this.props.isChecking ? '#add8e6' : 'lime' }}>
                {this.renderListItem()}
            </div>
        )
    }
}
export default ToDoList;