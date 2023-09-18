const React = require('react');

class Show extends React.Component {
  render () {
    const { vegetable } = this.props;

    // Check if vegetable is defined before accessing its properties
    if (!vegetable) {
      return <div>Vegetable not found</div>;
    }

    return (
      <div>
        <h1>Show Page For Vegetables</h1>
        The {vegetable.name} is {vegetable.color}
        {vegetable.readyToEat ? " It's ready to eat. " : " It is not ready to eat...Can't touch this."}
      </div>
    );
  }
}

module.exports = Show;
