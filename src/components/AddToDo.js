import React from 'react';
import uuid from 'uuid'

class AddToDo extends React.Component {
    state = {
        text: '',
        indexKey: 0,
        isTyping: true
    }

    onClickAdd = (event) => {
        event.preventDefault();

        const newitem = this.refs.createdText.value

        const listOfItem = this.props.listOfItem
        const indexKey = this.state.indexKey
        let finalIndexKey = indexKey + 1

        if (listOfItem.find(item => { return item.itemName === newitem.trim() }) === undefined && newitem.trim() !== '') {
            let itemObj = {
                itemName: newitem,
                itemStatus: 'Add',
                itemId: uuid(),
                timeSubmit: new Date().toLocaleTimeString(),
                finalIndexKey: finalIndexKey,
                isEditing: false,
                isChecking: false
            }
            let itemObjHistory = {
                itemName: newitem,
                itemStatus: 'Add',
                itemId: uuid(),
                timeSubmit: new Date().toLocaleTimeString(),
                finalIndexKey: finalIndexKey,
                isEditing: false,
                isChecking: false
            }

            this.props.onClickAdd(itemObj, itemObjHistory)
            this.refs.createdText.value = ''

            this.setState({
                indexKey: finalIndexKey,
                isTyping: true
            })
        } else if (newitem.trim() === '') {
            alert('you cant insert null value')
            this.refs.createdText.value = ''
        } else if (listOfItem.find(item => item.itemName === newitem.trim())) {
            alert('this item name is already use')
            this.refs.createdText.value = ''
        }

    }
    onTyping = (text) => {
        if (text !== '') {
            this.setState({ isTyping: false })
        } else if (text === '') {
            this.setState({ isTyping: true })
        }
    }
    renderAction = () => {

        return (
            <div>
                <form onSubmit={(e) => this.onClickAdd(e)}>
                    <input
                        className='input'
                        ref='createdText'

                        placeholder='add item here'
                        onChange={(e) => this.onTyping(e.target.value)}
                        onClick={() => this.setState({ isTyping: false })} />
                    <button disabled={this.state.isTyping} type='button' onClick={(e) => this.onClickAdd(e)}>
                        <i className='small plus icon' />
                        Add
                </button>
                </form>

            </div>
        )
    };
    render() {
        return (
            <div>
                {this.renderAction()}
            </div>
        )
    };
};
export default AddToDo;
