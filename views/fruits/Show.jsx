const React = require('react')
class Show extends React.Component {
  render () {
    const fruit = this.props.fruit
    return (
      <div>
        <h1>Show Page For Fruits</h1>
        The {fruit.name} is {fruit.color}
        {fruit.readyToEat? " It's ready to eat. " : " It is not ready to eat...Can't touch this."}
      </div>
    );
  }
}
module.exports = Show;