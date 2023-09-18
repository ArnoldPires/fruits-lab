const React = require('react');

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a New Vegetable</h1>
        <form method="POST" action="/vegetables/new">
          <label>Name:</label>
          <input type="text" name="name" required />
          <br />
          <label>Color:</label>
          <input type="text" name="color" required /> {/* Corrected name attribute */}
          <br />
          <label>Ready to Eat:</label>
          <input type="checkbox" name="readyToEat" />
          <br />
          <button type="submit">Create Vegetable</button>
        </form>
      </div>
    );
  }
}

module.exports = New;