import React, {Component} from 'react';

class Tag extends Component {
  constructor(props){
    super(props);
    this.state = {
      exitVisible: true,
      editable: false,
      text: 'Lorem',
      coords:{
        x: 0,
        y: 0
      }
    }
  }

  checkRange = (main,draggable,e) => {
        return (e.pageX >= main.getBoundingClientRect().left + draggable.offsetWidth/2) && (e.pageX <= main.getBoundingClientRect().right - draggable.offsetWidth/2)
        && (e.pageY >= main.getBoundingClientRect().top + draggable.offsetHeight/2) && (e.pageY <= main.getBoundingClientRect().bottom - draggable.offsetHeight/2);
  }

  remove = (e) => {
    this.props.toggleBlock();
    e.target.parentElement.remove();
  }

  dragTo = (e) => {
    e.stopPropagation();
      e.target.parentElement.onmousemove = (e) => {
        if (this.checkRange(e.target.parentElement.parentElement, e.target.parentElement, e)) {
          if (e.target.parentElement.getBoundingClientRect().right >= e.target.parentElement.parentElement.getBoundingClientRect().right-20) {
            e.target.parentElement.classList.add('reverse');
          } else {
            e.target.parentElement.classList.remove('reverse');
          }
          const left = e.pageX - e.target.offsetWidth / 2 + 'px';
          const top = e.pageY - e.target.offsetHeight / 2 + 'px';
          this.setState(() => {
            return{
              coords: {
                x: left,
                y: top
              }
          }
          });
          e.target.parentElement.style.left = this.state.coords.x;
          e.target.parentElement.style.top = this.state.coords.y;
      }
    }
    e.target.onmouseup = (e) => {
      e.target.onmouseup = null;
      e.target.parentElement.onmousemove = null;
    }
  }

  toggleExitVisibility = (e) => {
    e.stopPropagation();
    if ((!this.props.getBlock() && this.state.exitVisible) || (this.props.getBlock() && !this.state.exitVisible) ) {
      this.props.toggleBlock();
      // this.toggleEditable();
      this.setState((prevState) => {
        return {
          exitVisible: !prevState.exitVisible
        }
      })
    }
  }

  toggleEditable = (e) => {
    e.stopPropagation();
    this.props.toggleBlock();
    this.setState((prevState) => {
      return {
        editable: !prevState.editable
      }
    })
  }

  changeText = (e) => {
    let newText = e.target.value;
    if (!newText) {
      newText = 'Lorem';
    }
    this.setState(() => {
      return {
        text: newText.trim()
      }
    }, () => {
      console.log(this.state.text);
    });
    this.toggleEditable(e);
  }

  render(){
    return (
      <div className="tagContainer" onMouseDown={this.dragTo} onDoubleClick={this.toggleEditable}
      style={{left:this.props.left,top:this.props.top}}>
          {this.state.editable ? <input onClick={(e)=>{e.stopPropagation()}} onBlur={this.changeText}/> : <div onClick={this.toggleExitVisibility}
           className="container">{this.state.text}</div>}
          <div className="exit" onClick={this.remove}
          style={{display:this.state.exitVisible ? "none" : "block"}}>X
          </div>
      </div>
    )
  }
}

export default Tag;
