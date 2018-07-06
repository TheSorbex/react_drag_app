import React, {Component} from 'react';
import Tag from './Tag'

class TagContainer extends Component {
  state = {
    tags: [],
    block: false
  }

  addTag = (e) => {
    const arr = [];
    arr.push({
      x: e.pageX + 'px',
      y: e.pageY + 'px'
    })
    this.setState((prevState) => {
      return{
      tags: prevState.tags.concat(arr)
    }
    })
  }

  getBlock = () => {
    return this.state.block;
  }

  toggleBlock = () => {
    this.setState((prevState) => {
      return {
        block: !prevState.block
      }
    })
  }

  render(){
    return (
      <div>
        <div onDoubleClick={this.addTag} className="mainContainer">
          {
            this.state.tags.map((tag) => <Tag moveAt={this.moveAt} getBlock={this.getBlock} toggleBlock={this.toggleBlock} left={tag.x} top={tag.y} key={this.state.tags.indexOf(tag)}/>)
          }
        </div>
      </div>
    )
  }
}

export default TagContainer;
